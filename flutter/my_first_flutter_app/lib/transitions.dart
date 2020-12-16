import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart' show timeDilation;

class PhotoHero extends StatelessWidget {
  final String photo;
  final VoidCallback onTap;
  final double width;

  const PhotoHero({Key key, this.photo, this.onTap, this.width}): super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: width,
      child: Hero(
          tag: photo,
          child: Material(
            color: Colors.transparent,
            child: InkWell(
              onTap: onTap,
              child: Image.asset(
                photo,
                fit: BoxFit.contain
              ),
            ),
          )
      ),
    );
  }
}

class HeroAnimation extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    timeDilation = 2.0;
    return Scaffold(
      appBar: AppBar(
        title:const Text('Basic Hero Animation'),
      ),
      body: Center(
        child: PhotoHero(
          photo: 'images/avatar.jpg',
          onTap: () {
            Navigator.of(context).push(MaterialPageRoute(builder: (context) {
              return Scaffold(
                appBar: AppBar(
                  title: const Text('Flippres Page'),
                ),
                body: Container(
                  color: Colors.lightBlueAccent,
                  padding: EdgeInsets.all(16),
                  alignment: Alignment.topLeft,
                  child: PhotoHero(
                    photo: 'images/avatar.jpg',
                    width: 100,
                    onTap: () {
                      Navigator.of(context).pop();
                    }
                  )
                )
              );
            }));
          },
        )
      )
    );
  }

}
