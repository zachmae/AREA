/*
** Copyright GETOUT SAS - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Wrote by Erwan Cariou <erwan1.cariou@epitech.eu>
*/

import 'package:flutter/material.dart';
import 'package:area/model/flex_size.dart';
import 'package:area/requests/get_github_token.dart';

class ProfilePage extends StatefulWidget {
  const ProfilePage({Key? key}) : super(key: key);

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  late String possibilities;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Profile', style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold, color: Colors.black)),
        backgroundColor: Colors.transparent,
        elevation: 0.0,
        centerTitle: true,
        automaticallyImplyLeading: false,
      ),
      body: Center(
          child: ListView(
              children: <Widget> [
                const SizedBox(height: 25),
                profileInfo(context),
                linkedAccount(context),
                const SizedBox(height: 25)
                //linkedAccount(context)Service
              ])
      ),
    );
  }
  Future<VoidCallback?> githubPress() async {
    var res = await githubLogin(context);
    print("res = $res");
    if (res != 'error') {
      Navigator.pushNamed(context, '/Home');
    } else {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(res!)));
    }
    return null;
  }

  Widget profileInfo(BuildContext context) {
    return Container(
        width: perWidth(context, 80),
        margin: const EdgeInsets.all(30.0),
        padding: const EdgeInsets.all(10.0),
        decoration: BoxDecoration(
          border: Border.all(
            width: 1,
          ),
        ),
        child: Column(
          children: const <Widget> [
            SizedBox(height: 10),
            Text('MyMail', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.black)),
            SizedBox(height: 10),
            Text('MyPerry', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: Colors.black)),
            SizedBox(height: 10),
          ],
        )
    );
  }

  Widget linkedAccount(BuildContext context) {
    return Container(
        width: perWidth(context, 80),
        margin: const EdgeInsets.all(30.0),
        padding: const EdgeInsets.all(10.0),
        decoration: BoxDecoration(
          border: Border.all(
            width: 1,
          ),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget> [
            const SizedBox(height: 10),
            accountLinking('Github', 'assets/github_logo.png'),
            const SizedBox(height: 10)
          ],
        )
    );
  }

  Widget accountLinking(String name, String image) {
    return Row(
      children: <Widget> [
        SizedBox(height: 100, child: Image.asset(image)),
        const SizedBox(width: 5),
        Text(name, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.black)),
        const SizedBox(width: 20),
        SizedBox(
            width: perWidth(context, 35),
            height: 65,
            child: FloatingActionButton(
                heroTag: (name),
                shape: const RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(50.0))),
                onPressed: githubPress,
                child: const Text('link account',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 17,
                    ))
            )
        ),
      ],
    );
  }
}