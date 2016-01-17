'use strict';
/// <reference path="../typings/tsd.d.ts" />

var moment = require('moment');

export class EDFData {
	public header: EDFHeader = new EDFHeader();
	public signals: EDFSignal[] = [];
	public annotations: EDFAnnotation[] = [];
}

export class EDFHeader {
	public version: string;
	public patientId: string;
	public recordingId: string;
	public startDateTime: moment.Moment;
	public numberOfRecords: number = 0;
	public recordDuration: moment.Duration;
}

export class EDFSignal {
	public label: string;
	public units: string;
	public transducerType: string;
	public physicalMin: number;
	public physicalMax: number;
	public digitalMin: number;
	public digitalMax: number;
	public gain: number; // (physicalMax - physicalMin) / (digitalMax - digitalMin)
	public prefilter: string;

	public samplesPerPeriod: number;
	public digitalSamples: number[] = [];
	public scaledSamples: number[] = [];
}

export class EDFAnnotation {
	onSet: number = 0.0;
	duration: number = 0.0;
	annotations: string[] = [];

	constructor(onSet: string, duration: string, annotations: string[]) {
		this.onSet = parseFloat(onSet);

		if (!!duration) {
			this.duration = parseFloat(duration);
		}

		for (let i = 0; i < annotations.length; i++) {
			if (!!annotations[i]) {
				this.annotations.push(annotations[i]);
			}
		}
	}

	public toString(): string {
		return 'Annotation [onSet=' + this.onSet + ', duration=' + this.duration + ', annotations=' + this.annotations + ']';
	}
}
