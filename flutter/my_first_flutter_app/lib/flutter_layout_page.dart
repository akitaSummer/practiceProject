import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';

/// flutter 布局
///
/// Container
///
///                                                       Opacity
///                                                       ClipOval
///                                                       ClipRRect
///                     SingleChildRenderObjectWidget    PhysicalModel
///                                                       Align  Center
///                                                       Padding
///                                                      SizedBox
///                                                       FractionallySizedBox
///RenderObjectWidget
///                                                       Stack
///                                                       Flex       Column
///                     MultiChildRenderObjectWidget                 Row
///                                                       Wrap
///                                                       Flow
///
///ParentDataWidget     Positioned
///                     Flexible                          Expanded
class FlutterLayoutPage extends StatefulWidget {
  @override
  _StateFullGroupState createState() => _StateFullGroupState();
}

class _StateFullGroupState extends State<FlutterLayoutPage> {
  // 常用StatefulWidget组件：MaterialApp, Scaffold, AppBar, BottomNavigationBar, RefreshIndicator, Image, TextField, PageView
  int _currentIndex = 0;
  @override
  Widget build(BuildContext context) {
    TextStyle textStyle = TextStyle(fontSize: 20);
    return MaterialApp(
      title: 'FlutterLayoutPage',
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
        bottomNavigationBar: BottomNavigationBar(
          currentIndex: _currentIndex,
          onTap: (index) {
            setState(() {
              _currentIndex = index;
            });
          },
          items: [
            BottomNavigationBarItem(
              icon: Icon(Icons.home, color: Colors.grey),
              activeIcon: Icon(Icons.home, color: Colors.blue),
                title: Text('home')
            ),
            BottomNavigationBarItem(
                icon: Icon(Icons.list, color: Colors.grey),
                activeIcon: Icon(Icons.list, color: Colors.blue),
                title: Text('list')
            )
          ]
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: null,
          child: Text('click me!'),
        ),
        body: _currentIndex == 0 ? RefreshIndicator(
          // RefreshIndicator要配合列表使用
            child: ListView(
              children: <Widget>[
                Container(
                  decoration: BoxDecoration(color: Colors.white),
                  alignment: Alignment.center,
                  child: Column(
                    children: <Widget>[
                      Row(
                        children: <Widget>[
                          ClipOval(// 裁切圆形
                            child: SizedBox(
                              width: 100,
                              height: 100,
                              child: Image.network(
                                'https://avatars2.githubusercontent.com/u/47808321?s=460&u=62b54fee0e49bfb7e83254f516802b12bbe54046&v=4',
                                width: 100,
                                height: 100,
                              )
                            )
                          ),
                          Padding(
                            padding: EdgeInsets.all(10),
                            child: ClipRRect( // 裁切正方形
                              borderRadius: BorderRadius.all(Radius.circular(10)), // 圆角
                              child: Opacity(
                                opacity: 0.6,
                                child: Image.network(
                                  'https://avatars2.githubusercontent.com/u/47808321?s=460&u=62b54fee0e49bfb7e83254f516802b12bbe54046&v=4',
                                  width: 100,
                                  height: 100,
                                )
                              )
                            ),
                          )
                        ],
                      ),
                      TextField(
                        decoration: InputDecoration(
                          contentPadding: EdgeInsets.fromLTRB(5, 0, 0, 0),
                          hintText: 'please enter',
                          hintStyle: TextStyle(fontSize: 15)
                        ),
                      ),
                      Container(
                        height: 100,
                        margin: EdgeInsets.all(10),
                        child:  PhysicalModel(// 裁切图形
                          color: Colors.transparent,
                          borderRadius: BorderRadius.circular(6),
                          clipBehavior: Clip.antiAlias, // 抗锯齿
                          child: PageView(
                            children: <Widget>[
                              _item('Page1', Colors.deepPurple),
                              _item('Page2', Colors.green),
                              _item('Page3', Colors.red),
                            ],
                          ),
                        )
                      ),
                      Column(
                        children: <Widget>[
                          FractionallySizedBox( // Text不会撑满整个屏幕，FractionallySizedBox可以
                            widthFactor: 1,
                            child: Container(
                              decoration: BoxDecoration(color: Colors.greenAccent),
                              child: Text('width')
                            )
                          )
                        ],
                      ),
                    ],
                  )
                ),
                Stack(// 从下向上堆叠
                  children: <Widget>[
                    Image.network(
                      'https://avatars2.githubusercontent.com/u/47808321?s=460&u=62b54fee0e49bfb7e83254f516802b12bbe54046&v=4',
                      width: 100,
                      height: 100,
                    ),
                    Positioned( // 设置位置
                      left: 0,
                      bottom: 0,
                      child: Image.network(
                        'https://avatars2.githubusercontent.com/u/47808321?s=460&u=62b54fee0e49bfb7e83254f516802b12bbe54046&v=4',
                        width: 36,
                        height: 36,
                      ),
                    )
                  ],
                ),
                Wrap(// wrap布局，从左向右排列，会自动换行
                  spacing: 8, // 水平边距
                  runSpacing: 6, // 垂直边距
                  children: <Widget>[
                    _chip('Flutter'),
                    _chip('Dart'),
                    _chip('Front-End'),
                    _chip('Native'),
                  ],
                )
              ],
            ),
            onRefresh: _handleRefresh)
            :
            Column(
              children: <Widget>[
                Text('list'),
                Expanded(
                  child:
                  Container(
                    decoration: BoxDecoration(color: Colors.red),
                    child: Text('width')
                  )
                )
              ],
            )
        ,
      ),
    );
  }

  Future<Null> _handleRefresh() async {
    await Future.delayed(Duration(microseconds: 200));
    return null;
  }

  _item(String title, Color color) {
    return Container(
      alignment: Alignment.center,
      decoration: BoxDecoration(color: color),
      child: Text(
        title,
        style: TextStyle(fontSize: 22, color: Colors.white)
      ),
    );
  }

  _chip(String label) {
    return Chip(
      label: Text(label),
      avatar: CircleAvatar(
        backgroundColor: Colors.blue.shade900,
        child: Text(
          label.substring(0, 1),
          style: TextStyle(fontSize: 10)
        )
      ),
    );
  }
}

