import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class FutureBuilderPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('future_builder'),
        leading: BackButton(),
      ),
      body: FutureBuilder(
        future: fetchPost(),
        builder: (BuildContext context, AsyncSnapshot<CommonModel> snapshot) {
          switch(snapshot.connectionState) {
            case ConnectionState.none:
              return new Text('Input a URL to start');
            case ConnectionState.waiting:
              return new Center(child: new CircularProgressIndicator(),);
            case ConnectionState.active:
              return new Text('');
            case ConnectionState.done:
              if (snapshot.hasError) {
                return new Text(
                  '${snapshot.error}',
                  style: TextStyle(color: Colors.red)
                );
              }
              return new Column(
                children: [
                  Text('icon:${snapshot.data.icon}'),
                  Text('statusBarColor:${snapshot.data.statusBarColor}'),
                  Text('title:${snapshot.data.title}'),
                  Text('url:${snapshot.data.url}'),
                ],
              );
            default:
              return new Text('Input a URL to start');
          }
        },
      ),
    );
  }

  Future<CommonModel> fetchPost() async {
    http.Response response = await http.get('http://www.devio.org/io/flutter_app/json/test_common_model.json');
    Utf8Decoder utf8decoder = Utf8Decoder(); // fix 中文乱码
    Map<String, dynamic> result = json.decode(utf8decoder.convert(response.bodyBytes));
    return CommonModel.fromJson(result);
  }
}

class CommonModel {
  final String icon;
  final String title;
  final String url;
  final String statusBarColor;
  final bool hideAppBar;

  CommonModel({this.icon, this.title, this.url, this.statusBarColor, this.hideAppBar});

  factory CommonModel.fromJson(Map<String, dynamic> json){
    return CommonModel(
      icon: json['icon'],
      title: json['title'],
      url: json['url'],
      statusBarColor: json['statusBarColor'],
      hideAppBar: json['hideAppBar'],
    );
  }
}
