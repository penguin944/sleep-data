'use strict';
/// <reference path="typings/tsd.d.ts"/>

import * as util from 'util';

import { EDFData, EDFHeader, EDFSignal } from './model/machines/resmed/edf';
import { Machine } from './model/machine';
import { Channel, ChannelType } from './model/channel';
import { Session } from './model/session';

import Parser from './model/machines/resmed/parser';

let parser: Parser = new Parser('src/model/machines/resmed/STR.edf');
parser.parse().subscribe((data: EDFData) => {
	console.log(util.inspect(data));

}, (error: any) => {
	console.error(error);
});
