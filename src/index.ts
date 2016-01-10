'use strict';
/// <reference path="typings/tsd.d.ts"/>

import { Machine } from './model/machine';
import { Channel, ChannelType } from './model/channel';
import { Session } from './model/session';

import Parser from './model/machines/resmed/parser';

let parser: Parser = new Parser('./data/resmed/airsense10/STR.edf');
let header = parser.parse();

console.log(JSON.stringify(header));
