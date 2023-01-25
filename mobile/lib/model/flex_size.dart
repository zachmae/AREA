/*
** Copyright GETOUT SAS - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Wrote by Erwan Cariou <erwan1.cariou@epitech.eu>
*/

import 'package:flutter/material.dart';

double perHeight(BuildContext context, int percentage)
{
  return percentage * MediaQuery.of(context).size.height / 100;
}

double perWidth(BuildContext context, int percentage)
{
  return percentage * MediaQuery.of(context).size.width / 100;
}