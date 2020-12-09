import 'package:flutter/material.dart';

// StatefulWidget 可以设置状态
class StateFullGroupPage extends StatefulWidget {
  @override
  _StateFullGroupState createState() => _StateFullGroupState();
}

class _StateFullGroupState extends State<StateFullGroupPage> {
  // 常用StatefulWidget组件：MaterialApp, Scaffold, AppBar, BottomNavigationBar, RefreshIndicator, Image, TextField, PageView
  int _currentIndex = 0;
  @override
  Widget build(BuildContext context) {
    TextStyle textStyle = TextStyle(fontSize: 20);
    return MaterialApp(
      title: 'StateFullGroupPage',
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
                      Image.network(
                        'https://avatars2.githubusercontent.com/u/47808321?s=460&u=62b54fee0e49bfb7e83254f516802b12bbe54046&v=4',
                        width: 100,
                        height: 100,
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
                        margin: EdgeInsets.only(top: 10),
                        decoration: BoxDecoration(color: Colors.lightBlueAccent),
                        child: PageView(
                          children: <Widget>[
                            _item('Page1', Colors.deepPurple),
                            _item('Page2', Colors.green),
                            _item('Page3', Colors.red),
                          ],
                        )
                      )
                    ],
                  )
                )
              ],
            ),
            onRefresh: _handleRefresh) : Text('list'),
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
}

