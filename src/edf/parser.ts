'use strict';
/// <reference path="../typings/tsd.d.ts" />

import { EDFData, EDFHeader, EDFSignal } from './edf';
import typeSet from './template';

var jBinary = require('../../lib/jbinary/jbinary');
var moment = require('moment');

import { Observable, Observer } from 'rxjs';
import * as fs from 'fs';

export class Parser {
	constructor(private fileName: string) { }

	public static parse(fileName: string): Observable<EDFData> {
		return new Parser(fileName).parse();
	}

	private parse(): Observable<EDFData> {
		return Observable.create((observer: Observer<EDFData>) => {
			jBinary.load(fs.createReadStream(this.fileName), typeSet)
			.then((rawedf: any) => {
				let data: EDFData = new EDFData();

				data.fileName = this.fileName;

				data.header.version = rawedf.version;
				data.header.patientId = rawedf.patientId;
				data.header.recordingId = rawedf.recordingId;
				data.header.startDateTime = moment(rawedf.startDateTime, 'DD.MM.YYHH.mm.ss');
				data.header.recordDuration = moment.duration(rawedf.dataRecordDuration, 'seconds');

				let signal: EDFSignal;
				for (let signalNum = 0; signalNum < rawedf.signalCount; signalNum++ ) {
					signal = new EDFSignal();
					signal.label = rawedf.signalLabels[signalNum];
					signal.physicalMin = rawedf.physicalMinimum[signalNum];
					signal.physicalMax = rawedf.physicalMaximum[signalNum];
					signal.digitalMin = rawedf.digitalMinimum[signalNum];
					signal.digitalMax = rawedf.digitalMaximum[signalNum];
					signal.samplesPerPeriod = rawedf.signalSampleCounts[signalNum];
					signal.units = rawedf.signalUnits[signalNum];
					signal.transducerType = rawedf.transducerTypes[signalNum];
					signal.prefilter = rawedf.prefiltering[signalNum];
					signal.gain = ( rawedf.physicalMaximum[signalNum] - rawedf.physicalMinimum[signalNum])
						/ ( rawedf.digitalMaximum[signalNum] - rawedf.digitalMinimum[signalNum]);

					for (let recordNum = 0; recordNum < rawedf.dataRecordCount; recordNum++) {
						signal.digitalSamples = signal.digitalSamples.concat(rawedf.dataRecords[recordNum][signalNum]);

						signal.scaledSamples = signal.scaledSamples.concat(
							signal.digitalSamples.map((sample: number): number => {
								return sample * signal.gain;
							})
						);
					}


					data.signals[signalNum] = signal;
				}

				observer.next(data);

			}).catch((err: Error) => {
				console.error(err, err.stack.split('\n'));
				observer.error(err);
			});
		});
	}
}

export { EDFData, EDFHeader, EDFSignal };
