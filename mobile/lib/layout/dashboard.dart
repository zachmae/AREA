/*
** Copyright GETOUT SAS - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Wrote by Erwan Cariou <erwan1.cariou@epitech.eu>
*/

import 'package:flutter/material.dart';
import 'package:area/layout/dashboard/home.dart';

class DashBoard extends StatefulWidget {
  const DashBoard({Key? key}) : super(key: key);

  @override
  State<DashBoard> createState() => _DashBoardState();
}

class _DashBoardState extends State<DashBoard> {
  int currentPage = 0;
  PageController pageController = PageController(viewportFraction: 0.2, initialPage: 0);
  List<Widget> pages = [const HomePage(), const Text('Settings'), const Text('Profile'), const Text('Hourglass')];

  void _onItemTapped(int index) {
    setState(() {
      currentPage = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        bottomNavigationBar: BottomNavigationBar(
          items: const [
            BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
            BottomNavigationBarItem(icon: Icon(Icons.add_box), label: 'Settings'),
            BottomNavigationBarItem(icon: Icon(Icons.account_circle), label: 'Profile'),
            BottomNavigationBarItem(icon: Icon(Icons.hourglass_bottom_outlined), label: 'Hourglass'),
          ],
          unselectedItemColor: Colors.black,
          currentIndex: currentPage,
          selectedItemColor: Colors.amber[800],
          onTap: _onItemTapped,
          backgroundColor: Colors.white,
        ),
        body: Container(
            decoration: const BoxDecoration(image: DecorationImage(image: AssetImage('assets/background.jpg'), fit: BoxFit.cover)),
            child: Column(children: [
              Expanded(
                  child: PageView.builder(
            scrollDirection: Axis.horizontal,
                physics: const NeverScrollableScrollPhysics(),
                controller: pageController,
                padEnds: false,
                itemCount: pages.length,
                itemBuilder: (context, index) {
                  return pages[index];
                },
                onPageChanged: (page){
                  setState(() {
                    currentPage = page;
                  });
                }
            )),
            ])));
  }
}
