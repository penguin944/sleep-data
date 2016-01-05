import { Observable, Subscriber } from 'rxjs';

export default class RxJsNodeStreams {
	/**
    * Converts a flowing readable stream to an Observable sequence.
    * @param {Stream} stream A stream to convert to a observable sequence.
    * @returns {Observable} An observable sequence which fires on each 'data' event as well as handling 'error' and 'end' events.
    */
	public static fromReadableStream<T>(stream: NodeJS.ReadableStream): Observable<T> {
        stream.pause();

        return Observable.create(function(subscriber: Subscriber<T>) {
            function dataHandler(data: any) {
                subscriber.next(data);
            }

            function errorHandler(err: Error) {
                subscriber.error(err);
            }

            function endHandler() {
                subscriber.complete();
            }

            stream.addListener('data', dataHandler);
            stream.addListener('error', errorHandler);
            stream.addListener('end', endHandler);

            stream.resume();

            return function() {
                stream.removeListener('data', dataHandler);
                stream.removeListener('error', errorHandler);
                stream.removeListener('end', endHandler);
            };

        }).publish().refCount();
    }

    public static fromCallbackFunc<T>(fn: (...args: any[]) => void): (...args: any[]) => Observable<T> {
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
        };
    }
}
