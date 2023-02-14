/*
** Copyright GETOUT SAS - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Wrote by Erwan Cariou <erwan1.cariou@epitech.eu>
*/

import 'package:flutter/material.dart';
import 'package:area/layout/dashboard/home.dart';
import 'package:area/layout/dashboard/add.dart';

class DashBoard extends StatefulWidget {
  const DashBoard({Key? key}) : super(key: key);

  @override
  State<DashBoard> createState() => _DashBoardState();
}

class _DashBoardState extends State<DashBoard> {
  int currentPage = 0;
  PageController pageController = PageController(viewportFraction: 1, initialPage: 0);
  List<Widget> pages = const <Widget> [ HomePage(),  AddAreaPage(),  Text('Profile'),  Text('Hourglass')];

  void _onItemTapped(int index) {
    setState(() {
      currentPage = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        bottomNavigationBar: BottomNavigationBar(
          items: const <BottomNavigationBarItem> [
            BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
            BottomNavigationBarItem(icon: Icon(Icons.add_box), label: 'Settings'),
            BottomNavigationBarItem(icon: Icon(Icons.account_circle), label: 'Profile'),
            BottomNavigationBarItem(icon: Icon(Icons.hourglass_bottom_outlined), label: 'Hourglass'),
          ],
          unselectedItemColor: Colors.black,
          currentIndex: currentPage,
          selectedItemColor: Colors.blue,
          onTap: _onItemTapped,
          backgroundColor: Colors.white,
        ),
        body: pages.elementAt(currentPage));
  }
}
