import 'Route.dart';

class TestOne {
  TestOne() {
    print('TestOne');
    print(Route.name);
    Route.name = '1234';
    print(Route.name);
  }
}
