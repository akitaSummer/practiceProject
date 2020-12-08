/**
 * 使用extends继承
 * 会继承可见的属性和方法，不会继承构造函数
 * 能覆写父类的方法getter和setter
 */
class Person {
  String name;
  int age;
  Person(this.name, this.age);
  void printInfo() {
    print('${this.name}---${this.age}');
  }

  void work() {
    print('working...');
  }
}

class Student extends Person {
  String sex;
  Student(String name, int age, String sex) : super(name, age) {
    this.sex = sex;
  }

  @override // 覆写时尽量加上，可不加
  void printInfo() {
    print('${this.name}---${this.age}---${this.sex}');
    super.work(); // 子类调用父类方法
  }
}

void main() {
  Student s = new Student('student', 20, 'male');
  s.printInfo();
  s.work();
}
