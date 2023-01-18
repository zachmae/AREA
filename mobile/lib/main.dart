/*
** main
** Wrote by Erwan Cariou <erwan1.cariou@epitech.eu>
*/

import 'package:flutter/material.dart';
import 'package:area/layout/welcome_page.dart';

Map<int, Color> colorMap = {
  50: const Color.fromRGBO(91, 181, 245, .1),
  100: const Color.fromRGBO(91, 181, 245, .2),
  200: const Color.fromRGBO(91, 181, 245, .3),
  300: const Color.fromRGBO(91, 181, 245, .4),
  400: const Color.fromRGBO(91, 181, 245, .5),
  500: const Color.fromRGBO(91, 181, 245, .6),
  600: const Color.fromRGBO(91, 181, 245, .7),
  700: const Color.fromRGBO(91, 181, 245, .8),
  800: const Color.fromRGBO(91, 181, 245, .9),
  900: const Color.fromRGBO(91, 181, 245, 1),
};

// ffbe7e  // Orange
// 5bb5f5  // Blue
// 0984e3  // Blue button

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {

  const MyApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Area',
      theme: ThemeData(
          primarySwatch: MaterialColor(0xff7900F9, colorMap),
      ),
      home: const WelcomePage(),
    );
  }
}