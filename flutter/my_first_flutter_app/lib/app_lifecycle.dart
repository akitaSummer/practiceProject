import 'package:flutter/material.dart';

/// Flutter应用生命周期
/// WidgetsBindingObserver：是一个Widgets绑定器，通过它我们可以监听应用的生命周期、语言相关的变化

class AppLifecycle extends StatefulWidget {
  @override
  _AppLifecycleState createState() => _AppLifecycleState();
}

class _AppLifecycleState extends State<AppLifecycle> with WidgetsBindingObserver {
  @override
  void initState() {
    WidgetsBinding.instance.addObserver(this);
    super.initState();
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('app_lifecycle'),
        leading: GestureDetector(
          onTap: () {
            Navigator.pop(context);
          },
          child: Icon(Icons.arrow_back),
        ),
      ),
      body: Container(
        child: Text('app_lifecycle'),
      ),
    );
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    super.didChangeAppLifecycleState(state);
    print('state = ${state}');
    if (state == AppLifecycleState.paused) {
      print('paused');
    } else if (state == AppLifecycleState.resumed) {
      print('resumed');
    } else if (state == AppLifecycleState.inactive) {
      // 不常用，如来电话时
      print('inactive');
    } else if (state == AppLifecycleState.inactive) {
      // 不常用，如来被挂起，IOS无此周期
      print('inactive');
    }
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }
}
