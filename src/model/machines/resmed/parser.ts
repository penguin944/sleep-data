'use strict';
/// <reference path="../../../typings/tsd.d.ts" />

import { EDFData, EDFHeader, EDFSignal } from './edf';
import { Session } from '../../session';
import RxFs from '../../../rx/rxify-fs';

import { Observable } from 'rxjs';
import * as fs from 'fs';

export class Parser {
	private fileBuffer: Buffer;

	constructor(private fileName: string) { }

	public parse(): Observable<EDFData> {
		let o: Observable<Buffer> = RxFs.createObservableReadStream(this.fileName);


		let edf: EDFData = new EDFData();
		return o.map((data: Buffer): any => {
			this.parseHeader(data);
		});
	}

	private parseHeader(buffer: Buffer): EDFHeader {
		let header = new EDFHeader();

		header.formatVersion = buffer.toString('binary', 0, 8);
		header.startDate = buffer.toString('binary', 168, 16);

		return header;
	}
}

export default Parser;
