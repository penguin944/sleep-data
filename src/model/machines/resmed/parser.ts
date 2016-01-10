'use strict';
/// <reference path="../../../typings/tsd.d.ts" />

import { EDFData, EDFHeader, EDFSignal } from './edf';
import typeSet from './template';

var jBinary = require('jbinary');

import { Observable, Subject } from 'rxjs';
import * as fs from 'fs';

export class Parser {
	private fileBuffer: Buffer;

	constructor(private fileName: string) { }

	public parse(): Observable<EDFData> {
		let stream: NodeJS.ReadableStream = fs.createReadStream(this.fileName);

		return Observable.fromPromise(
			jBinary.load(stream, typeSet, (error: string, data: EDFData) => {
				console.log(JSON.stringify(data));

				return data;
			})
		);
	}
}

export default Parser;
