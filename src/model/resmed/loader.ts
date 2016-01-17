/**
 * Created by Mike on 1/17/2016.
 */

import { Observable, Subject } from 'rxjs';

import { EDFData } from '../../edf/edf';
import { Parser } from '../../edf/parser';
import { MachineLoader, Machine } from '../machine';
import { SessionId, Session } from '../session';
import { DataGroup } from './model';

export default class ResMedLoader implements MachineLoader {
	constructor(public machine: Machine) {

	}

	public load(path: string): Map<SessionId, Session> {
		return null;
	}

	public convert(dataMap: Map<DataGroup, EDFData>): Observable<Session> {
		let result: Observable<Session> = new Subject<Session>();

		return result;
	}
}