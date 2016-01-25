import * as fs from 'fs';
var UUID = require('node-uuid');

import RxFs from '../../../lib/rx/rxify-fs';
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
			.combineAll(this.convert);
	}

	private calcSessionKey(data: EDFData): SessionId {
		let sessionId: SessionId = data.header.startDateTime.startOf('minute').valueOf().toString();

		return sessionId;
	}

	private calcDataGroup(data: EDFData): DataGroup {
		let fileName: string = data.fileName.slice(data.fileName.lastIndexOf('/'), data.fileName.lastIndexOf('.'));

		let dataGroupString: string = fileName.slice(Math.min(0, fileName.lastIndexOf('_')));
		switch (dataGroupString) {
			case 'STR':
				return DataGroup.STR;

			case 'BRP':
				return DataGroup.BRP;

			case 'CSL':
				return DataGroup.CSL;

			case 'EVE':
				return DataGroup.EVE;

			case 'PLD':
				return DataGroup.PLD;

			case 'SAD':
				return DataGroup.SAD;

			default:
				return null;
		}
	}

	private convert(group: EDFData[]): Map<SessionId, Session> {
		let sessionMap: Map<SessionId, Session> = new Map<SessionId, Session>();

		let summaryData: EDFData;
		let eventData: EDFData;

		group.forEach((edfData: EDFData) => {
			let dataGroup: DataGroup = this.calcDataGroup(edfData);

			switch (dataGroup) {
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