'use strict';
/// <reference path="../../typings/tsd.d.ts"/>

import { Parser } from "./parser";

describe("ResMed machine data parsing", () => {
	it("should parse the edf header from the STR file", () => {
		let parser: Parser = new Parser("STR.edf");
		parser.parse();

		expect(true).toBeTruthy();
	})
});