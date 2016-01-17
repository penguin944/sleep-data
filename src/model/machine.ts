'use strict';

import { Observable } from 'rxjs';
import { SessionId, Session } from './session';

export abstract class Machine {
	type: MachineType;
	brand: MachineBrand;
	loaderName: string;
	model: string;
	modelNumber: string;
	serial: string;
	series: string;
	cap: number;

	version: number;

	sessions: Map<SessionId, Session>;

	constructor(public id: MachineId) {

	}
}

export type MachineId = number;

export enum MachineType {
	UNKNOWN, CPAP, OXIMETER, SLEEPSTAGE, JOURNAL, POSITION, UNCATEGORIZED
}

export enum MachineBrand {
	UNKNOWN, RESMED, FISCHER_PAYKEL, PHILIPS
}

export interface MachineLoader {
	load: (dirpath: string) => Observable<Session>;
}
