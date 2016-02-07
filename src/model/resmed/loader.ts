import * as fs from 'fs';
var UUID = require('node-uuid');

import RxFs from '../../lib/rx/rxify-fs';
import { Observable, Subject } from 'rxjs';
import { GroupedObservable } from 'rxjs/operator/groupBy-support';

import { EDFData, EDFSignal } from '../../edf/edf';
import { Parser } from '../../edf/parser';
import { MachineLoader, CpapMachine } from '../machine';
import { SessionId, Session } from '../session';
import { DataGroup, SignalType, BRPSignalType, PLDSignalType } from './model';

export default class ResMedLoader implements MachineLoader {
	constructor(public machine: CpapMachine) {	}

	// Load one or more sessions from the provided directory. The directory
	// should contain all the files for a single day. If there are multiple
	// sets of files for a single day there were multiple sessions for that day
	public load(files: string[]): Observable<Map<SessionId, Session>> {
		return Observable.fromArray(files)
			.filter((fileName: string) => fileName.endsWith('.edf'))
			.flatMap(Parser.parse)
			.reduce(this.convert, new Map<SessionId, Session>());
	}

	private convert(sessionMap: Map<SessionId, Session>, edf: EDFData): Map<SessionId, Session> {
		let session: Session;
		if (sessionMap.has(edf.sessionId)) {
			session = sessionMap.get(edf.sessionId);

		} else {
			session = new Session(edf.sessionId);
			sessionMap.set(edf.sessionId, session);
		}

		var addSignal = (signalType: SignalType, edf: EDFData) => {
			let signal: EDFSignal = edf.signals.get(signalType);

			if (signal) {
				session.signals.set(signalType,
					{signalId: signalType, units: signal.units, samplesPerPeriod: signal.samplesPerPeriod, samples: signal.scaledSamples});
			}
		};

		switch (edf.dataGroup) {
			case DataGroup.STR:
				break;

			case DataGroup.EVE:
				break;

			case DataGroup.BRP: // High Resolution Graph Data
				addSignal(BRPSignalType.FLOW, edf);
				addSignal(BRPSignalType.MASK_PRESSURE, edf);

				break;

			case DataGroup.PLD: // Low Resolution Graph Data
				addSignal(PLDSignalType.INSPIRATORY_PRESSURE, edf);
				if (!edf.signals.has(PLDSignalType.MASK_PRESSURE)) {
					addSignal(PLDSignalType.MASK_PRESSURE, edf);
				}

				break;

			case DataGroup.CSL:
			case DataGroup.SAD:
				break;
		}

		return sessionMap;
	}
}
