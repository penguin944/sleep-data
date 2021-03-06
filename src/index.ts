'use strict';
/// <reference path="typings/tsd.d.ts"/>

import * as util from 'util';

import { Machine } from './model/machine';
import { SignalId, Signal } from './model/signal';
import { Session } from './model/session';

import { Parser, EDFData, EDFHeader, EDFSignal } from './edf/parser';

Parser.parse('data/resmed/airsense10/DATALOG/20151225/20151225_212227_PLD.edf')
.subscribe((data: EDFData) => {
	console.log(data);

}, (error: any) => {
	console.error(error);
});
