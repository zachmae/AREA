/*
** Copyright GETOUT SAS - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Wrote by Erwan Cariou <erwan1.cariou@epitech.eu>
*/

import 'package:area/layout/sign/load.dart';
import 'package:flutter/material.dart';
import 'package:area/model/flex_size.dart';
import 'package:area/model/drop_down.dart';
import 'package:area/requests/get_service.dart';

class AddAreaPage extends StatefulWidget {
  const AddAreaPage({Key? key}) : super(key: key);

  @override
  State<AddAreaPage> createState() => _AddAreaPageState();
}

class _AddAreaPageState extends State<AddAreaPage> {
  bool isLoading = true;
  late String possibilities;

  @override
  Widget build(BuildContext context) {
    if (isLoading) {
      gettingService(context).then((value) {
        possibilities = value;
        setState(() {
          isLoading = false;
        });
      });
    }
    if (!isLoading && possibilities == 'KO') {
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
          children: const <Widget> [
            SizedBox(height: 10),
            Text('Action', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.black)),
            SizedBox(height: 10),
            Text('Action Service', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: Colors.black)),
            SizedBox(height: 10),
            DropDown(possibilities: <String> ['1', 'Two', 'Three', 'Four'], hint: 'Select a Service',),
            SizedBox(height: 10),
            Text('Action Type', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: Colors.black)),
            SizedBox(height: 10),
            DropDown(possibilities: <String> ['1', 'Two', 'Three', 'Four'], hint: 'Select an Action',),
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
          children: const <Widget> [
            SizedBox(height: 10),
            Text('Reaction', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.black)),
            SizedBox(height: 10),
            Text('Reaction Service', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: Colors.black)),
            SizedBox(height: 10),
            DropDown(possibilities: <String> ['1', 'Two', 'Three', 'Four'], hint: 'Select a Service',),
            SizedBox(height: 10),
            Text('Reaction Type', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: Colors.black)),
            SizedBox(height: 10),
            DropDown(possibilities: <String> ['1', 'Two', 'Three', 'Four'], hint: 'Select an Action',),
          ],
        )
    );
  }
}
