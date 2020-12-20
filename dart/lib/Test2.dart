import 'Route.dart';

class TestTwe {
  TestTwe() {
    print('TestTwe');
    print(Route.name);
    Route.name = '7890';
    print(Route.name);
  }
}
