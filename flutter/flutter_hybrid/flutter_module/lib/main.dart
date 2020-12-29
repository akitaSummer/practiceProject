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
  // EventChannel: 用于数据流（event streams）的通信，持续通信，收到消息后无法回复此次消息，通过长用于Native向Dart的通信，如：手机电量变化，网络连接变化，陀螺仪，传感器等
  static const EventChannel _eventChannelPlugin = EventChannel('EventChannelPlugin');
  // MethodChannel：用于传递方法调用（method invocation）一次性通信：如Flutter调用Native拍照
  static const MethodChannel _methodChannelPlugin = const MethodChannel('MethodChannelPlugin');
  // BasicMessageChannel：用于传递字符串和半结构化的信息，持续通信，收到消息后可以回复此次消息，如：Native将遍历到的文件信息陆续传递到Dart，在比如：Flutter将从服务端陆陆续获取到信息交个Native加工，Native处理完返回等
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
