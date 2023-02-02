/*
** Copyright GETOUT SAS - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Wrote by Erwan Cariou <erwan1.cariou@epitech.eu>
*/

import 'package:area/model/flex_size.dart';
import 'package:flutter/material.dart';
import 'package:area/model/field.dart';
import 'package:area/layout/welcome.dart';
import 'package:area/model/sign_appBar.dart';
import 'package:area/requests/sign.dart';
import 'package:area/layout/dashboard.dart';

class LoadPage extends StatefulWidget {
  const LoadPage({Key? key}) : super(key: key);

  @override
  State<LoadPage> createState() => _LoadPageState();
}

class _LoadPageState extends State<LoadPage> {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: SignAppBar(title: 'LOADING', onBackPressed: () => Navigator.push(context, MaterialPageRoute(
            builder: (context) => const WelcomePage()))),
        body: Container(
            decoration: const BoxDecoration(
              image: DecorationImage(
                image: AssetImage('assets/background.jpg'),
                fit: BoxFit.cover,
              ),
            ),
            child: Column(
                mainAxisAlignment: MainAxisAlignment.end,
                children: const [
                  Padding(
                    padding: EdgeInsets.all(20.0),
                    child: Text('Loading...', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                  ),
                  Padding(
                      padding: EdgeInsets.all(20.0),
                      child: CircularProgressIndicator()
                  ),
                ]
            )
        )
    );
  }
}
