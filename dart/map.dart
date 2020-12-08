/**
 * 映射Maps是无序的键值对
 * 属性
 * keys
 * values
 * isEmpty
 * isNotEmpty
 * 方法
 * remove(key)
 * addAll({...})
 * containsValue 查看映射内的值,返回ture/false
 * forEach
 * map
 * where
 * any
 * every
 */

void main() {
  Map person = {
    'name': 'name',
    'age': 20,
  };
  person['age'] = 21;
  print(person.keys);
  person.addAll({'sex': 'male'});
  print(person);
  print(person.containsValue(20));
}
