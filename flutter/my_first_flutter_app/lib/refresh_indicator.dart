import 'package:flutter/material.dart';

class RefreshIndicatorPage extends StatefulWidget {
  @override
  _RefreshIndicatorPageState createState() => _RefreshIndicatorPageState();
}

class _RefreshIndicatorPageState extends State<RefreshIndicatorPage> {

  List<String> cityNames = [ '北京', '上海', '广州', '深圳', '杭州', '苏州', '成都', '武汉', '郑州', '洛阳', '厦门', '青岛', '拉萨' ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('RefreshIndicatorPage'),
        leading: BackButton(),
      ),
      body: RefreshIndicator(
        onRefresh: _handleRefresh,
        child: ListView(
          children: _build(),
        ),
      )
    );
  }

  Future<Null> _handleRefresh() async {
    await Future.delayed(Duration(seconds: 2));
    setState(() {
      cityNames = cityNames.reversed.toList();
    });
  }

  List<Widget> _build() {
    return cityNames.map((city) => _item(city)).toList();
  }

  Widget _item(String city) {
    return Container(
      height: 80,
      margin: EdgeInsets.only(bottom: 5),
      decoration: BoxDecoration(color: Colors.teal),
      alignment: Alignment.center,
      child: Text(
        city,
        style: TextStyle(
          color: Colors.white,
          fontSize: 20
        ),
      ),
    );
  }
}
