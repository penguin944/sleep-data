'use strict';
/// <reference path="../../../typings/tsd.d.ts" />

export class EDFData {
	public header: EDFHeader;
	public signal: EDFSignal;
	public annotations: EDFAnnotation[];
}

export class EDFHeader {
	public idCode: string;
	public subjectID: string;
	public recordingID: string;
	public startDate: string;
	public startTime: string;
	public bytesInHeader: number = 0;
	public formatVersion: string;
	public numberOfRecords: number = 0;
	public durationOfRecords: number = 0.0;
	public numberOfChannels: number = 0;
	public channelLabels: string[];
	public transducerTypes: string[];
	public dimensions: string[];
	public physicalMin: string[];
	public physicalMax: string[];
	public digitalMin: number[];
	public digitalMax: number[];
	public prefilterings: string[];
	public numberOfSamples: number[];
	public gain: number; // (physicalMax - physicalMin) / (digitalMax - digitalMin)
}

export class EDFSignal {
	public unitsInDigit: number[];
	public digitalValues: number[][];
	public valuesInUnits: number[][];
}

export class EDFAnnotation {
	onSet: number = 0.0;
	duration: number = 0.0;
	annotations: string[];

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

export class EDFConstants {
	public static VERSION_LENGTH = 8;
	public static IDENTIFICATION_CODE_LENGTH = 8;
	public static PATIENT_IDENTIFICATION_LENGTH = 80;
	public static RECORDING_IDENTIFICATION_LENGTH = 80;
	public static START_DATE_LENGTH = 8;
	public static START_TIME_LENGTH = 8;
	public static HEADER_LENGTH = 8;
	public static RECORD_FORMAT_LENGTH = 44;
	public static DATA_RECORD_DURATION_LENGTH = 8;
	public static DATA_RECORD_COUNT_LENGTH = 8;
	public static SIGNAL_COUNT_LENGTH = 4;

	public static SIGNAL_LABEL_LENGTH = 16;
	public static TRANSDUCER_TYPE_LENGTH = 80;
	public static SIGNAL_UNITS_LENGTH = 8;
	public static PHYSICAL_MIN_IN_UNITS_LENGTH = 8;
	public static PHYSICAL_MAX_IN_UNITS_LENGTH = 8;
	public static DIGITAL_MIN_LENGTH = 8;
	public static DIGITAL_MAX_LENGTH = 8;
	public static PREFILTERING_LENGTH = 80;
	public static DATA_RECORD_SAMPLE_COUNT_LENGTH = 8;
	public static RESERVED_LENGTH = 32;
}
