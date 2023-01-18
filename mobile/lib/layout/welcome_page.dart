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
        body: Column(children: [
          SizedBox(height: perHeight(context, 10)),
          SizedBox(
              child: Image.asset('assets/transparent_logo.png'))
        ],),
        /*floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
        floatingActionButton: startButton(context, MediaQuery.of(context).size.width)*/
    );
  }

  /*Widget startButton(BuildContext context, double phoneWidth) {
    return SizedBox(
        width: 85 * phoneWidth / 100,
        height: 65,
        child: FloatingActionButton(
            shape: const RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(50.0))),
            backgroundColor: const Color(0xFF584CF4),
            onPressed: () => Navigator.push(context, MaterialPageRoute(builder: (context) => PreferencesPage())),
            child: const Text('Commencer l\'aventure',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 19,
                ))
        )
    );
  }*/
}