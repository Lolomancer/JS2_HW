"use strict";

//1.

var t800 = /#+[\dA-F]+[\dA-F]/ig;

var sarahC = '#123456 and some other stuff like #679A3f, yahoo!';

alert (sarahC.match(t800));

//2.

var t1000 = /\d+(\.\d)?/g;

var johnC = '0 1 2 3.4 7.9 69 hastalavista 91';

alert (johnC.match(t1000));