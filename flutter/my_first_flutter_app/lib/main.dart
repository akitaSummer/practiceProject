import 'package:flutter/material.dart';
import 'package:my_first_flutter_app/less_group_page.dart';
import 'package:my_first_flutter_app/plugin_use.dart';
import 'package:my_first_flutter_app/statefull_group_page.dart';
import 'flutter_layout_page.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: Scaffold(
        appBar: AppBar(
          title: Text('routes'),
        ),
        body: RouterNavigator(),
      ),
      routes: <String, WidgetBuilder>{
        'less': (BuildContext context) => LessGroupPage(),
        'ful': (BuildContext context) => StateFullGroupPage(),
        'plugin': (BuildContext context) => PluginUse(),
        'layout': (BuildContext context) => FlutterLayoutPage(),
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

