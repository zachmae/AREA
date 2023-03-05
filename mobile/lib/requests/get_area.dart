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
import 'package:area/constants/token.dart';

Future<List<dynamic>> getArea(BuildContext context) async
{
  var url = Uri.https(apiPath, getAreaPath);
  var body = jsonEncode({
    "token" : myToken,
  });

  try {
    var response = await http.post(url, body: body, headers: {
      'Content-Type': 'application/json'
    });
    var data = jsonDecode(response.body);
    if (data['status']) {
      return data['areas'];
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

Future<String> switchArea(BuildContext context, int id, bool whatSwitch) async
{
  var url = Uri.https(apiPath, (whatSwitch ? deactivateAreaPath : activateAreaPath));
  var body = jsonEncode({
    "token" : myToken,
    "area_id" : id,
  });

  try {
    var response = await http.post(url, body: body, headers: {
      'Content-Type': 'application/json'
    });
    var data = jsonDecode(response.body);
    if (data['status']) {
      return 'OK';
    } else {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Error Server')));
      return "Error Server";
    }
  } catch (error) {
    if (error.toString() == 'Connection reset by peer' || error.toString() == 'Connection closed before full header was received') {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('No internet connection')));
      return "No internet connection";
    }
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(error.toString())));
    return "error";
  }
}

Future<String> deleteArea(BuildContext context, int id) async
{
  var url = Uri.https(apiPath, deleteAreaPath);
  var body = jsonEncode({
    "token" : myToken,
    "area_id" : id,
  });

  try {
    var response = await http.post(url, body: body, headers: {
      'Content-Type': 'application/json'
    });
    var data = jsonDecode(response.body);
    if (data['status']) {
      return 'OK';
    } else {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Error Server')));
      return "Error Server";
    }
  } catch (error) {
    if (error.toString() == 'Connection reset by peer' || error.toString() == 'Connection closed before full header was received') {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('No internet connection')));
      return "No internet connection";
    }
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(error.toString())));
    return "error";
  }
}