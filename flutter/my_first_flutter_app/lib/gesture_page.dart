import 'package:flutter/material.dart';

class GesturePage extends StatefulWidget {
  @override
  _GesturePageState createState() => _GesturePageState();
}

class _GesturePageState extends State<GesturePage> {

  String printString = '';

  double moveX = 0;
  double moveY = 0;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        primarySwatch: Colors.blue
      ),
      home: Scaffold(
        appBar: AppBar(
          title: Text('gesture'),
          leading: GestureDetector(
            onTap: () {
              Navigator.pop(context);
            },
            child: Icon(Icons.arrow_back),
          ),
        ),
        body: FractionallySizedBox(
          widthFactor: 1,
          child: Stack(
            alignment: Alignment.center,
            children: [
              Column(
                children: [
                  GestureDetector(
                    onTap: () => _printMsg('onTap'), // 点击
                    onDoubleTap: () => _printMsg('onDoubleTap'), // 双击
                    onLongPress: () => _printMsg('onLongPress'), // 长按
                    onTapCancel: () => _printMsg('onTapCancel'), // 取消点击
                    onTapUp: (e) => _printMsg('onTapUp'), // 松开
                    onTapDown: (e) => _printMsg('onTapDown'), // 按下
                    child: Container(
                      padding: EdgeInsets.all(60),
                      decoration: BoxDecoration(color: Colors.blueAccent),
                      child: Text(
                        'click me',
                        style: TextStyle(fontSize: 36, color: Colors.white),
                      )
                    ),
                  ),
                  Text(printString)
                ],
              ),
              Positioned(
                child: GestureDetector(
                  onPanUpdate: (e) => _doMove(e),
                  child: Container(
                    width: 72,
                    height: 72,
                    decoration: BoxDecoration(
                      color: Colors.amber,
                      borderRadius: BorderRadius.circular(36)
                    ),
                  )
                ),
                left: moveX,
                top: moveY,
              )
            ],
          )
        )
      )
    );
  }

  void _printMsg(String msg) {
    setState(() {
      printString += ' , ${msg}';
    });
  }

  void _doMove(DragUpdateDetails e) {
    setState(() {
      moveX += e.delta.dx;
      moveY += e.delta.dy;
    });
  }
}
