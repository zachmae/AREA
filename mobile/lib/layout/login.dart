/*
** Copyright GETOUT SAS - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Wrote by Erwan Cariou <erwan1.cariou@epitech.eu>
*/

import 'dart:convert';

import 'package:area/model/flex_size.dart';
import 'package:flutter/material.dart';
import 'package:area/model/field.dart';
import 'package:http/http.dart' as http;
import 'package:area/layout/welcome.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({Key? key}) : super(key: key);

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {

  TextEditingController emailController = TextEditingController();
  TextEditingController passwordController = TextEditingController();

  Future login(BuildContext context) async {
    var url = Uri.http("http://perry.com", '/login');
    var response = await http.post(url, body: {
      "email" : emailController.text,
      "password" : passwordController.text
    });
    var data = json.decode(response.body);

    if (data == 'success') {
      Navigator.push(context, MaterialPageRoute(
          builder: (context) => const WelcomePage()));
    }

    }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Column(
      mainAxisAlignment: MainAxisAlignment.end,
      children: [
        SizedBox(width: perWidth(context, 90), child: const Text('Email address', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold))),
        Padding(
          padding: const EdgeInsets.all(20.0),
          child: FieldWidget(hintText: 'Enter your email', controller: emailController),
        ),
        SizedBox(width: perWidth(context, 90), child: const Text('Password', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold))),
        Padding(
          padding: const EdgeInsets.all(20.0),
          child: FieldWidget(hintText: 'Enter your password', controller: passwordController),
        ),
        SizedBox(
            width: perWidth(context, 90),
            height: 65,
            child: FloatingActionButton(
                shape: const RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(50.0))),
                onPressed: () => login(context),
                child: const Text('Login',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 19,
                    ))))
      ],
    ));
  }
}
