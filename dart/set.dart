/**
 * Set
 * 非重数组，没有顺序，不能重复，不能使用索引取值
 */

void main() {
  Set s = new Set();
  s.add('apple');
  s.add('apple');
  print(s);
  print(s.toList());

  List myList = ['apple', 'huawei', 'xiaomi', 'apple', 'huawei', 'xiaomi'];

  s.addAll(myList);
  print(s.toList());
}
