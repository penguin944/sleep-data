/// <reference path="../../../typings/tsd.d.ts" />

var jBinary = require('../../../../lib/jbinary/jbinary');

import { EDFConstants } from './edf';

export default {
	'jBinary.littleEndian': true,
	'jBinary.all': 'edfdata',

	edfdata: {
		version: [ 'trimstring', 8 ],
		patientId: [ 'trimstring', 80 ],
		recordingId: [ 'trimstring', 80 ],
		startDate: [ 'string', 8 ],
		startTime: [ 'string', 8 ],
		headerLength: [ 'integerstring', 8 ],
		recordFormat: [ 'trimstring', 44 ],
		dataRecordCount: [ 'integerstring', 8 ],
		dataRecordDuration: [ 'decimalstring', 8 ],
		signalCount: [ 'integerstring', 4 ],
		signalLabels: [ 'array', [ 'trimstring', 16 ], 'signalCount' ],
		transducerTypes: [ 'array', [ 'trimstring', 80 ], 'signalCount' ],
		signalUnits: [ 'array', [ 'trimstring', 8 ], 'signalCount' ],
		physicalMinimum: [ 'array', [ 'decimalstring', 8 ], 'signalCount' ],
		physicalMaximum: [ 'array', [ 'decimalstring', 8 ], 'signalCount' ],
		digitalMinimum: [ 'array', [ 'integerstring', 8 ], 'signalCount' ],
		digitalMaximum: [ 'array', [ 'integerstring', 8 ], 'signalCount' ],
		prefiltering: [ 'array', [ 'trimstring', 80 ], 'signalCount' ],
		signalSampleCounts: [ 'array', [ 'integerstring', 8 ], 'signalCount' ],
		reserved1: [ 'skip', (context: any): number => {
			return context.signalCount * 32;
		}],
		dataRecords: [ 'array', 'edfdatarecord', 'dataRecordCount']
	},

	edfdatarecord: jBinary.Type({
		params: ['signalCount'],

		read: function(context: any): any {
			let signalCount = context.signalCount;
			let signalSampleCounts = context.signalSampleCounts;

			let signals: number[][] = [];
			for (let i = 0; i < signalCount; i++) {
				signals[i] = this.binary.read([ 'array', 'int16', signalSampleCounts[i] ]);
			}

			return signals;
		},

		write: function(): void { ; }
	}),

	trimstring: jBinary.Type({
		params: ['length'],

		read: function() {
			let value: string = this.binary.read([ 'string', this.length ]);

			return value.trim();
		},

		write: function(value: string) {
			let trimmedValue: string = value.trim();

			let paddedValue: string = trimmedValue.concat(' '.repeat(this.length - trimmedValue.length));

			this.binary.write(['array', 'string'], paddedValue);
		}
	}),

	decimalstring: jBinary.Type({
		params: ['length'],

		read: function(): number {
			let value: string = this.binary.read([ 'string', this.length ]);

			return parseFloat(value);
		},

		write: function(value: number) {
			let trimmedValue: string = value.toString();

			let paddedValue: string = trimmedValue.concat(' '.repeat(this.length - trimmedValue.length));

			this.binary.write(['array', 'string'], paddedValue);
		}
	}),

	integerstring: jBinary.Type({
		params: ['length'],

		read: function(): number {
			let value: string = this.binary.read([ 'string', this.length ]);

			return parseInt(value, 10);
		},

		write: function(value: number) {
			let trimmedValue: string = value.toString();

			let paddedValue: string = trimmedValue.concat(' '.repeat(this.length - trimmedValue.length));

			this.binary.write(['array', 'string'], paddedValue);
		}
	}),
};
