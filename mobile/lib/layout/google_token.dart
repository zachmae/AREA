import 'package:area/model/flex_size.dart';
import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:area/requests/sign.dart';

class GoogleClass {
  static final _googleClass = GoogleSignIn();

  static Future<GoogleSignInAccount?> login() => _googleClass.signIn();
}

class GoogleLoginPage extends StatefulWidget {
  const GoogleLoginPage({Key? key}) : super(key: key);

  @override
  State<GoogleLoginPage> createState() => _GoogleLoginPageState();
}

class _GoogleLoginPageState extends State<GoogleLoginPage> {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          SizedBox(
              width: perWidth(context, 50),
              height: 65,
              child: FloatingActionButton(
                  heroTag: ('google'),
                  shape: const RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(50.0))),
                  onPressed: () => googleSignIn(context),
                  child: const Text('Go to google',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 19,
                      ))
              )
          )
        ],
      ),
    );
  }
}