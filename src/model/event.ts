'use strict';
/// <reference path="typings/tsd.d.ts"/>

import {Moment} from 'moment/moment';

export class Event{
	constructor(public timestamp: Moment, public type: EventType){
		
	}
}

export enum EventType{
	
}