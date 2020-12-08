class Person {
  String name;
  int age;
  Person(this.name, this.age);
  void printInfo() {
    print('${this.name}---${this.age}');
  }
}

void main() {
  Person p;
  p?.printInfo();

  Person p2 = new Person('P2', 23);
  p2?.printInfo();

  print(p2 is Person);

  var s;
  s = '';
  s = new Person('s', 23);
  (s as Person).printInfo();

  Person p3 = new Person('p3', 35);
  p3.name = 'p';
  p3.age = 0;
  p3.printInfo();
  p3
    ..name = 'p3'
    ..age = 30
    ..printInfo();
}
