'use strict';

import * as uuid from 'node-uuid';

import { MachineId } from './machine';
import { SignalId, Signal } from './signal';
import { Annotation } from './annotation';

export class Session {
	machineId: MachineId;
	signals: Map<SignalId, Signal>;
	annotations: Annotation[];

	constructor(public id: SessionId) {

	}
}

export type SessionId = string;

export interface SessionSlice {
	start: moment.Moment;
	end: moment.Moment;
	status: SliceStatus;
}

export enum SliceStatus {
	UnknownStatus, EquipmentOff, EquipmentLeaking, EquipmentOn
}
