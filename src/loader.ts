import { Observable, Subscriber } from 'rxjs';
import * as fs from 'fs';

import { Machine } from './model/machine';

let readFile = fromCallbackFunc(fs.readFile);

readFile("")
	// .map(jsonMapper)
	.subscribe(
		(data: string) => {
			console.log(data);
		}, (err: Error) => {
			console.error(err)
		}
	);

}

function fromCallbackFunc<T>(fn: (...args: any[]) => void): (...args: any[]) => Observable<T>{
	return (...args: any[]): Observable<T> => {
		return new Observable((subscriber: Subscriber<T>) => {
			args.push((err: Error, data: T) => {
				if (err) {
					subscriber.error(err);
					
				} else {
					subscriber.next(data);
				}
			});

			fn.apply(this, args);	
		});
	}
}