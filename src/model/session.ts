'use strict';

import { ChannelType, Channel } from './channel';

export class Session {
	channels: Map<ChannelType, Channel>;

	constructor(public id: SessionId) {

	}
}

export type SessionId = number;

export interface SessionSlice {
	start: number;
	end: number;
	status: SliceStatus;
}

export enum SliceStatus {
	UnknownStatus, EquipmentOff, EquipmentLeaking, EquipmentOn
}
