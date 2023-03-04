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

var receive = jsonEncode({
  "client": {
    "host": "192.168.1.25"
  },
  "server": {
    "current_time": 1675445773554,
    "webhookurl": "http://142a-eza1-142a-eza1-ngrok.io",
    "services": [
      {
        "name": "github",
        "action": [
          {
            "name": "github-repository-publicise",
            "type": "hook",
            "description": "This event occurs when repository visibility changes from private to public.",
            "args": [
              "owner",
              "repo"
            ]
          },
          {
            "name": "github-repository-created",
            "type": "hook",
            "description": "This event occurs when a new repository is created.",
            "args": [
              "owner",
              "repo"
            ]
          },
          {
            "name": "github-repository-deleted",
            "type": "hook",
            "description": "This event occurs when a new repository is deleted.",
            "args": []
          },
        ],
        "reaction": [
        {
          "name": "github-send-email",
          "description": "This action sends an email to the specified email address.",
          "args": [
            "email"
          ]
        }
      ]
      },
      {
        "name": "discord",
        "action": [
          {
            "name": "discord-watch",
            "type": "hook",
            "description": "This event occurs when there is activity relating to watching, or subscribing to, a repository",
            "args": [
              "owner",
              "repo"
            ]
          }
        ], "reaction": [
        {
          "name": "discord-send-email",
          "description": "This action sends an email to the specified email address.",
          "args": [
            "email"
          ]
        }
      ]
      }
    ]
  }
});

Future<List<dynamic>> gettingService(BuildContext context) async
{
  var url = Uri.http(apiPath, getServicesPath);
  var body = jsonEncode({
    'Perry' : 'Perry'
  });

  try {
    /*var response = await http.post(url, body: body, headers: {
      'Content-Type': 'application/json'
    });*/
    //var data = jsonDecode(response.body); /// RETURN Map<String, dynamic>
    var data = jsonDecode(receive); /// RETURN Map<String, dynamic>
    if (true) {//response.statusCode == 200) {
      return data['server']['services'];
    } else {
      return data['server'];
    }
  } catch (error) {
    if (error.toString() == 'Connection reset by peer' || error.toString() == 'Connection closed before full header was received') {
      print(error.toString());
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('No internet connection')));
      return List.empty();
    }
    print(error.toString());
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(error.toString())));
    return List.empty();
  }
}