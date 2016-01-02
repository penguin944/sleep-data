'use strict';
<<<<<<< HEAD
/// <reference path="../../../typings/tsd.d.ts" />

=======
/// <reference path="../../typings/tsd.d.ts"/>

import { Parser } from "./parser";

describe("ResMed machine data parsing", () => {
	it("should parse the edf header from the STR file", () => {
		let parser: Parser = new Parser("STR.edf");
		parser.parse();

		expect(true).toBeTruthy();
	})
});
>>>>>>> cf7009a5321c3c6d8e86bdf1bbdfc00eded9de34
