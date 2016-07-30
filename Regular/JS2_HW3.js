"use strict";

//1.

var t800 = /#+[\dA-Fa-f]+[\dA-Fa-f]/g;

var johnC = '#123456 and some other stuff like #679A3f, yahoo!';

alert (johnC.match(t800));