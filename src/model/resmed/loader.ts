import * as fs from 'fs';
var UUID = require('node-uuid');

import RxFs from '../../lib/rx/rxify-fs';
import { Observable, Subject } from 'rxjs';
import { GroupedObservable } from 'rxjs/operator/groupBy-support';

import { EDFData } from '../../edf/edf';
import { Parser } from '../../edf/parser';
import { MachineLoader, CpapMachine } from '../machine';
import { SessionId, Session } from '../session';
import { DataGroup } from './model';

export default class ResMedLoader implements MachineLoader {
	constructor(public machine: CpapMachine) {	}

	// Load one or more sessions from the provided directory. The directory
	// should contain all the files for a single day. If there are multiple
	// sets of files for a single day there were multiple sessions for that day
	public load(files: string[]): Observable<Map<SessionId, Session>> {
		return Observable.fromArray(files)
			.filter((fileName: string) => fileName.endsWith('.edf'))
			.flatMap(Parser.parse)
			.groupBy((data: EDFData) => data.sessionId )
			.combineAll(this.convert);
	}

	private convert(group: EDFData[]): Map<SessionId, Session> {
		console.log('SessionId ' + group[0].sessionId);
		console.log('Converting edfdata: ' + JSON.stringify(group));

		let sessionMap: Map<SessionId, Session> = new Map<SessionId, Session>();

		let summaryData: EDFData;
		let eventData: EDFData;

		group.forEach((edfData: EDFData) => {
			switch (edfData.dataGroup) {
				case DataGroup.STR:
					summaryData = edfData;
					break;

				case DataGroup.EVE:
					eventData = edfData;
					break;

				case DataGroup.BRP:
				case DataGroup.CSL:
				case DataGroup.PLD:
				case DataGroup.SAD:

					break;
			}

			eventData.annotations;
		});

		return sessionMap;
	}
}
