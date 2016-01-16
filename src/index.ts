'use strict';
/// <reference path="typings/tsd.d.ts"/>

import * as util from 'util';

import { EDFData, EDFHeader, EDFSignal } from './model/machines/resmed/edf';
import { Machine } from './model/machine';
import { Channel, ChannelType } from './model/channel';
import { Session } from './model/session';

import Parser from './model/machines/resmed/parser';

let parser: Parser = new Parser('data/resmed/airsense10/DATALOG/20151225/20151225_212227_PLD.edf');
parser.parse().subscribe((data: any) => {
	console.log(util.inspect(data));

	console.log(data.dataRecords[0][0][0]);

}, (error: any) => {
	console.error(error);
});
