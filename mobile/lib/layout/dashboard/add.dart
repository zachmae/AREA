/*
** Copyright GETOUT SAS - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Wrote by Erwan Cariou <erwan1.cariou@epitech.eu>
*/


import 'package:area/layout/load.dart';
import 'package:flutter/material.dart';
import 'package:area/model/flex_size.dart';
import 'package:area/model/field.dart';
import 'package:area/requests/get_service.dart';
import 'package:area/requests/send_new_area.dart';

class AddAreaPage extends StatefulWidget {
  const AddAreaPage({Key? key}) : super(key: key);

  @override
  State<AddAreaPage> createState() => _AddAreaPageState();
}

class _AddAreaPageState extends State<AddAreaPage> {
  bool isLoading = true;
  bool first = true;
  late List<dynamic> possibilities;
  Map<String, List<String>> actions = {};
  Map<String, List<String>> reactions = {};
  Map<String, Map<String, TextEditingController>> actionArgs = {};
  Map<String, Map<String, TextEditingController>> reactionArgs = {};
  List<String> names = [];
  TextEditingController nameController = TextEditingController();
  String? dropdownValue1;
  String? dropdownValue2;
  String? dropdownValue3;
  String? dropdownValue4;
  String ?actionName;
  String ?reactionName;

  Future<String?> sendArea() async {
    Map<String, String>? actionParams = actionArgs[dropdownValue2]?.map((key, value) {
      return MapEntry(key, value.text);
    });
    Map<String, String>? reactionParams = reactionArgs[dropdownValue4]?.map((key, value) {
      return MapEntry(key, value.text);
    });
    if (dropdownValue1 == null || dropdownValue2 == null || dropdownValue3 == null || dropdownValue4 == null) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Please fill all the fields')));
      return null;
    }
    setState(() {
      isLoading = true;
    });
    String res = await sendNewArea(actionService: dropdownValue1, actionAction: dropdownValue2,reactionService: dropdownValue3, reactionAction: dropdownValue4, actionArgs: actionParams, reactionArgs: reactionParams);
    setState(() {
      isLoading = false;
    });
    if (res == 'OK') {
      Navigator.pushNamed(context, '/Dashboard');
    } else {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(res)));
    }
    return null;
  }

  @override
  Widget build(BuildContext context) {
    if (isLoading && first) {
      actionArgs.clear();
      reactionArgs.clear();
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
            for (int j = 0; possibilities[i]['action'] != null && j < possibilities[i]['action'].length; j++) {
              actions[possibilities[i]['name']]!.add(possibilities[i]['action'][j]['name']);
              if (possibilities[i]['action'][j]['args'] != null && actionArgs[possibilities[i]['action'][j]['name']] == null) {
                actionArgs[possibilities[i]['action'][j]['name']] = {};
              }
              if (possibilities[i]['action'][j]['args'] != null) {
                for (int k = 0; k < possibilities[i]['action'][j]['args'].length; k++) {
                  actionArgs[possibilities[i]['action'][j]['name']]![possibilities[i]['action'][j]['args'][k]] = TextEditingController();
                }
              }
            }
            for (int j = 0; possibilities[i]['reaction'] != null && j < possibilities[i]['reaction'].length; j++) {
              reactions[possibilities[i]['name']]!.add(possibilities[i]['reaction'][j]['name']);
              if (possibilities[i]['reaction'][j]['args'] != null && reactionArgs[possibilities[i]['reaction'][j]['name']] == null) {
                reactionArgs[possibilities[i]['reaction'][j]['name']] = {};
              }
              if (possibilities[i]['reaction'][j]['args'] != null) {
                for (int k = 0; k < possibilities[i]['reaction'][j]['args'].length; k++) {
                  reactionArgs[possibilities[i]['reaction'][j]['name']]![possibilities[i]['reaction'][j]['args'][k]] = TextEditingController();
                }
              }
            }
          }
        }
        setState(() {
          isLoading = false;
          first = false;
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
              backgroundColor: const Color.fromRGBO(9, 132, 227, 1),
              heroTag: ('CreateAreaBtn'),
              shape: const RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(50.0))),
              onPressed: sendArea,
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
            for (int i = 0; dropdownValue2 != null && actionArgs[dropdownValue2] != null &&  i < actionArgs[dropdownValue2]!.length; i++)
              Padding(padding: const EdgeInsets.all(20.0), child: MyField(controller: actionArgs[dropdownValue2]!.values.elementAt(i), name: actionArgs[dropdownValue2]!.keys.elementAt(i)))
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
            for (int i = 0; dropdownValue4 != null && reactionArgs[dropdownValue4] != null &&  i < reactionArgs[dropdownValue4]!.length; i++)
              Padding(padding: const EdgeInsets.all(20.0), child: MyField(controller: reactionArgs[dropdownValue4]!.values.elementAt(i), name: reactionArgs[dropdownValue4]!.keys.elementAt(i)))
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

/*var json = jsonDecode({
  "client": {
    "host": "192.168.1.25"
  },
  "server": {
    "current_time": 1675445773554,
    "webhookurl": "http://142a-eza1-142a-eza1-ngrok.io",
    "services": [
      {
        "name" : "console",
        "action" : [
          {
            "name" : "true",
            "description" : "This action always returns true.",
            "args" : []
          },
          {
            "name" : "false",
            "description" : "This action always returns false.",
            "args" : []
          }
        ],
        "reaction" : [
          {
            "name" : "log",

            "args" : [
              "message"
            ]
          }
        ]
      },
      {
        "name" : "meteo",
        "action" : [
          {
            "name" : "rain?",
            "description" : "This action returns true if water is falling from the sky in the specified city.",
            "args" : [
              "location"
            ]
          },
          {
            "name" : "sunny?",
            "description" : "This action return true if its sunny in the specified city.",
            "args" : [
              "location"
            ]
          },
          {
            "name" : "cold?",
            "description" : "This action returns true if its cold (< 0°C) in the specified city.",
            "args" : [
              "location"
            ]
          },
          {
            "name" : "warm?",
            "description" : "This action returns true if its hot (> 30°C) in the specified city.",
            "args" : [
              "location"
            ]
          },
          {
            "name" : "night?",
            "description" : "This action returns true if its night in the specified city.",
            "args" : [
              "location"
            ]
          }
        ]
      },
      {
        "name" : "time",
        "action" : [
          {
            "name" : "time",
            "description" : "Check if the current time correspond to the given format",
            "args" : [
              "timezone",
              "day_of_week",
              "hour",
              "minute"
            ]
          }
        ]
      },
      {
        "name" : "mail",
        "reaction" : [
          {
            "name" : "send",
            "description" : "Send an email to the specified address",
            "args" : [
              "to",
              "subject",
              "message"
            ]
          }
        ]
      },
      {
        "name" : "coinflip",
          "action" : [
        {
          "name": "coinflip?",
          "description": "This action returns true if the result is has predicted",
          "args": [
            "isHeads"
          ]
        }
        ]
      },
      {
        "name" : "steam",
        "action" : [
          {
            "name" : "discounted?",
            "description" : "Check if the specified game is discounted",
            "args" : [
              "appid",
              "discount"
            ]
          },
          {
            "name" : "free?",
            "description" : "Check if the specified game is free",
            "args" : [
              "appid"
            ]
          },
          {
            "name" : "out?",
            "description" : "Check if the specified game is out",
            "args" : [
              "appid"
            ]
          },
          {
            "name" : "useronline?",
            "description" : "Check if the user is online",
            "args" : [
              "steamid"
            ]
          },
          {
            "name" : "useroffline?",
            "description" : "Check if the user is offline",
            "args" : [
              "steamid"
            ]
          }
        ]
      },
      {
        "name" : "telegraph",
        "reaction" : [
          {
            "name" : "create_page",
            "description" : "Create a new page on telegraph",
            "args" : [
              "author_name",
              "author_url",
              "content",
              "title",
              "to"
            ]
          }
        ]
      },
      {
        "name" : "aws",
        "reaction": [
          {
            "name" : "send_sns_sms",
            "description" : "Send a SMS using AWS SNS",
            "args" : [
              "phone_number",
              "message"
            ]
          }
        ]
      }
    ]
  }
});*/