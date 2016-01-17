/**
 * Created by Mike on 1/17/2016.
 */
'use strict';
/// <reference path="../../typings/tsd.d.ts" />

import * as fs from 'fs';
import ResMedLoader from './loader';
import { Machine } from '../machine';
import { Session } from '../session';

describe('ResMed machine data loading', () => {
	it('should load and transform source data into SleepyTime model', (done: Function) => {
		let machine: Machine = new Machine(1);

		let loader: ResMedLoader = new ResMedLoader(machine);

		loader.convert(null).subscribe( (session: Session) => {
			done();
		});
	});
});
