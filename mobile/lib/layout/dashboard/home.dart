/*
** Copyright GETOUT SAS - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Wrote by Erwan Cariou <erwan1.cariou@epitech.eu>
*/

import 'package:area/layout/welcome.dart';
import 'package:flutter/material.dart';
import 'package:area/constants/token.dart';
import 'package:area/requests/sign.dart';
import 'package:area/model/flex_size.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int currentPage = 0;
  PageController pageController = PageController(viewportFraction: 0.2, initialPage: 0);
  List<Widget> pages = [const Text('Home'), const Text('Settings'), const Text('Profile'), const Text('Hourglass')];

  void _onItemTapped(int index) {
    setState(() {
      currentPage = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return
      /*((googleToken != null && googleToken != '') ?
            connected(context) :
            notConnected(context)),*/
      connected(context);
  }

  Widget notConnected(BuildContext context) {
    return Row(children: [
      const SizedBox(width: 50),
      SizedBox(
        width: 80,
        child: Image.asset('assets/Google_G_Logo.png'),
      ),
      const SizedBox(
        width: 70,
        height: 200,
      ),
      SizedBox(
        width: 200,
        height: 60,
        child : FloatingActionButton(
            heroTag: ('devBtn'),
            shape: const RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(50.0))),
            onPressed: () => Navigator.pushNamed(context, '/Welcome'),
            child: const Text('link acount',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 15,
                ))
        ))/*FloatingActionButton(
            heroTag: ('link account'),
                  shape: const RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(50.0))),
                  onPressed: () => googleSignIn(context),
    child: const Text('link account',
    style: TextStyle(
    color: Colors.white,
    fontSize: 19,
    ))
    ),*/
      //)
    ],);
  }

  Widget connected(BuildContext context) {
    return Column(children: [
      Container(
        height: 300,
        width: 100000,
        margin: const EdgeInsets.all(30.0),
        padding: const EdgeInsets.all(10.0),
        decoration: BoxDecoration(
          border: Border.all(
            width: 1,
          ),
        ),
          child: SizedBox( width: 2000,
        child: Image.asset('assets/Google_G_Logo.png')),
      )],
        );
  }
}
