import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter/material.dart';

class SharePreferencesPage extends StatefulWidget {
  @override
  _SharePreferencesPageState createState() => _SharePreferencesPageState();
}

class _SharePreferencesPageState extends State<SharePreferencesPage> {

  int countString = 0;
  int loaclCount = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('future_builder'),
        leading: BackButton(),
      ),
      body: Center(
        child: Column(
            children: [
              RaisedButton(
                onPressed: _incrementCounter,
                child: Text('Increment Count'),
              ),
              RaisedButton(
                onPressed: _getCounter,
                child: Text('Get Count'),
              ),
              Text(
                countString.toString(),
                style: TextStyle(fontSize: 20),
              )
            ]
        ),
      )
      ,
    );
  }

  _incrementCounter() async{
    SharedPreferences  prefs = await SharedPreferences.getInstance();
    setState(() {
      countString = countString + 1;
    });
    int counter = (prefs.getInt('counter') ?? 0 ) + 1;
    await prefs.setInt('counter', counter);
  }

  _getCounter() async {
    SharedPreferences  prefs = await SharedPreferences.getInstance();
    setState(() {
      countString = prefs.getInt('counter') ?? 0;
    });
  }
}
