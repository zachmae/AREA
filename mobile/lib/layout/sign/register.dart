/*
** Copyright GETOUT SAS - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Wrote by Erwan Cariou <erwan1.cariou@epitech.eu>
*/

import 'package:area/model/flex_size.dart';
import 'package:flutter/material.dart';
import 'package:area/model/field.dart';
import 'package:area/model/sign_appBar.dart';
import 'package:area/requests/sign.dart';
import 'package:area/layout/load.dart';


class RegisterPage extends StatefulWidget {
  const RegisterPage({Key? key}) : super(key: key);

  @override
  State<RegisterPage> createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {

  TextEditingController emailController = TextEditingController();
  TextEditingController passwordController = TextEditingController();
  TextEditingController password2Controller = TextEditingController();
  final _emailKey = GlobalKey<FormState>();
  final _passwordKey = GlobalKey<FormState>();
  final _password2Key = GlobalKey<FormState>();
  bool isLoading = false;

  Future<VoidCallback?> registerPressed() async {
    if (_emailKey.currentState!.validate() && _passwordKey.currentState!.validate() && _password2Key.currentState!.validate()) {
      setState(() {
        isLoading = true;
      });
      var res = await register(context, email: emailController.text, password: passwordController.text);
      if (res == 'OK') {
        Navigator.pushNamed(context, '/Welcome');
      } else {
        setState(() {
          isLoading = false;
        });
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(res)));
      }
    }
    return null;
  }

  Future<VoidCallback?> googleLogin() async {
    var res = await googleSignIn(context, false);
    if (res == 'OK') {
      Navigator.pushNamed(context, '/Dashboard');
    } else if (res != 'KO'){
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(res)));
    }
    return null;
  }

  @override
  Widget build(BuildContext context) {
    return isLoading
        ? const LoadPage()
        : Scaffold(
        appBar: SignAppBar(title: 'SIGN UP', onBackPressed: () => Navigator.pop(context)),
        body: Container(
            decoration: const BoxDecoration(
              image: DecorationImage(
                image: AssetImage('assets/background.jpg'),
                fit: BoxFit.cover,
              ),
            ),
            child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  const SizedBox(height: 50),
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
                  Padding(
                      padding: const EdgeInsets.all(20.0),
                      child: SecondPasswordField(formKey: _password2Key, controller: password2Controller, fstPassword: passwordController.text)
                  ),
                  const SizedBox(height: 30),
                  SizedBox(
                      width: perWidth(context, 90),
                      height: 65,
                      child: FloatingActionButton(
                          backgroundColor: const Color.fromRGBO(9, 132, 227, 1),
                          shape: const RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(50.0))),
                          onPressed: registerPressed,
                          child: const Text('Register',
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
                  const SizedBox(height: 50),
                  googleButton(context),
                ]
            )
        )
    );
  }
  Widget googleButton(BuildContext context) {
    return SizedBox(
      width: perWidth(context, 70),
      height: 65,
      child: ElevatedButton(
        onPressed: googleLogin,
        style: ElevatedButton.styleFrom(
          backgroundColor: Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(50),
          ),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Image.asset(
                'assets/Google_G_Logo.png',
                height: 36),
            const SizedBox(width: 16),
            const Text('Sign in with Google',
              style: TextStyle(
                color: Colors.black,
                fontSize: 16,
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
      ),
    );
  }

}
