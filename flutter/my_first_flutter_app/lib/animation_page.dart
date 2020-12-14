import 'package:flutter/material.dart';

class AnimationPage extends StatefulWidget {
  @override
  _AnimationPageState createState() => _AnimationPageState();
}

class _AnimationPageState extends State<AnimationPage> with SingleTickerProviderStateMixin {

  Animation<double> animation;
  AnimationController controller;
  AnimationStatus animationStatus;
  double animationValue;

  @override
  void initState() {
    super.initState();
    controller = AnimationController(vsync: this, duration: const Duration(seconds: 2));
    animation =  Tween<double>(begin: 0, end: 300).animate(controller)
    ..addListener(() {
      setState(() {
        animationValue = animation.value;
      });
    })
    ..addStatusListener((AnimationStatus status) {
      setState(() {
        animationStatus = status;
      });
    });
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
              Text(
                'Status: ${animationStatus.toString()}',
                textDirection: TextDirection.ltr,
              ),
              Text(
                'Value: ${animationValue.toString()}',
                textDirection: TextDirection.ltr,
              ),
              Container(
                height: animation.value,
                width: animation.value,
                child: FlutterLogo()
              )
            ],
          )
      ),
    );
  }
}
