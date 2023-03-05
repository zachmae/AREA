/*
** Copyright GETOUT SAS - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Wrote by Erwan Cariou <erwan1.cariou@epitech.eu>
*/

import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:area/constants/api_path.dart';
import 'package:flutter/material.dart';

Future<List<dynamic>> gettingService(BuildContext context) async
{
  var url = Uri.https(apiPath, getServicesPath);

  try {
    var response = await http.get(url, headers: {
      'Content-Type': 'application/json'
    });
    var data = jsonDecode(response.body); /// RETURN Map<String, dynamic>
    if (response.statusCode == 200) {
      return data['server']['services'];
    } else {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Error Server')));
      return List.empty();
    }
  } catch (error) {
    if (error.toString() == 'Connection reset by peer' || error.toString() == 'Connection closed before full header was received') {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('No internet connection')));
      return List.empty();
    }
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(error.toString())));
    return List.empty();
  }
}