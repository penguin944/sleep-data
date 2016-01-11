'use strict';
/// <reference path="../../../typings/tsd.d.ts" />

var jBinary = require('../../../lib/jbinary/jbinary');

export default {
	'jBinary.littleEndian': true,
	'jBinary.all': 'baseType',

	edfheader: {
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
		dataRecordSampleCount: [ 'array', [ 'integerstring', 8 ], 'signalCount' ],
		reserved1: [ 'skip', function (context: any) {
		    return context.signalCount * 32; // total size except `size` field itself
		}],
	},

	edfdata: {
		// nr of samples[1] * integer : first signal in the data record
		// nr of samples[2] * integer : second signal
	},



	baseType: {
		header: 'edfheader',
		data: 'edfdata'
	},

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
