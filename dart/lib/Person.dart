class Person {
  String name;

  // 使用_开头设定为私有属性，但是必须在单独文件中才有用
  int _age = 23;

  // Person(this.name);
  Person(String name) {
    this.name = name;
  }

  Person.setAge(int age) {
    this._age = age;
  }

  Person.setInfo(this.name, this._age);

  void getInfo() {
    print('${this.name} --- ${this._age}');
  }

  void setInfo(age) {
    this._age = age;
  }
}
