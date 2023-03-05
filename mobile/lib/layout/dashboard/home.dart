/*
** Copyright GETOUT SAS - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Wrote by Erwan Cariou <erwan1.cariou@epitech.eu>
*/

import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:area/model/flex_size.dart';
import 'package:area/layout/load.dart';
import 'package:area/requests/get_area.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  bool link = false;
  bool isLoading = true;
  bool first = true;
  bool noArea = true;
  Map<int, Map<String, String>> area = {};
  List<bool> switchList = [];

  @override
  Widget build(BuildContext context) {
    if (first && isLoading) {
      getArea(context).then((value) {
        area.clear();
        switchList.clear();
        area[0] = {};
        switchList.add(false);
        if (value.isEmpty) {
          setState(() {
            first = false;
            isLoading = false;
            noArea = true;
          });
          return;
        }
        for (var i = 0; i < value.length; i++) {
          switchList.add(value[i]['active']);
          area[i + 1] = {
            'actionService': value[i]['serviceAct'],
            'actionAction': value[i]['action'],
            'actionArgs': value[i]['actionArgs'],
            'reactionService': value[i]['serviceRea'],
            'reactionAction': value[i]['reaction'],
            'reactionArgs': value[i]['reactionArgs'],
            'id': value[i]['id'].toString(),
          };
        }
        setState(() {
          noArea = false;
          first = false;
          isLoading = false;
        });
      });
    }
    if (!isLoading && area.isEmpty) {
      return Scaffold(
        appBar: AppBar(
          title: const Text('Area', style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold, color: Colors.black)),
          backgroundColor: Colors.transparent,
          elevation: 0.0,
          centerTitle: true,
          automaticallyImplyLeading: false,
        ),
        body: Center(
            child: Column(
                children: <Widget> [
                  SizedBox(height: perHeight(context, 35)),
                  const Text('No service available', style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold, color: Colors.red)),
                ])
        ),
      );
    }
    if (!isLoading && noArea) {
      return Scaffold(
        appBar: AppBar(
          title: const Text('Area', style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold, color: Colors.black)),
          backgroundColor: Colors.transparent,
          elevation: 0.0,
          centerTitle: true,
          automaticallyImplyLeading: false,
        ),
        body: Center(
            child: Column(
                children: <Widget> [
                  SizedBox(height: perHeight(context, 35)),
                  const Text('You don\'t have any Area :(', style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold, color: Colors.black)),
                ])
        ),
      );
    }
    return isLoading ? const LoadPage() : Scaffold(
      appBar: AppBar(
        title: const Text('Area', style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold, color: Colors.black)),
        backgroundColor: Colors.transparent,
        elevation: 0.0,
        centerTitle: true,
        automaticallyImplyLeading: false,
      ),
          body: Center(
            child:  ListView(
                children: <Widget> [
                const SizedBox(height: 25),
                for(int i = 1; i < area.length; i++)
                  basicArea(context, i),
            ])
          ),
    );
  }

  Widget basicArea(BuildContext context, int index) {
    Map<String, dynamic> actionArgs = jsonDecode(area[index]!['actionArgs']!);
    Map<String, dynamic> reactionArgs = jsonDecode(area[index]!['reactionArgs']!);
    int id = int.parse(area[index]!['id']!);

    return Container(
        width: perWidth(context, 80),
        margin: const EdgeInsets.all(30.0),
        padding: const EdgeInsets.all(10.0),
        decoration: BoxDecoration(
          border: Border.all(
            width: 1,
          ),
        ),
          child: Column(children: [
            const SizedBox(height: 10),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                Text(area[index]!['actionService']!, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.black)),
                const SizedBox(height: 10),
                Text(area[index]!['actionAction']!, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.black)),
              ],
            ),
            const SizedBox(height: 5),
            for(int i = 0; i < actionArgs.length; i++)
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  Text('${actionArgs.keys.elementAt(i)} : ', style: const TextStyle(fontSize: 15, color: Colors.black)),
                  const SizedBox(height: 10),
                  Text(actionArgs.values.elementAt(i), style: const TextStyle(fontSize: 15, color: Colors.black)),
                ],
              ),
            const SizedBox(height: 15),
            const Icon(Icons.arrow_downward, size: 30),
            const SizedBox(height: 15),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                Text(area[index]!['reactionService']!, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.black)),
                const SizedBox(height: 10),
                Text(area[index]!['reactionAction']!, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.black)),
              ],
            ),
            const SizedBox(height: 5),
            for(int i = 0; i < reactionArgs.length; i++)
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  Text('${reactionArgs.keys.elementAt(i)} : ', style: const TextStyle(fontSize: 15, color: Colors.black)),
                  const SizedBox(height: 10),
                  Text(reactionArgs.values.elementAt(i), style: const TextStyle(fontSize: 15, color: Colors.black)),
                ],
              ),
            const SizedBox(height: 15),
            Container(
              width: perWidth(context, 90),
              decoration: const BoxDecoration(
                border: Border(
                  bottom: BorderSide(color: Colors.black),
                ),
              ),
            ),
            const SizedBox(height: 10),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                Switch(
                  value: switchList[index],
                  activeColor: Colors.blue,
                  onChanged: (bool value) {
                    setState(() {
                      isLoading = true;
                      switchArea(context, id, (value ? false : true)).then((value) {
                        setState(() {
                          first = true;
                        });
                      });
                    });
                  },
                ),
                IconButton(
                  icon: const Icon(
                    Icons.delete,
                    color: Colors.red,
                  ),
                  onPressed: () {
                    setState(() {
                      isLoading = true;
                      deleteArea(context, id).then((value) {
                        setState(() {
                          first = true;
                        });
                      });
                    });
                    // Handle delete button press
                  },
                )
              ],
            ),
          ],));
  }
}
