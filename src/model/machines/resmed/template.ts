'use strict';
/// <reference path="../../../typings/jbinary/jbinary.d.ts" />

export default {
	"jBinary.littleEndian": true,

	signalLabel: [ 'string', 16 ],
	transducerType: [ 'string', 80 ],

	edfheader: {
		version: [ 'string', 8 ],
		patientId: [ 'string', 80 ],
		recordingId: [ 'string', 80 ],
		startDate: [ 'string', 8 ],
		startTime: [ 'string', 8 ],
		headerLength: [ 'string', 8 ],
		recordFormat: [ 'string', 44 ],
		dataRecordCount: [ 'string', 8 ],
		dataRecordDuration: [ 'string', 8 ],
		signalCount: [ 'string', 4 ],
		signalLabels: [ 'array', 'signalLabel', 'signalCount' ],
		transducerTypes: [ 'array', 'transducerType', 'signalCount' ],
		signalUnits: [ 'array', [ 'string', 8 ], 'signalCount' ],
		signalMinimum: [ 'array', [ 'string', 8 ], 'signalCount' ],
		signalMaximum: [ 'array', [ 'string', 8 ], 'signalCount' ],
		digitalMinimum: [ 'array', [ 'string', 8 ], 'signalCount' ],
		digitalMaximum: [ 'array', [ 'string', 8 ], 'signalCount' ],
		prefiltering: [ 'array', [ 'string', 80 ], 'signalCount' ],
		dataRecordSampleCount: [ 'array', [ 'string', 8 ], 'signalCount' ],
		reserved1: [ 'array', [ 'string', 32 ], 'signalCount' ],
	},

	edfdata: {
		
	},

	baseType: {
		header: "edfheader",
		data: "edfdata"
	}
};
