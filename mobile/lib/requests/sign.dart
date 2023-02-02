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
import 'package:area/layout/google_token.dart';
import 'package:area/constants/token.dart';

Future login({required VoidCallback onPressed, required String email, required String password}) async
{
  //return onPressed();
  var url = Uri.http(apiPath, signInPath);
  var body = jsonEncode({
    "username" : email,
    "password" : password
  });

  try {
    var response = await http.post(url, body: body, headers: {
      "Content-Type": "application/json"
    });
    var data = jsonDecode(response.body);

    if (data['message'] == 'It\'s been a long time  !') {
      return onPressed();
    } else {
      const Text('Wrong email or password');
    }
  } catch (error) {
    print(error);
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

Future sendToken({required VoidCallback onPressed, required String token}) async
{
  var url = Uri.http(apiPath, tokenPath);
  var body = jsonEncode({
    "token" : token,
  });
  var response = await http.post(url, body: body, headers: {
    "Content-Type": "application/json"
  });
  var data = jsonDecode(response.body);

  if (data['message'] == 'good token') {
    onPressed();
  }
}

Future googleSignIn(BuildContext context) async
{
  /*final user = await GoogleClass.login();
  final ggAuth = await user?.authentication;*/
  /*try {
    final result = await GoogleClass.login();
    final ggAuth = await result?.authentication;
    print(ggAuth?.idToken);
    print(ggAuth?.accessToken);
  } catch (error) {
    print(error);
  }*/
  await GoogleClass.login().then((result) {
    result?.authentication.then((googleKey) {
      googleToken = googleKey.accessToken;
    print('accesToken = ${googleKey.accessToken}');
  }).catchError((error) {
    print('token error :  $error');
    });
  }).catchError((error) {
    print('login error : $error');
  });
  print('token = $googleToken');
  /*if (user == null) {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Google Sign In Failed'),
      ),
    );
  } else {
    print('idToken = ${ggAuth?.idToken}');
    print('accesToken = ${ggAuth?.accessToken}');
    Navigator.of(context).pushReplacement(MaterialPageRoute(builder: (context) => const WelcomePage()));
  }*/
}