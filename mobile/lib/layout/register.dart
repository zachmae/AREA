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

class RegisterPage extends StatefulWidget {
  const RegisterPage({Key? key}) : super(key: key);

  @override
  State<RegisterPage> createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {

  TextEditingController emailController = TextEditingController();
  TextEditingController passwordController = TextEditingController();

  Future login(BuildContext context) async {
    var url = Uri.http("http://127.0.0.1:7000/api/v1/sign", "/up");
    var response = await http.post(url, body: {
      "username" : emailController.text,
      "password" : passwordController.text
    });
    var data = json.decode(response.body);

    if (response.statusCode == 200 && data == 'ok') {
      Navigator.push(context, MaterialPageRoute(
          builder: (context) => const WelcomePage()));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
        icon: const Icon(Icons.arrow_back, color: Colors.black),
          onPressed: () => Navigator.push(context, MaterialPageRoute(
          builder: (context) => const WelcomePage()))),
        backgroundColor: Colors.white,
        title: const Text('SIGN UP', style: TextStyle(color: Colors.black)),
        centerTitle: true,
      ),
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
                    child: const Text('Sign up',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 19,
                        )))),
            const SizedBox(height: 50),
            Container(
              width: perWidth(context, 90),
              decoration: const BoxDecoration(
                border: Border(
                  bottom: BorderSide(color: Colors.black),
                ),
              ),
            ),
            const SizedBox(
              height: 100,
              child: Text('Oauth',
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold))),
          ],
        ));
  }
}
