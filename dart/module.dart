/**
 * Dart中，库的使用是通过import关键字引入的
 * 
 * library指令可以创建一个库，每个Dart文件都是一个库，即使没有library指令来指定
 * 
 * Dart中的库主要有三种
 * 1. 我们自定义的库
 *  import 'lib/xxx.dart';
 * 2. 系统内置库
 *  import 'dart:math';
 *  import 'dart:io';
 *  import 'dart:convert';
 * 3. Pub包管理系统中的库
 *  https://pub.dev/packages
 *  https://pub.flutter-io.cn/packages
 *  https://pub.dartlang.org/flutter/
 * 
 *  1. 需要在自己的项目根目录新建一个pubspec.yaml
 *  2. 在pubspec.yaml文件中配置名称、描述、依赖等信息
 *  3. 然后运行pub get获取包下载到本地
 *  4. 项目中引入库import 'package:http/http.dart' as http;
 * 
 *  可以使用 as 关键字进行重命名，解决重名冲突
 *  可以使用 show hide 关键字进行部分导入
 * 
 *  使用deferred as关键字进行指定
 *  import 'package:deferred/hello.dart' deferred as hello;
 *  当使用的时候，使用loadLibrary()进行加载
 *  greet() async {
 *    await hello.loadLibrary();
 *    hello.printGreeting();
 *  }
 */
import 'lib/Person.dart';
import 'dart:io'; // HttpClient
import 'dart:convert' show utf8, jsonDecode; // show 是部分引入 hide 是隐藏某些属性
import 'dart:math';
import 'package:http/http.dart' as http;
import 'package:date_format/date_format.dart';

// API: http://news-at.zhihu.com/api/3/stories/latest
getDataFromZhihuAPI() async {
  // 1. 创建HttpClient对象
  HttpClient httpClient = new HttpClient();
  // 2. 创建Uri对象
  Uri uri = new Uri.http('news-at.zhihu.com', '/api/3/stories/latest');
  // 3. 发起请求，等待请求
  HttpClientRequest request = await httpClient.getUrl(uri);
  // 4. 关闭请求，等待响应
  HttpClientResponse response = await request.close();
  // 5. 解码响应内容
  return await response.transform(utf8.decoder).join();
}

void main() async {
  Person p1 = new Person('name');
  print(p1.name);
  p1.getInfo();
  Person p2 = new Person.setInfo('p2', 25);
  p2.getInfo();

  print(min(12, 23));
  print(max(12, 23));

  var result = await getDataFromZhihuAPI();
  print(result);

  http.Response response =
      await http.get('http://news-at.zhihu.com/api/3/stories/latest');
  if (response.statusCode == 200) {
    var jsonResponse = jsonDecode(response.body);
    var itemCount = jsonResponse['totalItems'];
    print(itemCount);
  } else {
    print(response.statusCode);
  }

  print(formatDate(DateTime(1996, 5, 11), [yyyy, '-', mm, '-', dd]));
}
