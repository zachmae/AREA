/*
** Copyright GETOUT SAS - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Wrote by Erwan Cariou <erwan1.cariou@epitech.eu>
*/

import 'package:area/layout/sign/load.dart';
import 'package:flutter/material.dart';
import 'package:area/model/flex_size.dart';
//import 'package:area/model/drop_down.dart';
import 'package:area/requests/get_service.dart';

class AddAreaPage extends StatefulWidget {
  const AddAreaPage({Key? key}) : super(key: key);

  @override
  State<AddAreaPage> createState() => _AddAreaPageState();
}

class _AddAreaPageState extends State<AddAreaPage> {
  bool isLoading = true;
  late List<dynamic> possibilities;
  Map<String, List<String>> actions = {};
  Map<String, List<String>> reactions = {};
  Map<String, List<String>> actionArgs = {};
  Map<String, List<String>> reactionArgs = {};
  List<String> names = [];
  String? dropdownValue1;
  String? dropdownValue2;
  String? dropdownValue3;
  String? dropdownValue4;
  String ?actionName;
  String ?reactionName;

  @override
  Widget build(BuildContext context) {
    if (isLoading) {
      gettingService(context).then((value) {
        possibilities = value;
        if (possibilities.isNotEmpty) {
          for (int i = 0; i < possibilities.length; i++) {
            names.add(possibilities[i]['name']);
            if (actions[possibilities[i]['name']] == null) {
              actions[possibilities[i]['name']] = [];
            }
            if (reactions[possibilities[i]['name']] == null) {
              reactions[possibilities[i]['name']] = [];
            }
            for (int j = 0; j < possibilities[i]['action'].length; j++) {
              actions[possibilities[i]['name']]!.add(possibilities[i]['action'][j]['name']);
              if (possibilities[i]['action'][j]['args'] != null && actionArgs[possibilities[i]['action'][j]['name']] == null) {
                actionArgs[possibilities[i]['action'][j]['name']] = [];
              }
              if (possibilities[i]['action'][j]['args'] != null) {
                for (int k = 0; k < possibilities[i]['action'][j]['args'].length; k++) {
                  actionArgs[possibilities[i]['action'][j]['name']]!.add(possibilities[i]['action'][j]['args'][k]);
                }
              }
            }
            for (int j = 0; j < possibilities[i]['reaction'].length; j++) {
              reactions[possibilities[i]['name']]!.add(possibilities[i]['reaction'][j]['name']);
              if (possibilities[i]['reaction'][j]['args'] != null && reactionArgs[possibilities[i]['reaction'][j]['name']] == null) {
                reactionArgs[possibilities[i]['reaction'][j]['name']] = [];
              }
              if (possibilities[i]['reaction'][j]['args'] != null) {
                for (int k = 0; k < possibilities[i]['reaction'][j]['args'].length; k++) {
                  reactionArgs[possibilities[i]['reaction'][j]['name']]!.add(possibilities[i]['reaction'][j]['args'][k]);
                }
              }
            }
          }
        }
        setState(() {
          isLoading = false;
        });
      });
    }
    if (!isLoading && possibilities.isEmpty) {
      return Scaffold(
        appBar: AppBar(
          title: const Text('Add an Area', style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold, color: Colors.black)),
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
        title: const Text('Add an Area', style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold, color: Colors.black)),
        backgroundColor: Colors.transparent,
        elevation: 0.0,
        centerTitle: true,
        automaticallyImplyLeading: false,
      ),
      body: Center(
          child: ListView(
              children: <Widget> [
                const SizedBox(height: 25),
                actionBox(context),
                reactionBox(context),
                const SizedBox(height: 25)
                //reactionBox(context)Service
              ])
      ),
      floatingActionButton: SizedBox(
          width: perWidth(context, 85),
          height: 65,
          child: FloatingActionButton(
              heroTag: ('CreateAreaBtn'),
              shape: const RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(50.0))),
              onPressed: () => Navigator.pushNamed(context, '/Welcome'),
              child: const Text('Create an Area',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 19,
                  ))
          )
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
    );
  }

  Widget actionBox(BuildContext context) {
    return Container(
        width: perWidth(context, 80),
        margin: const EdgeInsets.all(30.0),
        padding: const EdgeInsets.all(10.0),
        decoration: BoxDecoration(
          border: Border.all(
            width: 1,
          ),
        ),
        child: Column(
          children: <Widget> [
            const SizedBox(height: 10),
            const Text('Action', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.black)),
            const SizedBox(height: 10),
            const Text('Action Service', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: Colors.black)),
            const SizedBox(height: 10),
            myDropDown(names, 'Select a Service', 'action', '1'),
            const SizedBox(height: 10),
            const Text('Action Type', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: Colors.black)),
            const SizedBox(height: 10),
            myDropDown(actions[actionName], 'Select an Action', null, '2'),
          ],
        )
    );
  }

  Widget reactionBox(BuildContext context) {
    return Container(
        width: perWidth(context, 80),
        margin: const EdgeInsets.all(30.0),
        padding: const EdgeInsets.all(10.0),
        decoration: BoxDecoration(
          border: Border.all(
            width: 1,
          ),
        ),
        child: Column(
          children: <Widget> [
            const SizedBox(height: 10),
            const Text('Reaction', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.black)),
            const SizedBox(height: 10),
            const Text('Reaction Service', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: Colors.black)),
            const SizedBox(height: 10),
            myDropDown(names, 'Select a Service', 'reaction', '3'),
            const SizedBox(height: 10),
            const Text('Reaction Type', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: Colors.black)),
            const SizedBox(height: 10),
            myDropDown(reactions[reactionName], 'Select an Action', null, '4'),
          ],
        )
    );
  }
  Widget myDropDown(List<String>? possibilities, String hint, String? name, String ?dropdownValue) {
    String? mydropdownValue;
    if (dropdownValue == '1') {
      mydropdownValue = dropdownValue1;
    } else if (dropdownValue == '2') {
      mydropdownValue = dropdownValue2;
    } else if (dropdownValue == '3') {
      mydropdownValue = dropdownValue3;
    } else if (dropdownValue == '4') {
      mydropdownValue = dropdownValue4;
    }
    return DropdownButton<String>(
      hint: Text(hint),
      value: mydropdownValue,
      elevation: 16,
      onChanged: (String? value) {
        setState(() {
          if (dropdownValue == '1') {
            dropdownValue1 = value!;
          } else if (dropdownValue == '2') {
            dropdownValue2 = value!;
          } else if (dropdownValue == '3') {
            dropdownValue3 = value!;
          } else if (dropdownValue == '4') {
            dropdownValue4 = value!;
          }
          if (name == "action") {
            if (actionName != null) {
                dropdownValue2 = null;
            }
            actionName = value;
          } else if (name == "reaction") {
            if (reactionName != null) {
              dropdownValue4 = null;
            }
            reactionName = value;
          }
        });
      },
      items: (possibilities == null) ? null : possibilities.map<DropdownMenuItem<String>>((String value) {
        return DropdownMenuItem<String>(
          value: value,
          child: Text(value),
        );
      }).toList(),
    );
  }
}
