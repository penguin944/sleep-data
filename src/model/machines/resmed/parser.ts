'use strict';
/// <reference path="../../../typings/tsd.d.ts" />

import * as fs from 'fs';
import * as jbinary from 'jbinary';

import { EDFHeader } from './edf';

export class Parser{

	constructor(fileName: string){
	}

	parseHeader(): EDFHeader{
		let header = new EDFHeader();

		return header;
	}
}