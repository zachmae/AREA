/*
** Copyright GETOUT SAS - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Wrote by Erwan Cariou <erwan1.cariou@epitech.eu>
*/

import 'dart:convert';
import 'package:area/constants/api_path.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

Future<String> sendNewArea({required String? actionService, required String? actionAction, required String? reactionService, required String? reactionAction, required Map<String, String>? actionArgs, required Map<String, String>? reactionArgs}) async
{
  var url = Uri.http(apiPath, signInPath);
  String? actionArgsString = actionArgs?.entries.map((entry) {
    return '"${entry.key}":"${entry.value}"';
  }).join(',') ?? '';
  String? reactionArgsString = reactionArgs?.entries.map((entry) {
    return '"${entry.key}":"${entry.value}"';
  }).join(',') ?? '';

  actionArgsString = '{$actionArgsString}';
  reactionArgsString = '{$reactionArgsString}';

  var body = jsonEncode({
    "service_act": actionService,
    "action": actionAction,
    "action_args" : actionArgsString,
    "service_rea" : reactionService,
    "reaction" : reactionAction,
    "reaction_args" : reactionArgsString,
  });

  try {
    var response = await http.post(url, body: body, headers: {
      "Content-Type": "application/json"
    });
    var data = jsonDecode(response.body);

    if (data['message'] == 'It\'s been a long time  !') {
      return 'OK';
    } else {
      return data['message'];
    }
  } catch (error) {
    if (error.toString() == 'Connection reset by peer' || error.toString() == 'Connection closed before full header was received') {
      return 'No internet connection';
    }
    return error.toString();
  }
}
