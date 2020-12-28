package com.example.flutter_hybrid_android;

import android.content.Intent;
import android.widget.EditText;
import androidx.annotation.NonNull;
import androidx.fragment.app.FragmentManager;
import io.flutter.embedding.android.FlutterActivity;

import android.view.View;
import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import androidx.fragment.app.FragmentTransaction;
import io.flutter.embedding.android.FlutterFragment;

public class MainActivity extends AppCompatActivity {

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

        findViewById(R.id.test).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
//                String inputParams = paramInput.getText().toString().trim();
//                FlutterAppActivity.start(MainActivity.this, inputParams);

//                startActivity(
//                    FlutterActivity
//                        .withNewEngine()
//                        .initialRoute("route1")
//                        .build(MainActivity.this)
//                );
                String inputParams = paramInput.getText().toString().trim();
//                FlutterAppActivity.start(MainActivity.this, inputParams);

                FragmentManager fragmentManager = getSupportFragmentManager();

                flutterFragment = (FlutterFragment) fragmentManager
                        .findFragmentByTag(TAG_FLUTTER_FRAGMENT);

                if (flutterFragment == null) {
                    flutterFragment = FlutterFragment.withNewEngine().initialRoute("route1").build();

                    fragmentManager
                            .beginTransaction()
                            .add(
                                    R.id.somContainer,
                                    flutterFragment,
                                    TAG_FLUTTER_FRAGMENT
                            )
                            .commit();
                }

            }
        });
    }
}
