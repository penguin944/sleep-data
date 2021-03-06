import RxFs from '../../lib/rx/rxify-fs';
/**
 * Created by Mike on 1/17/2016.
 */
'use strict';
/// <reference path="../../typings/tsd.d.ts" />

import * as fs from 'fs';
import ResMedLoader from './loader';
import { CpapMachine } from '../machine';
import { SessionId, Session } from '../session';

describe('ResMed Loader', () => {
	it('should load and transform source data into SleepyTime model', (done: Function) => {
		let machine: CpapMachine = new CpapMachine(1);

		let loader: ResMedLoader = new ResMedLoader(machine);

		const airsensedir: string = 'data/resmed/airsense10/';
		const airsensedatadir: string = airsensedir + 'DATALOG/';
		const dateString: string = '20151225/';
		RxFs.readdir(airsensedatadir + dateString).subscribe((fileNames: string[]) => {
			fileNames = fileNames.map((fileName: string) => {
				return airsensedatadir + dateString + fileName;
			});

			// Add summary data file
			fileNames.push(airsensedir + 'STR.edf');
			loader.load(fileNames).subscribe(
				(sessionMap: Map<SessionId, Session>) => {
					console.log(JSON.stringify(sessionMap));

				}, (err: Error) => {
					console.error(err, err.stack.split('\n'));

					fail(err);

				}, () => {
					done();
				});
		});
	}, 600000);
});
