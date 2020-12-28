import 'dart:async';

import 'package:flutter/material.dart';
import 'dart:ui';

import 'package:flutter/services.dart';

void main() => runApp(MyApp(window: window));

class MyApp extends StatelessWidget {

  final Window window;

  MyApp({Key key, this.window}): super(key: key);

  @override
  Widget build(BuildContext context) {
    print(window.defaultRouteName);
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(title: 'Flutter Demo Home Page', window: window,),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title, this.window}) : super(key: key);

  final String title;
  final Window window;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  static const EventChannel _eventChannelPlugin = EventChannel('EventChannelPlugin');
  static const MethodChannel _methodChannelPlugin = const MethodChannel('MethodChannelPlugin');
  static const BasicMessageChannel<String> _basicMessageChannel = const BasicMessageChannel('BasicMessageChannel', StringCodec());
  String showMessage = '';
  StreamSubscription _streamSubscription;
  bool _isMethodChannelPlugin = false;

  @override
  void initState() {
    super.initState();
    _streamSubscription = _eventChannelPlugin.receiveBroadcastStream('123').listen(_onToDart, onError: _onToDartError);
    _basicMessageChannel.setMessageHandler((String message) => Future<String>(() {
      setState(() {
        showMessage = 'BasicMessageChannel:' + message;
      });
      return 'native message' + message;
    }));
  }

  @override
  void dispose() {
    super.dispose();
    _streamSubscription.cancel();
  }
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Container(
        alignment: Alignment.topCenter,
        decoration: BoxDecoration(color: Colors.lightBlueAccent),
        margin: EdgeInsets.only(top: 70),
        child: Column(
          children: [
            Text(
              'You have pushed the button this many times:',
            ),
            Text(
              'test window: ${widget.window.defaultRouteName}',
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headline4,
            ),
            SwitchListTile(
              value: _isMethodChannelPlugin,
              onChanged: _onChanelChange,
              title: Text(_isMethodChannelPlugin ? 'MethodChannelPlugin' : 'BasicMessageChannelPlugin'),
            ),
            TextField(
              onChanged: _onTextChange,
              decoration: InputDecoration(
                focusedBorder: UnderlineInputBorder(borderSide: BorderSide(color: Colors.white)),
                enabledBorder: UnderlineInputBorder(borderSide: BorderSide(color: Colors.white))
              ),
            ),
            Text(
              'native message: ' + showMessage
            )
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }

  void _onToDart(message) {
    setState(() {
      showMessage = message;
    });
  }

  void _onToDartError(error) {
    print(error);
  }

  void _onChanelChange(bool value) {
    setState(() {
      _isMethodChannelPlugin = value;
    });
  }

  void _onTextChange(value) async {
    String response;
    try {
      if (_isMethodChannelPlugin) {
        response = await _methodChannelPlugin.invokeMethod('send', value);
      } else {
        response = await _basicMessageChannel.send(value);
      }
    } on PlatformException catch(e) {
      print(e);
    }
  }
}
