/*
** Copyright GETOUT SAS - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Wrote by Erwan Cariou <erwan1.cariou@epitech.eu>
*/

import 'package:flutter/material.dart';
import 'package:form_field_validator/form_field_validator.dart';

class PasswordField extends StatelessWidget {
  final TextEditingController controller;
  final formKey;

  const PasswordField({super.key, required this.formKey, required this.controller});

  String ?validatePassword(String value) {
    if (value.isEmpty) {
      return "A password is required";
    } else if (value.length < 8) {
      return "Password should be at least 8 characters";
    } else {
      return null;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Form(
    key: formKey,
        child : Column(children: [
          TextFormField(
          controller: controller,
          obscureText: true,
          decoration: InputDecoration(
            hintText: 'Enter your password',
            labelText: 'Password',
            enabledBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(10),
                borderSide: const BorderSide(color: Colors.black)
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10),
              borderSide: const BorderSide(color: Colors.blue)
            )
          ),
          validator: (value) {
            if (value == null) {
              return 'A password is required';
            }
            return validatePassword(value);
          }
          ),
        ],
      ));
    }
}

class SecondPasswordField extends StatelessWidget {
  final TextEditingController controller;
  final formKey;
  final String fstPassword;

  const SecondPasswordField({super.key, required this.formKey, required this.controller, required this.fstPassword});

  String ?validatePassword(String value) {
    if (value.isEmpty) {
      return "A password is required";
    } else if (value.length < 8) {
      return "Password should be at least 8 characters";
    } else if (value != fstPassword) {
      return "Passwords don't match";
    } else {
      return null;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Form(
        key: formKey,
        child : Column(children: [
          TextFormField(
              controller: controller,
              obscureText: true,
              decoration: InputDecoration(
                  hintText: 'Enter your password',
                  labelText: 'Password',
                  enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10),
                      borderSide: const BorderSide(color: Colors.black)
                  ),
                  focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10),
                      borderSide: const BorderSide(color: Colors.blue)
                  )
              ),
              validator: (value) {
                if (value == null) {
                  return 'A password is required';
                }
                return validatePassword(value);
              }
          ),
        ],
        ));
  }
}

class MailField extends StatelessWidget {
  final TextEditingController controller;
  final formKey;

  const MailField({super.key, required this.formKey, required this.controller});

  @override
  Widget build(BuildContext context) {
    return Form(
        key: formKey,
        child : Column(children: [
          TextFormField(
            controller: controller,
            obscureText: false,
            decoration: InputDecoration(
                hintText: 'Enter your email',
                labelText: 'Email',
                enabledBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(10),
                    borderSide: const BorderSide(color: Colors.black)
                ),
                focusedBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(10),
                    borderSide: const BorderSide(color: Colors.blue)
                )
            ),
            validator: MultiValidator([
              RequiredValidator(errorText: "An email is required"),
              EmailValidator(errorText: "Enter a valid email address")
            ])
          ),
        ],
        ));
  }
}

class Field extends StatelessWidget {
  final TextEditingController controller;

  const Field({super.key, required this.controller});

  String? validatePassword(String value) {
    if (value.isEmpty) {
      return "* Required";
    } else if (value.length < 6) {
      return "Password should be atleast 6 characters";
    } else if (value.length > 15) {
      return "Password should not be greater than 15 characters";
    } else {
      return null;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      TextFormField(
      autovalidateMode: AutovalidateMode.always,
        decoration: InputDecoration(
            border: const OutlineInputBorder(),
            labelText: 'Password',
            hintText: 'Enter secure password',
            enabledBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(10),
                borderSide: const BorderSide(color: Colors.black)
            ),
            focusedBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(10),
                borderSide: const BorderSide(color: Colors.blue)
            )
        ),
        validator: MultiValidator([
          RequiredValidator(errorText: "* Required"),
          MinLengthValidator(8, errorText: "Password should be at least 8 characters"),
          MaxLengthValidator(15, errorText: "Password should not be greater than 15 characters")
        ])
      ),
    ]);
  }
}

//validator: EmailValidator(errorText: "Enter valid email id"),