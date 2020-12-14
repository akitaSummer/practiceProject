import 'package:flutter/material.dart';
import 'dart:io';
import 'package:path_provider/path_provider.dart';
import 'package:transparent_image/transparent_image.dart';
import 'package:cached_network_image/cached_network_image.dart';

class ResourcePage extends StatefulWidget {
  @override
  _ResourcePageState createState() => _ResourcePageState();
}

class _ResourcePageState extends State<ResourcePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('resource'),
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
            Image(
              height: 136,
              width: 136,
              image: AssetImage('images/avatar.jpg'),
            ),
            Image.asset('images/avatar.jpg', width: 136, height: 136),
            Image.network(
              'https://avatars2.githubusercontent.com/u/47808321?s=460&u=62b54fee0e49bfb7e83254f516802b12bbe54046&v=4',
              width: 136,
              height: 136
            ),
            FutureBuilder(
              future: _getLocalFile('Download/Stack.png'),
              builder: (BuildContext context, AsyncSnapshot<File> snapshot) {
                return snapshot.data == null ? Container() : Image.file(snapshot.data);
              },
            ),
            FadeInImage.memoryNetwork(placeholder: kTransparentImage, image: 'https://avatars2.githubusercontent.com/u/47808321?s=460&u=62b54fee0e49bfb7e83254f516802b12bbe54046&v=4'),
            FadeInImage.assetNetwork(placeholder: 'images/avatar.jpg', image: 'https://avatars2.githubusercontent.com/u/47808321?s=460&u=62b54fee0e49bfb7e83254f516802b12bbe54046&v=4'),
            CachedNetworkImage(
              imageUrl: 'https://avatars2.githubusercontent.com/u/47808321?s=460&u=62b54fee0e49bfb7e83254f516802b12bbe54046&v=4',
              placeholder: (context, url) => new CircularProgressIndicator(),
              width: 136,
              height: 136,
            )
          ],
        )
      ),
    );
  }

  Future<File> _getLocalFile(String filename) async {
    String dir = (await getExternalStorageDirectory()).path;
    return new File('${dir}/${filename}');
  }
}
