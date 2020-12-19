import 'package:flutter/material.dart';
import 'package:my_first_flutter_app/animated_widget_page.dart';
import 'package:my_first_flutter_app/less_group_page.dart';
import 'package:my_first_flutter_app/plugin_use.dart';
import 'package:my_first_flutter_app/statefull_group_page.dart';
import 'package:my_first_flutter_app/gesture_page.dart';
import 'package:my_first_flutter_app/resource_page.dart';
import 'package:my_first_flutter_app/launch_page.dart';
import 'package:my_first_flutter_app/flutter_widget_lifecycle.dart';
import 'package:my_first_flutter_app/app_lifecycle.dart';
import 'package:my_first_flutter_app/photo_app_page.dart';
import 'package:my_first_flutter_app/animation_page.dart';
import 'package:my_first_flutter_app/animated_builder_page.dart';
import 'package:my_first_flutter_app/transitions.dart';
import 'package:my_first_flutter_app/radial_expansion.dart';
import 'package:my_first_flutter_app/future_builder_page.dart';
import 'package:my_first_flutter_app/share_preferences_page.dart';
import 'package:my_first_flutter_app/list_view.dart';
import 'package:my_first_flutter_app/radial_list_view.dart';
import 'package:my_first_flutter_app/expansion_tile.dart';
import 'package:my_first_flutter_app/grid_view.dart';
import 'package:my_first_flutter_app/scroll_controller.dart';
import 'package:my_first_flutter_app/refresh_indicator.dart';
import 'flutter_layout_page.dart';

void main() {
  runApp(DynamicTheme());
}

class DynamicTheme extends StatefulWidget {
  @override
  _DynamicThemeState createState() => _DynamicThemeState();

}

class _DynamicThemeState extends State<DynamicTheme> {

  Brightness _brightness = Brightness.light;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        // fontFamily: 'RubikMonoOne', // 全局字体
        primarySwatch: Colors.blue,
        brightness: _brightness,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: Scaffold(
        appBar: AppBar(
          title: Text('routes'),
        ),
        body: ListView(
          children: [
            RaisedButton(
              onPressed: () {
                setState(() {
                  if (_brightness == Brightness.dark){
                    _brightness = Brightness.light;
                  } else {
                    _brightness = Brightness.dark;
                  }
                });
              },
              child: Text(
                'change theme',
                style: TextStyle(fontFamily: 'RubikMonoOne')
              ),
            ),
            RouterNavigator(),
          ],
        )
      ),
      routes: <String, WidgetBuilder>{
        'less': (BuildContext context) => LessGroupPage(),
        'ful': (BuildContext context) => StateFullGroupPage(),
        'plugin': (BuildContext context) => PluginUse(),
        'layout': (BuildContext context) => FlutterLayoutPage(),
        'gesture': (BuildContext context) => GesturePage(),
        'resource': (BuildContext context) => ResourcePage(),
        'launch': (BuildContext context) => LaunchPage(),
        'widget_lifecycle': (BuildContext context) => WidgetLifecycle(),
        'app_lifecycle': (BuildContext context) => AppLifecycle(),
        'photo_app': (BuildContext context) => PhotoApp(),
        'animation': (BuildContext context) => AnimationPage(),
        'animated_widget': (BuildContext context) => AnimatedWidgetPage(),
        'animated_builder': (BuildContext context) => AnimatedBuilderPage(),
        'hero_transition': (BuildContext context) => HeroAnimation(),
        'hero_radial_transition': (BuildContext context) => RadialExpansionDemo(),
        'future_builder': (BuildContext context) => FutureBuilderPage(),
        'share_preferences': (BuildContext context) => SharePreferencesPage(),
        'list_view': (BuildContext context) => ListViewPage(),
        'radial_list_view': (BuildContext context) => RadialListViewPage(),
        'expansion_tile': (BuildContext context) => ExpansionTilePage(),
        'grid_view': (BuildContext context) => GridViewPage(),
        'grid_view': (BuildContext context) => RefreshIndicatorPage(),
        'scroll_controller': (BuildContext context) => ScrollControllerPage(),
      },
    );
  }
}


class RouterNavigator extends StatefulWidget {
  @override
  _RouterNavigatorState createState() => _RouterNavigatorState();
}

class _RouterNavigatorState extends State<RouterNavigator> {

  bool byName = false;

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        children: <Widget>[
          SwitchListTile(
            title: Text('${byName ? '' : 'don\'t '}use route name'),
            value: byName,
            onChanged: (value) {
              setState(() {
                byName = value;
              });
            }
          ),
          _item('LessGroupPage', LessGroupPage(), 'less'),
          _item('StateFullGroupPage', StateFullGroupPage(), 'ful'),
          _item('PluginUse', PluginUse(), 'plugin'),
          _item('FlutterLayoutPage', FlutterLayoutPage(), 'layout'),
          _item('GesturePage', GesturePage(), 'gesture'),
          _item('ResourcePage', ResourcePage(), 'resource'),
          _item('LaunchPage', LaunchPage(), 'launch'),
          _item('WidgetLifecycle', WidgetLifecycle(), 'widget_lifecycle'),
          _item('AppLifecycle', AppLifecycle(), 'app_lifecycle'),
          _item('PhotoApp', PhotoApp(), 'photo_app'),
          _item('AnimationPage', AnimationPage(), 'animation'),
          _item('AnimatedWidget', AnimatedWidgetPage(), 'animated_widget'),
          _item('AnimatedBuilder', AnimatedWidgetPage(), 'animated_builder'),
          _item('HeroTransition', HeroAnimation(), 'hero_transition'),
          _item('HeroRadialTransition', RadialExpansionDemo(), 'hero_radial_transition'),
          _item('FutureBuilder', FutureBuilderPage(), 'future_builder'),
          _item('SharePreferences', SharePreferencesPage(), 'share_preferences'),
          _item('ListView', ListViewPage(), 'list_view'),
          _item('RadialListView', RadialListViewPage(), 'radial_list_view'),
          _item('ExpansionTile', ExpansionTilePage(), 'expansion_tile'),
          _item('GridView', GridViewPage(), 'grid_view'),
          _item('RefreshIndicator', RefreshIndicatorPage(), 'refresh_indicator'),
          _item('ScrollController', ScrollControllerPage(), 'scroll_controller'),
        ],
      ),
    );
  }

  _item(String title, Widget page, String routeName) {
    return Container(
      child: RaisedButton(
        onPressed: () {
          if (byName) {
            Navigator.pushNamed(context, routeName);
          } else {
            Navigator.push(context, MaterialPageRoute(builder: (context) => page));
          }
        },
        child: Text(title)
      )
    );
  }
}

