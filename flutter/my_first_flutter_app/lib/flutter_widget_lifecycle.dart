import 'package:flutter/material.dart';
/// Flutter Widget生命周期
///
/// StatelessWidget只有createElement和build两个生命周期
///
/// StatefulWidget的生命周期根据不同时期分为三种
/// 1. 初始化时期
/// createState、initState
///
/// 2. 更新期间
/// didChangeDependencies、build、didUpdateWidget
///
/// 3. 销毁期间
/// deactivate、dispose
///
class WidgetLifecycle extends StatefulWidget {
  /// 当我们构建新的StatefulWidget时，会被立即调用
  /// 此方法必须被覆盖
  @override
  _WidgetLifecycleState createState() => _WidgetLifecycleState();
}

class _WidgetLifecycleState extends State<WidgetLifecycle> {

  int _count = 0;

  /// 这是创建widget时调用的除构造函数外第一个方法
  /// 在这个方法中通常做一些初始化工作，如channel初始化，监听器初始化
  @override
  void initState() {
    print('---initState---');
    super.initState();
  }

  /// 当依赖State对象改变时会调用
  /// 第一次构建widget时，initState()之后立即调用
  /// 如果StatefulWidget依赖于InheritedWidget，那么当前State所依赖InheritedWidget中的变量改变时会再次调用
  /// InheritedWidget可以高效将数据在Widget树中向下传递共享
  @override
  void didChangeDependencies() {
    print('---didChangeDependencies---');
    super.didChangeDependencies();
  }

  /// 这是一个必须实现的方法，在这里实现你要呈现的内容
  /// 他会在didChangeDependencies()之后立即调用
  /// setState后也会再次调用此方法
  @override
  Widget build(BuildContext context) {
    print('---build---');
    return Scaffold(
      appBar: AppBar(
        title: Text('widget_lifecycle'),
        leading: BackButton(),
      ),
      body: Center(
        child: Column(
          children: [
            RaisedButton(
              onPressed: () {
                setState(() {
                  _count += 1;
                });
              },
              child: Text(
                '点我',
                style: TextStyle(fontSize: 26),
              ),
            ),
            Text(_count.toString())
          ],
        )
      ),
    );
  }

  /// 这是一个不常用的生命周期方法，当父组件需要重绘时才会调用
  /// 该方法会携带一个oldWidget参数，可以将其与当前的widget进行对比以便执行一些额外的逻辑
  /// if (oldWidget.xxx != widget.xxx) { ... }
  @override
  void didUpdateWidget(covariant WidgetLifecycle oldWidget) {
    print('---didUpdateWidget---');
    super.didUpdateWidget(oldWidget);
  }

  /// 很少调用，在组件被移除时调用，在dispose之前调用
  @override
  void deactivate() {
    print('---deactivate---');
    super.deactivate();
  }

  /// 常用，组件销毁时调用
  /// 通常该方法中执行一些资源的释放工作，比如监听器的卸载，channel的销毁等
  @override
  void dispose() {
    print('---dispose---');
    super.dispose();
  }
}
