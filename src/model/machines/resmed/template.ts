'use strict';
/// <reference path="../../../typings/jbinary/jbinary.d.ts" />

export default {
	signalLabel: [ 'string', 16 ],
	transducerType: [ 'string', 80 ],
	dimension: [ 'string', 8 ],

	header: {
		version: [ 'string', 8 ],
		patientId: [ 'string', 80 ],
		recordingId: [ 'string', 80 ],
		startDate: [ 'string', 8 ],
		startTime: [ 'string', 8 ],
		headerLength: [ 'string', 8 ],
		reserved0: [ 'string', 44 ],
		dataRecordCount: [ 'string', 8 ],
		dataRecordDuration: [ 'string', 8 ],
		signalCount: [ 'string', 4 ],
		signalLabels: [ 'array', 'signalLabel', 'signalCount' ],
		transducerTypes: [ 'array', 'transducerType', 'signalCount' ],
		physicalDimension: [ 'array', 'dimension', 'signalCount' ],
		physicalMinimum: [ 'array', 'dimension', 'signalCount' ],
		physicalMaximum: [ 'array', 'dimension', 'signalCount' ],
		digitalMinimum: [ 'array', 'dimension', 'signalCount' ],
		digitalMaximum: [ 'array', 'dimension', 'signalCount' ],
		prefiltering: [ 'array', [ 'string', 80 ], 'signalCount' ],
		samplesPerDataRecord: [ 'array', 'dimension', 'signalCount' ],
		reserved1: [ 'array', [ 'string', 32 ], 'signalCount' ],
		dataRecords: [ 'array' ]
	}
};
