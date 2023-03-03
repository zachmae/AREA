/*
** Copyright GETOUT SAS - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Wrote by Erwan Cariou <erwan1.cariou@epitech.eu>
*/

import 'dart:convert';

import 'package:flutter/cupertino.dart';
//import 'package:oauth2/oauth2.dart' as oauth2;
import 'package:url_launcher/url_launcher.dart' as url_launcher;
/*import 'package:simple_auth/simple_auth.dart' as simple_auth;
import 'package:simple_auth_flutter/simple_auth_flutter.dart';*/
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
  final Uri url = Uri.parse("https://github.com/login/oauth/authorize?client_id=$clientId&scope=public_repo%20read:user%20user:email");

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
  }
}

/*Future<String?> githubLogin(BuildContext context) async
{
  final authorizationEndpoint = Uri.parse('https://github.com/login/oauth/authorize');
  final tokenEndpoint = Uri.parse('https://github.com/login/oauth/access_token');
  const String clientId = 'e1089fb7213348cd930a';
  const String clientSecret = '43de47d6240a2551170219b300aa7f74fc626021';
  const List<String> scopes = <String>[
    'repo'
  ];
  *//*SimpleAuthFlutter.init(context);

  var client = await simple_auth.GithubApi(
    'github',
    clientId,
    clientSecret,
    'redirect:/',
    scopes: scopes,
  ).authenticate();
  var info = await client?.get('https://api.github.com/user');*//*
var client = await oauth2.clientCredentialsGrant(
      authorizationEndpoint, clientId, clientSecret);
*//*  var grant = oauth2.clientCredentialsGrant(
    authorizationEndpoint,
    clientId,
    clientSecret,
    scopes: scopes,
  );*//*

  print(client.credentials.accessToken);
  return "a";
}*/

/*
Future<String?> githubLogin(BuildContext context) async
{
  final GitHubSignIn gitHubSignIn = GitHubSignIn(
    clientId: 'e1089fb7213348cd930a',
    clientSecret: '43de47d6240a2551170219b300aa7f74fc626021',
    redirectUrl: 'https://github.com/Epi-Area/Area',
    title: 'GitHub Connection',
    centerTitle: false,
  );
  var result = await gitHubSignIn.signIn(context);
  switch (result.status) {
    case GitHubSignInResultStatus.ok:
      print(result.token);
      return result.token;

    case GitHubSignInResultStatus.cancelled:
    case GitHubSignInResultStatus.failed:
      print(result.errorMessage);
      return "error";
  }
}
*/
