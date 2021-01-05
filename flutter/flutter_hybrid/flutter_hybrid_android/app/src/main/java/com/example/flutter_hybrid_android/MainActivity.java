package com.example.flutter_hybrid_android;

import android.widget.EditText;
import androidx.fragment.app.FragmentManager;

import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import io.flutter.embedding.android.FlutterFragment;
import io.flutter.embedding.engine.FlutterEngine;
import io.flutter.embedding.engine.FlutterEngineCache;
import io.flutter.embedding.engine.dart.DartExecutor;

public class MainActivity extends AppCompatActivity implements IShowMessage {

    private static final String TAG_FLUTTER_FRAGMENT = "flutter_fragment";

    private FlutterFragment flutterFragment;

    private UIPresenter uiPresenter;
    private BasicMessageChannelPlugin basicMessageChannelPlugin;
    private EventChannelPlugin eventChannelPlugin;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        final EditText paramInput = findViewById(R.id.paramInput);

        FlutterEngine flutterEngine = new FlutterEngine(MainActivity.this);

        flutterEngine.getDartExecutor().executeDartEntrypoint(
                DartExecutor.DartEntrypoint.createDefault()
        );

        FlutterEngineCache
                .getInstance()
                .put("my_engine_id", flutterEngine);

        eventChannelPlugin = EventChannelPlugin.registerWith(flutterEngine.getDartExecutor());
        MethodChannelPlugin.registerWith(flutterEngine.getDartExecutor(), MainActivity.this);
        basicMessageChannelPlugin = BasicMessageChannelPlugin.registerWith(flutterEngine.getDartExecutor(), MainActivity.this);
        uiPresenter = new UIPresenter(MainActivity.this, "通信与混合开发", MainActivity.this);

        String inputParams = paramInput.getText().toString().trim();

        FragmentManager fragmentManager = getSupportFragmentManager();

        flutterFragment =  FlutterFragment.withCachedEngine("my_engine_id").build();

        fragmentManager
                .beginTransaction()
                .add(
                        R.id.somContainer,
                        flutterFragment,
                        TAG_FLUTTER_FRAGMENT
                )
                .commit();
//        findViewById(R.id.test).setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
////                String inputParams = paramInput.getText().toString().trim();
////                FlutterAppActivity.start(MainActivity.this, inputParams);
//
////                startActivity(
////                    FlutterActivity
////                        .withNewEngine()
////                        .initialRoute("route1")
////                        .build(MainActivity.this)
////                );
//                String inputParams = paramInput.getText().toString().trim();
////                FlutterAppActivity.start(MainActivity.this, inputParams);
//
//                FragmentManager fragmentManager = getSupportFragmentManager();
////
////                flutterFragment = (FlutterFragment) fragmentManager
////                        .findFragmentByTag(TAG_FLUTTER_FRAGMENT);
////
////                if (flutterFragment == null) {
////                    flutterFragment = FlutterFragment.withNewEngine().initialRoute("route1").build();
////
////                    fragmentManager
////                            .beginTransaction()
////                            .add(
////                                    R.id.somContainer,
////                                    flutterFragment,
////                                    TAG_FLUTTER_FRAGMENT
////                            )
////                            .commit();
////                }
//
//            }
//        });
    }

    public void onShowMessage(String message) {
        uiPresenter.showDartMessage(message);
    }

    public void sendMessage(String message, boolean useEventChannel) {
        if (useEventChannel) {
            eventChannelPlugin.send(message);
        } else {
            basicMessageChannelPlugin.send(message, this::onShowMessage);
        }
    }
}
