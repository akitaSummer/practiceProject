import 'package:flutter/material.dart';
import 'package:flutter/animation.dart';

class AnimatedWidgetPage extends StatefulWidget {
  @override
  _AnimatedWidgetPageState createState() => _AnimatedWidgetPageState();
}

class _AnimatedWidgetPageState extends State<AnimatedWidgetPage> with SingleTickerProviderStateMixin {

  Animation<double> animation;
  AnimationController controller;

  @override
  void initState() {
    super.initState();
    controller = AnimationController(vsync: this, duration: const Duration(seconds: 2));
    animation =  Tween<double>(begin: 0, end: 300).animate(controller);
    controller.forward();
  }

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('animation'),
        leading: GestureDetector(
          onTap: () {
            Navigator.pop(context);
          },
          child: Icon(Icons.arrow_back),
        ),
      ),
      body: Center(
          child: ListView(
            children: [
              GestureDetector(
                  child: Text(
                    'Start',
                    textDirection: TextDirection.ltr,
                  ),
                  onTap: () {
                    controller.reset();
                    controller.forward();
                  }
              ),
              AnimatedLogo(animation: animation,)
            ],
          )
      ),
    );
  }
}

class AnimatedLogo extends AnimatedWidget {
  AnimatedLogo({Key key, Animation<double> animation}): super(key: key, listenable: animation);
  @override
  Widget build(BuildContext context) {
    final Animation<double> animation = listenable;
    return Container(
      margin: EdgeInsets.symmetric(vertical: 10),
      height: animation.value,
      width: animation.value,
      child: FlutterLogo()
    );
  }
}

class LogWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
        margin: EdgeInsets.symmetric(vertical: 10),
        child: FlutterLogo()
    );
  }
}

class GrowTransition extends StatelessWidget {
  final Widget child;
  final Animation<double> animation;

  const GrowTransition({this.animation, this.child});

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: animation,
      builder: (context, child) => Container(
        height: animation.value,
        width: animation.value,
        child: child,
      ),
      child: child,
    );
  }
}
