/*
** Welcome Page
** Wrote by Erwan Cariou <erwan1.cariou@epitech.eu>
*/

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
        body: Container(
          width: MediaQuery.of(context).size.width, // size of the screen
          decoration: const BoxDecoration(
            image: DecorationImage(
              image: AssetImage('assets/background.jpg'),
              fit: BoxFit.cover,
            ),
          ),
          child: Column(children: [
            SizedBox(height: perHeight(context, 10)),
            SizedBox(
              height: perHeight(context, 35),
                child: Image.asset('assets/transparent_logo.png')),
            SizedBox(height: perHeight(context, 12)),
            signButton(context, true),
            SizedBox(height: perHeight(context, 5)),
            signButton(context, false),
            SizedBox(height: perHeight(context, 5)),
          ],),
        ),
    );
  }

  Widget signButton(BuildContext context, bool isRegister) {
    return SizedBox(
        width: perWidth(context, 85),
        height: 65,
        child: FloatingActionButton(
            backgroundColor: const Color.fromRGBO(9, 132, 227, 1),
            heroTag: (isRegister ? 'signInBtn': 'signUpBtn'),
            shape: const RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(50.0))),
            onPressed: () => Navigator.pushNamed(context, (isRegister ? '/Login': '/Register')),
            child: Text((isRegister ? 'Sign In': 'Sign Up'),
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 19,
                ))
        )
    );
  }
}