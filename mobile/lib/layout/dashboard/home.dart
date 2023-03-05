/*
** Copyright GETOUT SAS - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Wrote by Erwan Cariou <erwan1.cariou@epitech.eu>
*/

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
  Map<int, Map<String, String>> area = {};
  List<bool> switchList = [];

  @override
  Widget build(BuildContext context) {
    if (first && isLoading) {
      getArea(context).then((value) {
        area[0] = {};
        switchList.add(false);
        for (var i = 0; i < value.length; i++) {
          String dateString = value[i]['createdAt'];
          DateTime date = DateTime.parse(dateString);
          print(date);
          switchList.add(value[i]['active']);
          area[i + 1] = {
            'actionService': value[i]['serviceAct'],
            'actionAction': value[i]['action'],
            'actionArgs': value[i]['actionArgs'],
            'reactionService': value[i]['serviceRea'],
            'reactionAction': value[i]['reaction'],
            'reactionArgs': value[i]['reactionArgs'],
          };
        }
        setState(() {
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
                  basicArea(context, i, actionService: area[i]!['actionService']!, actionAction: area[i]!['actionAction']!, reactionService: area[i]!['reactionService']!, reactionAction: area[i]!['reactionAction']!),
            ])
          ),
    );
  }

  Widget basicArea(BuildContext context, int index, {required String actionService, required String actionAction, required String reactionService, required String reactionAction}) {
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
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(actionService, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.black)),
                const SizedBox(height: 10),
                Text(actionAction, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.black)),
              ],
            ),
            const SizedBox(height: 15),
            const Icon(Icons.arrow_downward, size: 30),
            const SizedBox(height: 15),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(reactionService, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.black)),
                const SizedBox(height: 10),
                Text(reactionAction, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.black)),
              ],
            ),
            const SizedBox(height: 10),
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
                  // This bool value toggles the switch.
                  value: switchList[index],
                  activeColor: Colors.blue,
                  onChanged: (bool value) {
                    setState(() {
                      isLoading = true;
                      deleteArea(context, index).then((value) {
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
                      deleteArea(context, index).then((value) {
                        setState(() {
                          first = true;
                        });
                      });
                      /*area.remove(index);
                      switchList.removeAt(index);*/
                    });
                    // Handle delete button press
                  },
                )
              ],
            ),
          ],));
  }
}
