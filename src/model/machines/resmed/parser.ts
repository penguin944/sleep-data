'use strict';
/// <reference path="../../../typings/tsd.d.ts" />

import { EDFData, EDFHeader, EDFSignal } from './edf';
import typeSet from './template';

var jBinary = require('../../../../lib/jbinary/jbinary');
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

		//return result;

		return result.map((edfdata: any): EDFData => {
			let data: EDFData = new EDFData();

			data.header.version = edfdata.version;
			data.header.patientId = edfdata.patientId;
			data.header.recordingId = edfdata.recordingId;
			data.header.startDateTime = moment(edfdata.startDateTime, 'MM.DD.YYHH.mm.ss');
			data.header.recordDuration = moment.duration(edfdata.dataRecordDuration, 'seconds');

			let signal: EDFSignal;
			for (let signalNum = 0; signalNum < edfdata.signalCount; signalNum++ ) {
				signal = new EDFSignal();
				signal.label = edfdata.signalLabels[signalNum];
				signal.physicalMin = edfdata.physicalMinimum[signalNum];
				signal.physicalMax = edfdata.physicalMaximum[signalNum];
				signal.digitalMin = edfdata.digitalMinimum[signalNum];
				signal.digitalMax = edfdata.digitalMaximum[signalNum];
				signal.samplesPerPeriod = edfdata.signalSampleCounts[signalNum];
				signal.units = edfdata.signalUnits[signalNum];
				signal.transducerType = edfdata.transducerTypes[signalNum];
				signal.prefilter = edfdata.prefiltering[signalNum];
				signal.gain = ( edfdata.physicalMaximum[signalNum] - edfdata.physicalMinimum[signalNum])
							/ ( edfdata.digitalMaximum[signalNum] - edfdata.digitalMinimum[signalNum]);

				for (let recordNum = 0; recordNum < edfdata.dataRecordCount; recordNum++) {
					signal.digitalSamples = signal.digitalSamples.concat(edfdata.dataRecords[recordNum][signalNum]);
				}

				signal.samplesInUnits = signal.digitalSamples.map((sample: number): number => {
					return sample * signal.gain;
				});

				data.signals[signalNum] = signal;
			}

			return data;
		});
	}
}

export default Parser;
