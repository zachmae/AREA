/*
** Copyright GETOUT SAS - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Wrote by Erwan Cariou <erwan1.cariou@epitech.eu>
*/

import 'package:flutter/material.dart';

class DropDown extends StatefulWidget {
  final List<String>? possibilities;
  final String hint;
  String? name;
  DropDown({super.key, required this.possibilities, required this.hint, required this.name});

  @override
  State<DropDown> createState() => _DropDownState();
}

class _DropDownState extends State<DropDown> {
  String? dropdownValue;
  @override
  Widget build(BuildContext context) {
    return DropdownButton<String>(
      hint: Text(widget.hint),
      value: dropdownValue,
      elevation: 16,
      onChanged: (String? value) {
        setState(() {
          dropdownValue = value!;
          widget.name = value;
        });
      },
      items: (widget.possibilities == null) ? null : widget.possibilities?.map<DropdownMenuItem<String>>((String value) {
        return DropdownMenuItem<String>(
          value: value,
          child: Text(value),
        );
      }).toList(),
    );
  }
}

