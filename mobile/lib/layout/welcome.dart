/*
** Welcome Page
** Wrote by Erwan Cariou <erwan1.cariou@epitech.eu>
*/

import 'package:area/layout/login.dart';
import 'package:area/model/flex_size.dart';
import 'package:flutter/material.dart';


class WelcomePage extends StatefulWidget {
  const WelcomePage({Key? key}) : super(key: key);

  @override
  State<WelcomePage> createState() => _WelcomePageState();
}

class _WelcomePageState extends State<WelcomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Column(children: [
          SizedBox(height: perHeight(context, 10)),
          SizedBox(
            height: perHeight(context, 35),
              child: Image.asset('assets/transparent_logo.png')),
          SizedBox(height: perHeight(context, 12)),
          signButton(context, true),
          SizedBox(height: perHeight(context, 5)),
          signButton(context, false),
        ],),
    );
  }

  Widget signButton(BuildContext context, bool isRegister) {
    return SizedBox(
        width: perWidth(context, 85),
        height: 65,
        child: FloatingActionButton(
            heroTag: (isRegister ? 'signInBtn': 'signUpBtn'),
            shape: const RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(50.0))),
            onPressed: () => Navigator.push(context, MaterialPageRoute(
                builder: (context) => (isRegister ? LoginPage() : const WelcomePage()))),
            child: Text((isRegister ? 'Sign In': 'Sign Up'),
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 19,
                ))
        )
    );
  }
}