// This is a basic Flutter widget test.
//
// To perform an interaction with a widget in your test, use the WidgetTester
// utility in the flutter_test package. For example, you can send tap and scroll
// gestures. You can also use WidgetTester to find child widgets in the widget
// tree, read text, and verify that the values of widget properties are correct.

import 'package:area/layout/sign/login.dart';
import 'package:area/layout/sign/register.dart';
import 'package:area/main.dart';

import 'package:flutter_test/flutter_test.dart';

import 'package:flutter/material.dart';
/*import 'package:mockito/mockito.dart';

class MockNavigatorObserver extends Mock implements NavigatorObserver {}*/


void testWelcome() {
  testWidgets('good Welcome page', (WidgetTester tester) async {

    await tester.pumpWidget(const MyApp());

    expect(find.text('Sign In'), findsOneWidget);
    expect(find.text('Sign Up'), findsOneWidget);
  });
}

void testLogin() {
  testWidgets('Good login page', (WidgetTester tester) async {

    await tester.pumpWidget(
      const MaterialApp(
        home: LoginPage(),
      ),
    );
    expect(find.text('SIGN IN'), findsOneWidget);
    expect(find.text('SIGN UP'), findsNothing);
    expect(find.text('Email'), findsOneWidget);
    expect(find.text('Email address'), findsOneWidget);
    expect(find.text('Password'), findsWidgets);
    expect(find.text('Login'), findsOneWidget);
  });
}

void testRegister() {
  testWidgets('Good register page', (WidgetTester tester) async {

    await tester.pumpWidget(
      const MaterialApp(
        home: RegisterPage(),
      ),
    );
    expect(find.text('SIGN UP'), findsOneWidget);
    expect(find.text('SIGN IN'), findsNothing);
    expect(find.text('Email'), findsOneWidget);
    expect(find.text('Email address'), findsOneWidget);
    expect(find.text('Password'), findsWidgets);
    expect(find.text('Register'), findsOneWidget);
  });
}


void main() {
  testWelcome();
  testLogin();
  testRegister();
}

/*
void main() {
  final mockObserver = MockNavigatorObserver();
  testWidgets('No service for AddPage', (WidgetTester tester) async {
    */
/*await tester.pumpWidget(
      MaterialApp(
        home: const MyApp(),
        navigatorObservers: [mockObserver],
      ),
    );*//*


    // Build our app and trigger a frame.
    await tester.pumpWidget(const MyApp());

    expect(find.text('Sign In'), findsOneWidget);
    expect(find.text('Sign Up'), findsOneWidget);
    // Go to the dashboard
    //verify(mockObserver.didPush(any, any));

    // Tap the '+' icon and trigger a frame.
    */
/*await tester.tap(find.byIcon(Icons.add));
    await tester.pump();*//*


    // Verify that our counter has incremented.
    */
/*expect(find.text('0'), findsNothing);
    expect(find.text('1'), findsOneWidget);*//*

  });
}
*/
