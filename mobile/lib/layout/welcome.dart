/*
** Welcome Page
** Wrote by Erwan Cariou <erwan1.cariou@epitech.eu>
*/

import 'package:area/layout/sign/login.dart';
import 'package:area/model/flex_size.dart';
import 'package:area/layout/sign/register.dart';
import 'package:area/layout/google_token.dart';
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
            SizedBox(
                width: perWidth(context, 50),
                height: 65,
                child: FloatingActionButton(
                    heroTag: ('devBtn'),
                    shape: const RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(50.0))),
                    onPressed: () => Navigator.push(context, MaterialPageRoute(
                        builder: (context) => const GoogleLoginPage())),
                        builder: (context) => const WelcomePage())),
                    child: const Text('page in dev',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 19,
                        ))
                )
            )
          ],),
        ),
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
                builder: (context) => (isRegister ? const LoginPage() : const RegisterPage()))),
            child: Text((isRegister ? 'Sign In': 'Sign Up'),
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 19,
                ))
        )
    );
  }
}