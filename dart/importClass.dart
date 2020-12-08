import 'lib/Person.dart';

void main() {
  Person p1 = new Person('name');
  print(p1.name);
  p1.getInfo();
  Person p2 = new Person.setInfo('p2', 25);
  p2.getInfo();
}
