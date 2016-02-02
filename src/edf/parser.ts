'use strict';
/// <reference path="../typings/tsd.d.ts" />

import { DataGroup } from '../model/resmed/model';
import { EDFData, EDFHeader, EDFSignal } from './edf';
import typeSet from './template';

var jBinary = require('../lib/jbinary/jbinary');
var moment = require('moment');

import { Observable, Observer } from 'rxjs';
import * as fs from 'fs';

export class Parser {
	constructor(private fileName: string) { }

	public static parse(fileName: string): Observable<EDFData> {
		return new Parser(fileName).parse();
	}

	private parse(): Observable<EDFData> {
		return this.parseEDFData().map((rawedf: any): EDFData => {
			let data:EDFData = new EDFData();

			data.fileName = this.fileName;

			let file: string = this.fileName.substring(this.fileName.lastIndexOf('/') + 1);
			data.dataGroup = this.calcDataGroup(file.substring(file.lastIndexOf('_') + 1, file.lastIndexOf('.')));
			data.sessionId = data.dataGroup === DataGroup.STR ? 'global' : file.substring(0, 13).replace('_', '');

			data.header.version = rawedf.version;
			data.header.patientId = rawedf.patientId;
			data.header.recordingId = rawedf.recordingId;
			data.header.startDateTime = moment(rawedf.startDateTime, 'DD.MM.YYHH.mm.ss');
			data.header.recordDuration = moment.duration(rawedf.dataRecordDuration, 'seconds');

/*
			let signal:EDFSignal;
			for (let signalNum = 0; signalNum < rawedf.signalCount; signalNum++) {
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

				signal.gain = this.calculateGain(rawedf, signalNum);

				for (let recordNum = 0; recordNum < rawedf.dataRecordCount; recordNum++) {
					signal.digitalSamples = signal.digitalSamples.concat(rawedf.dataRecords[recordNum][signalNum]);

					signal.scaledSamples = signal.scaledSamples.concat(
						signal.digitalSamples.map((sample:number):number => {
							return sample * signal.gain;
						})
					);
				}

				data.signals[signalNum] = signal;
			}
*/

			return data;
		});
	}

	private calcDataGroup(groupString: string): DataGroup {
		return DataGroup[groupString];
		/*
		let group: DataGroup;
		switch (groupString) {
			case 'STR':
				group = DataGroup.STR;
				break;

			case 'BRP':
				group = DataGroup.BRP;
				break;

			case 'CSL':
				group = DataGroup.CSL;
				break;

			case 'EVE':
				group = DataGroup.EVE;
				break;

			case 'PLD':
				group = DataGroup.PLD;
				break;

			case 'SAD':
				group = DataGroup.SAD;
				break;

			default:
				group = null;
		}

		return group;*/
	}

	private calculateGain(rawedf: any, signalNum: number) {
		try {
			return ( rawedf.physicalMaximum[signalNum] - rawedf.physicalMinimum[signalNum] )
				/ ( rawedf.digitalMaximum[signalNum] - rawedf.digitalMinimum[signalNum] );

		} catch (err) {
			console.error('Unable to calculate gain');

			return -1;
		}
	};

	private parseEDFData(): Observable<any> {
		let stream: fs.ReadStream = fs.createReadStream(this.fileName);

		stream.on('end', () => {
			console.log('File ' + this.fileName + ' end');
			stream.close();
		});

		stream.on('close', () => {
			console.log('File ' + this.fileName + ' closed');
		});

		console.log('Parsing ' + this.fileName);

		return Observable.fromPromise(
			jBinary.load(stream, typeSet).then((binary: jBinary) => {
				return binary.readAll();
			})
		);
	};

}

export { EDFData, EDFHeader, EDFSignal };
