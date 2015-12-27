'use strict';
/// <reference path="../../typings/tsd.d.ts"/>

import { EDFHeader } from './edf';
import { Session } from '../../session';

export class Parser{
	static parse(fileName: string): Session{
		let header = Parser.parseHeader();

		let session = new Session(0);

		return session;
	}

	static parseHeader(): EDFHeader{
		let header = new EDFHeader();

		return header;
	}
}