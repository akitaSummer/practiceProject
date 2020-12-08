void main() {
  List myList = ['apple', 'huawei', 'xiaomi'];
  // 箭头函数中只能有一句话
  myList.forEach((value) => print(value));
  printNum(6);
  ((int n) {
    print('-----------$n');
  })(12);
}

bool Function(int n) isEventNumber = (int n) {
  return n % 2 == 0;
};

void printNum(int n) {
  for (int i = 1; i <= n; i++) {
    if (isEventNumber(i)) {
      print(i);
    }
  }
}
