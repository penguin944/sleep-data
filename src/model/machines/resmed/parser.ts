'use strict';
/// <reference path="../../../typings/tsd.d.ts" />

import { EDFData, EDFHeader, EDFSignal } from './edf';
import { Session } from '../../session';

import { Observable } from 'rxjs';
import * as fs from 'fs';

export class Parser {
	private fileBuffer: Buffer;

	constructor(private fileName: string) { }

	public parse(): Observable<Promise> {
		let file = fs.createReadStream(this.fileName).on('error', console.log.bind(console, 'fs err'));

		let o = Observable.of(file);

		return o.map((data: Buffer): any => {
			let session = new Session(0);

			let header = this.parseHeader(data);
		});
	}

	private parseHeader(fileBuffer: Buffer): EDFHeader {
		let header = new EDFHeader();

		header.formatVersion = fileBuffer.toString('binary', 0, 8);
		header.startDate = fileBuffer.toString('binary', 168, 16);

		return header;
	}
}

export default Parser;
