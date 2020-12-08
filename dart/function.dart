void main() {
  print('main');
  printInfo(info: 'printInfo');

  int getNum() {
    return 123;
  }

  print(getNum());
  print(printUserInfo('name'));
  print(sum(2));
  callback(() => print('callback'));
}

// {}命名参数
void printInfo({String info}) {
  print(info);
}

// []可选参数
String printUserInfo(String name, [int age, String sex = 'male']) {
  return 'printUserInfo${age != null ? ' ' + age.toString() : ''} $sex';
}

int sum(int n) {
  int result = 0;
  for (int i = 0; i <= n; i++) {
    result += i;
  }
  return result;
}

void callback(void Function() fn) {
  fn();
}
