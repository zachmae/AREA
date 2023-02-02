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

class LoginPage extends StatefulWidget {
  const LoginPage({Key? key}) : super(key: key);

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {

  TextEditingController emailController = TextEditingController();
  TextEditingController passwordController = TextEditingController();
  final _emailKey = GlobalKey<FormState>();
  final _passwordKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: SignAppBar(title: 'SIGN IN', onBackPressed: () => Navigator.pop(context)),
        body: Container(
          decoration: const BoxDecoration(
            image: DecorationImage(
              image: AssetImage('assets/background.jpg'),
              fit: BoxFit.cover,
            ),
          ),
          child: Column(
      mainAxisAlignment: MainAxisAlignment.end,
      children: [
          SizedBox(width: perWidth(context, 90), child: const Text('Email address', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold))),
          Padding(
            padding: const EdgeInsets.all(20.0),
            child: MailField(formKey: _emailKey, controller: emailController),
          ),
          SizedBox(width: perWidth(context, 90), child: const Text('Password', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold))),
          Padding(
            padding: const EdgeInsets.all(20.0),
            child: PasswordField(formKey: _passwordKey, controller: passwordController)
          ),
          SizedBox(
              width: perWidth(context, 90),
              height: 65,
              child: FloatingActionButton(
                  shape: const RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(50.0))),
                  onPressed: () {
                  if (_emailKey.currentState!.validate() && _passwordKey.currentState!.validate()) {
                    login(onPressed: () => Navigator.push(context, MaterialPageRoute(
                      builder: (context) => const DashBoard())), email: emailController.text, password: passwordController.text);
                  }},
                  child: const Text('Login',
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
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold))
          )]
        )
      )
    );
  }
}
