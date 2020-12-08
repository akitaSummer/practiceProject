/**
 * 常用数据类型：
 * int
 * double
 * Stirng
 * bool
 * List 数组
 * Map 字典
 * 
 * 不常用
 * Runes UTF-32变化字符串，可以通过文字转换成符号标签或者代表the定的文字
 * 
 * main() {
 *  var clapping = '\u{1f44f}';
 *  print(clapping);
 *  Runes input = new Runes('u2665');
 *  print(new String.formCharCodes(input));
 * 
 * Symbols 表示对象在Dart程序中声明的运算符或标识符
 * }
 * 
 * 
 */
void main() {
  // var str = 'hello dart';
  String str = 'hello dart';
  String str2 = '''
  hello dart
  ''';
  int num = 1234;
  print(str);
  print(str + str2);
  print('${str} $str2');
  print(num);

  // const 值不变，一开始就需要赋值
  const double PI = 3.14;
  // final 可以开始不用赋值，只能赋值一次
  final DateTime a = new DateTime.now();
  // const DateTime b = new DateTime.now(); // 报错
  // final是惰性初始化，在运行第一次使用前才初始化
  print(PI);
  print(a);

  bool flag = true;
  print(flag);
  if (a != 'true') {
    print(true);
  } else {
    print(false);
  }

  List l1 = ['aaa', 'bbb', 'ccc'];
  List l2 = new List();
  List<String> l3 = ['ggg'];
  l2.add('eee');
  l2.add('fff');
  print(l1);
  print(l2.length);
  print(l3[0]);

  Map persion = {
    'name': 'ekko',
    'age': 20,
    'work': ['asdf']
  };
  Map p = new Map();
  p['name'] = 'akl';
  print(persion);
  print(p['name']);

  // 可以通过 is 关键字判断类型
  print(str is String);
}
