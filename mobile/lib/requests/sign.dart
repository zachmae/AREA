/*
** Copyright GETOUT SAS - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Wrote by Erwan Cariou <erwan1.cariou@epitech.eu>
*/

import 'dart:convert';
import 'dart:ui';
import 'package:http/http.dart' as http;
import 'package:area/constants/api_path.dart';


Future login({required VoidCallback onPressed, required String email, required String password}) async
{
  var url = Uri.http(apiPath, signInPath);
  var body = jsonEncode({
    "username" : email,
    "password" : password
  });

  var response = await http.post(url, body: body, headers: {
    "Content-Type": "application/json"
  });
  var data = jsonDecode(response.body);

  if (data['message'] == 'It\'s been a long time  !') {
    onPressed();
  }
}

Future register({required VoidCallback onPressed, required String email, required String password}) async
{
  var url = Uri.http(apiPath, signUpPath);
  var body = jsonEncode({
    "username" : email,
    "password" : password
  });
  var response = await http.post(url, body: body, headers: {
    "Content-Type": "application/json"
  });
  var data = jsonDecode(response.body);

  if (data['message'] == 'We are glad you\'re here ') {
    onPressed();
  }
}
