import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class LaunchPage extends StatefulWidget {
  @override
  _LaunchPageState createState() => _LaunchPageState();
}

class _LaunchPageState extends State<LaunchPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('launch'),
        leading: GestureDetector(
          onTap: () {
            Navigator.pop(context);
          },
          child: Icon(Icons.arrow_back),
        ),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            RaisedButton(
              onPressed: _launchURL,
              child: Text('open chrome'),
            ),
            RaisedButton(
              onPressed: _openMap,
              child: Text('open map'),
            )
          ],
        ),
      ),
    );
  }

  _launchURL() async {
    const url = 'https://github.com/';
    if (await canLaunch(url)) {
      await launch(url);
    } else {
      throw 'Could not launch ${url}';
    }
  }

  _openMap() async {
    // Android
    const url = 'geo:52.32, 4.917'; // app schema
    if (await canLaunch(url)) {
      await launch(url);
    } else {
      // IOS
      const url = 'http://maps.apple.com/?ll=52.32, 4.917';
      if (await canLaunch(url)) {
        await launch(url);
      } else {
        throw 'Could not launch ${url}';
      }
    }
  }
}
