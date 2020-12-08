// 泛型函数
T getData<T>(T value) {
  return value;
}

// 泛型类
class PrintClass<T> {
  List list = new List<T>();
  void add(T value) {
    this.list.add(value);
  }

  void printInfo() {
    for (int i = 0; i < this.list.length; i++) {
      print(this.list[i]);
    }
  }
}

// 泛型接口
abstract class Cache<T> {
  getBykey(String key);
  void setByKey(String key, T value);
}

class FileCache<T> implements Cache<T> {
  @override
  getBykey(String key) {
    print('FileCache getBykey $key');
  }

  @override
  void setByKey(String key, T value) {
    print('FileCache setByKey $key $value');
  }
}

class MemoryCache implements Cache<String> {
  @override
  getBykey(String key) {
    print('MemoryCache getBykey $key');
  }

  @override
  void setByKey(String key, String value) {
    print('MemoryCache setByKey $key $value');
  }
}

void main() {
  print(getData<int>(21));
  PrintClass printClass = new PrintClass<int>();
  printClass.add(21);
  printClass.printInfo();
}
