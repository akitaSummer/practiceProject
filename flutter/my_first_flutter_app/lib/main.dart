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
        'animated_widge': (BuildContext context) => AnimatedWidgetPage(),
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
          _item('appLifecycle', AppLifecycle(), 'app_lifecycle'),
          _item('photoApp', PhotoApp(), 'photo_app'),
          _item('animationPage', AnimationPage(), 'animation'),
          _item('animatedWidge', AnimatedWidgetPage(), 'animated_widge'),
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

