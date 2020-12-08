void main() {
  List l1 = [1, 2, 3, 4];
  cat:
  for (int i = 0; i < l1.length; i++) {
    print(l1[i]);
    if (i == 1) {
      continue;
    } else if (i == 2) {
      break cat;
    }
  }
  int i = 0;
  while (i < 10) {
    i++;
    print(i);
  }
  do {
    print('do while');
  } while (i < 10);

  List myList = ['apple', 'huawei', 'xiaomi'];
  for (String item in myList) {
    print(item);
  }
  myList.forEach((item) => print(item));
  List newList = myList.map((item) {
    return item;
  }).toList();
  print(newList);

  List<int> Nums = [1, 2, 3, 4, 5, 6, 7];
  print(Nums.where((element) => element > 5));
}
