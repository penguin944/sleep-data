import * as fs from 'fs';
var UUID = require('node-uuid');

import RxFs from '../../../lib/rx/rxify-fs';
import { Observable, Subject, GroupedObservable } from 'rxjs';

import { EDFData } from '../../edf/edf';
import { Parser } from '../../edf/parser';
import { MachineLoader, Machine } from '../machine';
import { SessionId, Session } from '../session';
import { DataGroup } from './model';

export default class ResMedLoader implements MachineLoader {
	constructor(public machine: Machine) {

	}

	// Load one or more sessions from the provided directory. The directory
	// should contain all the files for a single day. If there are multiple
	// sets of files for a single day there were multiple sessions for that day
	public load(path: string): Observable<Session> {
		return RxFs.readdirFiles(path)
			.filter((fileName: string) => {
				return fileName.endsWith('.edf');
			})
			.flatMap(Parser.parse)
			.groupBy((data: EDFData) => {
				return data.fileName.slice(data.fileName.lastIndexOf('_'), data.fileName.lastIndexOf('.'));
			})
			.map((group: GroupedObservable<EDFData>): Session => {
				let sessionId: string = UUID.v4();

				let session: Session = new Session(sessionId);


				return session;
			});
	}

	public convert(dataMap: Map<DataGroup, EDFData>): Observable<Session> {
		let result: Observable<Session> = new Subject<Session>();

		return result;
	}
}
