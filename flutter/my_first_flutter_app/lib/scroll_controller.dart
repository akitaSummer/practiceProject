import 'package:flutter/material.dart';

class ScrollControllerPage extends StatefulWidget {
  @override
  _ScrollControllerPageState createState() => _ScrollControllerPageState();
}

class _ScrollControllerPageState extends State<ScrollControllerPage> {

  ScrollController _scrollController = ScrollController();

  List<String> cityNames = [ '北京', '上海', '广州', '深圳', '杭州', '苏州', '成都', '武汉', '郑州', '洛阳', '厦门', '青岛', '拉萨' ];


  @override
  void initState() {
    _scrollController.addListener(() {
      if (_scrollController.position.pixels == _scrollController.position.maxScrollExtent) {
        _loadData();
      }
    });
    super.initState();
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text('ScrollControllerPage'),
          leading: BackButton(),
        ),
        body: RefreshIndicator(
          onRefresh: _handleRefresh,
          child: ListView(
            children: _build(),
            controller: _scrollController,
          ),
        )
    );
  }

  _loadData() async {
    await Future.delayed(Duration(milliseconds: 200));
    setState(() {
      List<String> list = List<String>.from(cityNames);
      list.addAll(cityNames);
      cityNames = list;
    });
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
