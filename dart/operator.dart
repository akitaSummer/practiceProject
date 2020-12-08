void main() {
  int a = 13;
  int b = 5;

  print(a ~/ b); // 取整

  // ??= 如果为空，则赋值
  int c;
  c ??= 12;
  print(c);

  int d;
  d ??= 23;
  print(d);

  bool flag = true;
  String e = flag ? 'true' : 'false';
  print(e);

  var f;
  var g = f ?? 10;
  print(g);

  String str = '1234';
  int myNum = int.parse(str);
  // toString() int.parse() double.parse()
  print(myNum);

  String price = '';
  try {
    print(double.parse(price));
  } catch (e) {
    print(0);
  }
  // isEmpty 判断是否为空 isNaN判断是否为NaN
  print(price.isEmpty);
}
