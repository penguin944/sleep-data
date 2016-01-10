import { Observable, Subscriber } from 'rxjs';

export default class RxJsNode {
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
