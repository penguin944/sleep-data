'use strict';
/// <reference path="../../../typings/tsd.d.ts" />

import { EDFData, EDFHeader, EDFSignal } from './edf';
import typeSet from './template';

var jBinary = require('../../../lib/jbinary/jbinary');
var moment = require('moment');

import { Observable, Subject } from 'rxjs';
import * as fs from 'fs';

export class Parser {
	constructor(private fileName: string) { }

	public parse(): Observable<EDFData> {
		let stream: NodeJS.ReadableStream = fs.createReadStream(this.fileName);

		let result: Subject<EDFData> = new Subject<EDFData>();
		jBinary.load(stream, typeSet, (error: string, jb: jBinary) => {
			if (error) {
				result.error(error);
			}

			let edfdata: any = jb.readAll();

			result.next(edfdata);
		});

		return result;
	}
}

export default Parser;
