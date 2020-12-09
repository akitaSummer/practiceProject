import 'package:flutter/material.dart';
import 'package:flutter_color_plugin/flutter_color_plugin.dart';

class LessGroupPage extends StatelessWidget {
  // StatelessWidget 不依赖自己的状态重新渲染
  // 常用StatelessWidget组件：Container, Text, Icon, CloseButton, BackButton, Chip, Divider, Card, AlertDialog
  @override
  Widget build(BuildContext context) {
    TextStyle textStyle = TextStyle(fontSize: 20);
    return MaterialApp(
      title: 'LessGroupPage',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: Scaffold(
        appBar: AppBar(
          title: Text('LessGroupPage'),
          leading: GestureDetector(
              onTap: () {
                Navigator.pop(context);
              },
              child: Icon(Icons.arrow_back)
          ),
        ),
        body: Container(
          decoration: BoxDecoration(color: Colors.white), // 装饰器
          alignment: Alignment.center, // 居中方式
          child: Column(
            children: <Widget>[
              Text(
                  'I am Text',
                  style: textStyle
              ),
              Icon(
                Icons.android,
                size: 50,
                color: Colors.red
              ),
              CloseButton(),
              BackButton(),
              Chip(
                // Chip: https://material.io/design/components/chips.html
                avatar: Icon(Icons.people),
                label: Text('LessGroupPage'),
              ),
              Divider(
                // 分割线的高度是无法设置的，可用Container画一个自己定制的高度
                height: 10, // 容器高度
                indent: 10, // 左侧间距
                color: Colors.orange,
              ),
              Card(
                // 带有圆角，阴影，边框等效果的卡片
                color: Colors.blue,
                elevation: 5,
                margin: EdgeInsets.all(10),
                child: Container(
                  padding: EdgeInsets.all(10),
                  child: Text(
                    'I am Card',
                    style: textStyle
                  ),
                ),
              ),
              AlertDialog(
                title: Text(
                  'AlertDialog title'
                ),
                content: Text(
                  'AlertDialog content'
                )
              )
            ],
          )
        ),
      ),
    );
  }
}

