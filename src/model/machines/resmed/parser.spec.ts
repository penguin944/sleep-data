'use strict';
/// <reference path="../../typings/tsd.d.ts"/>

import { Parser } from './parser';
import { EDFHeader, EDFData } from './edf';

describe('ResMed machine data parsing', () => {
	it('should parse the edf header from the STR file', (done: Function) => {
		let parser: Parser = new Parser('STR.edf');
		parser.parse().subscribe((data: EDFData) => {
			expect(data).toBeDefined();
			expect(data.header).toBeDefined();

			done();
		});

		expect(true).toBeTruthy();
	});
});
