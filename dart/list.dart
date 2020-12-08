/**
 * List
 * 属性
 * length
 * reversed 翻转
 * isEmpty
 * isNotEmpty
 * 方法
 * add
 * addAll
 * indexOf
 * remove
 * removeAt 
 * fillRange 修改
 * insert(index, value)
 * insert(index, list)
 * toList() 其他类型转List
 * join() List转字符串
 * split() 字符串转List
 * forEach
 * map
 * where
 * any
 */

void main() {
  List myList = ['apple', 'huawei', 'xiaomi'];

  myList.addAll(['vivo', 'oppo']);

  // (oppo, vivo, xiaomi, huawei, apple)
  print(myList.reversed);
  // [oppo, vivo, xiaomi, huawei, apple]
  print(myList.reversed.toList());

  myList.fillRange(1, 2, 'aaa');
  print(myList);
  Map person = {
    'name': 'name',
    'age': 20,
  };
  person.forEach((key, value) {
    print(key);
    print(value);
  });
}
