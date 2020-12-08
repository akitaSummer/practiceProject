/**
 * dart也存在接口
 * 
 * dart接口没有interface关键字，普通类或抽象类都可以作为接口实现
 * 
 * 如果是实现的类是普通类，会将普通类和抽象类中的属性的方法全部覆写一边
 * 
 * 抽象类可以定义抽象方法，普通类不可以，建议使用抽象类定义接口 
 */

abstract class A {
  String name;
  void printA();
}

abstract class B {
  void printB();
}

class C implements A, B {
  @override
  String name;

  @override
  void printA() {
    print('A');
  }

  @override
  void printB() {
    print('B');
  }
}

abstract class Db {
  String uri;
  void add();
  void save();
  void delete();
}

class Mysql implements Db {
  @override
  String uri;

  Mysql(this.uri);

  @override
  void add() {
    print('Mysql add');
  }

  @override
  void delete() {
    print('Mysql delete');
  }

  @override
  void save() {
    print('Mysql save');
  }
}

class Mongodb implements Db {
  @override
  String uri;

  Mongodb(this.uri);

  @override
  void add() {
    print('Mongodb add');
  }

  @override
  void delete() {
    print('Mongodb delete');
  }

  @override
  void save() {
    print('Mongodb save');
  }
}

void main() {
  Mysql ms = new Mysql('Mysql');
  ms.add();
}
