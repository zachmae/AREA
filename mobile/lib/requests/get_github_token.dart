/*
** Copyright GETOUT SAS - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Wrote by Erwan Cariou <erwan1.cariou@epitech.eu>
*/

import 'dart:convert';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
//import 'package:oauth2/oauth2.dart' as oauth2;
import 'package:url_launcher/url_launcher.dart' as url_launcher;
import 'package:http/http.dart' as http;
import 'package:uni_links/uni_links.dart' as uni_links;

Future<String?> githubLogin(BuildContext context) async
{
  final authorizationEndpoint = Uri.parse('https://github.com/login/oauth/authorize');
  final tokenEndpoint = Uri.parse('https://github.com/login/oauth/access_token');
  const String clientId = 'e1089fb7213348cd930a';
  const String clientSecret = '43de47d6240a2551170219b300aa7f74fc626021';
  const List<String> scopes = <String>[
    'repo'
  ];
  final Uri url = Uri.parse("https://github.com/login/oauth/authorize?client_id=$clientId&redirect_uri=area://githuboauth&scope=public_repo%20read:user%20user:email");
  //final Uri url = Uri.parse("https://area?code=1");

  if (await url_launcher.canLaunchUrl(url)) {
    await url_launcher.launchUrl(url);

    uni_links.linkStream.listen((link) {
      String? code = link?.substring(link.indexOf(RegExp('code=')) + 5);
      print(code);
      final response = http.post(
        tokenEndpoint,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: jsonEncode({
          'clientId': clientId,
          'clientSecret': clientSecret,
          'code': code,
          'redirectUri': 'area://github-oauth',
        }),
      );
      print(response);
    }, cancelOnError: true);
  } else {
    print('Could not launch $url');
  }
  return "a";
}

/*Future<String> githubLogin(BuildContext context) async
{
  final tokenEndpoint = Uri.parse('https://github.com/login/oauth/access_token');
  const String clientId = 'e1089fb7213348cd930a';
  final authorizationEndpoint = Uri.parse('https://github.com/login/oauth/authorize?client_id=$clientId&redirect_uri=area://githuboauth&scope=public_repo%20read:user%20user:email');
  const String clientSecret = '43de47d6240a2551170219b300aa7f74fc626021';
  const List<String> scopes = <String>[
    'repo'
  ];

  return "a";
}*/
