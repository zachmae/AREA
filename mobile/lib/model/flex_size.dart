/*
** Copyright GETOUT SAS - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Wrote by Erwan Cariou <erwan1.cariou@epitech.eu>
*/

import 'package:flutter/material.dart';

double perHeight(BuildContext context, int percentage)
{
  final double value = percentage * MediaQuery.of(context).size.height / 100;
  return value;
}

double perWidth(BuildContext context, int percentage)
{
  return percentage * MediaQuery.of(context).size.width / 100;
}