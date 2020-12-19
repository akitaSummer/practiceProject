import 'package:flutter/material.dart';

class GridViewPage extends StatelessWidget {

  final CITY_NAMES = [ '北京', '上海', '广州', '深圳', '杭州', '苏州', '成都', '武汉', '郑州', '洛阳', '厦门', '青岛', '拉萨' ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('GridViewPage'),
        leading: BackButton(),
      ),
      body: GridView.count(
        crossAxisCount: 2,
        children: _build(),
      ),
    );
  }

  List<Widget> _build() {
    return CITY_NAMES.map((city) => _item(city)).toList();
  }

  Widget _item(String city) {
    return Container(
      height: 80,
      margin: EdgeInsets.only(bottom: 5),
      alignment: Alignment.center,
      decoration: BoxDecoration(color: Colors.teal),
      child: Text(
        city,
        style: TextStyle(color: Colors.white, fontSize: 20)
      ),
    );
  }
}
