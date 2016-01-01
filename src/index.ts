'use strict';
/// <reference path="typings/tsd.d.ts"/>

import Parser from "./model/machines/resmed/parser";

let parser: Parser = new Parser("data/resmed/airsense10/STR.edf");
let header = parser.parseHeader();

console.log(JSON.stringify(header));
