import { Observable, Subject, Subscriber } from 'rxjs';
import * as fs from 'fs';
import * as readline from 'readline';

export default class RxFs {
    public static rename(path1: string, path2: string): Observable<void> {
        let subject = new Subject<void>();

        let handler = function(err?: NodeJS.ErrnoException) {
            if (err) {
                subject.error(err);

            } else {
                subject.next(undefined);
                subject.complete();
            }
        };

        fs.rename(path1, path2, handler);

        return subject;
    }

    public static truncate(path: string, len: number): Observable<void> {
        let subject = new Subject<void>();

        let handler = function(err?: NodeJS.ErrnoException) {
            if (err) {
                subject.error(err);

            } else {
                subject.next(undefined);
                subject.complete();
            }
        };

        fs.truncate(path, len, handler);

        return subject;
    }

    public static ftruncate(fd: number, len: number): Observable<void> {
        let subject = new Subject<void>();

        let handler = function(err?: NodeJS.ErrnoException) {
            if (err) {
                subject.error(err);

            } else {
                subject.next(undefined);
                subject.complete();
            }
        };

        fs.ftruncate(fd, len, handler);

        return subject;
    }

    public static chmod(path: string, mode: string): Observable<void> {
        let subject = new Subject<void>();

        let handler = function(err?: NodeJS.ErrnoException) {
            if (err) {
                subject.error(err);

            } else {
                subject.next(undefined);
                subject.complete();
            }
        };

        fs.chmod(path, mode, handler);

        return subject;
    }

    public static stat(path: string): Observable<fs.Stats> {
        let subject = new Subject<fs.Stats>();

        let handler = function(err: NodeJS.ErrnoException, stats: fs.Stats) {
            if (err) {
                subject.error(err);

            } else {
                subject.next(stats);
                subject.complete();
            }
        };

        fs.stat(path, handler);

        return subject;
    }

    public static lstat(path: string): Observable<fs.Stats> {
        let subject = new Subject();

        let handler = function(err: NodeJS.ErrnoException, stats: fs.Stats) {
            if (err) {
                subject.error(err);

            } else {
                subject.next(stats);
                subject.complete();
            }
        };

        fs.lstat(path, handler);

        return subject;
    }

    public static fstat(fd: number): Observable<fs.Stats> {
        let subject = new Subject();

        let handler = function(err: NodeJS.ErrnoException, stats: fs.Stats) {
            if (err) {
                subject.error(err);

            } else {
                subject.next(stats);
                subject.complete();
            }
        };

        fs.fstat(fd, handler);

        return subject;
    }

    public static link(srcpath: string, dstpath: string): Observable<void> {
        let subject = new Subject<void>();

        let handler = function(err?: NodeJS.ErrnoException) {
            if (err) {
                subject.error(err);

            } else {
                subject.next(undefined);
                subject.complete();
            }
        };

        fs.link(srcpath, dstpath, handler);

        return subject;
    }

    public static symlink(srcpath: string, dstpath: string, type?: string): Observable<void> {
        let subject = new Subject<void>();

        let handler = function(err?: NodeJS.ErrnoException) {
            if (err) {
                subject.error(err);

            } else {
                subject.next(undefined);
                subject.complete();
            }
        };

        fs.symlink(srcpath, dstpath, type, handler);

        return subject;
    }

    public static readlink(path: string): Observable<string> {
        let subject = new Subject<string>();

        let handler = function(err: NodeJS.ErrnoException, resolvedPath: string): void {
            if (err) {
                subject.error(err);

            } else {
                subject.next(resolvedPath);
                subject.complete();
            }
        };

        fs.readlink(path, handler);

        return subject;
    }

    public static realpath(path: string): Observable<string> {
        let subject = new Subject<string>();

        let handler = function(err: NodeJS.ErrnoException, resolvedPath: string): void {
            if (err) {
                subject.error(err);

            } else {
                subject.next(resolvedPath);
                subject.complete();
            }
        };

        fs.realpath(path, handler);

        return subject;
    }

    public static unlink(path: string): Observable<void> {
        let subject = new Subject<void>();

        let handler = function(err?: NodeJS.ErrnoException) {
            if (err) {
                subject.error(err);

            } else {
                subject.next(undefined);
                subject.complete();
            }
        };

        fs.unlink(path, handler);

        return subject;
    }

    public static rmdir(path: string): Observable<void> {
        let subject = new Subject<void>();

        let handler = function(err?: NodeJS.ErrnoException) {
            if (err) {
                subject.error(err);

            } else {
                subject.next(undefined);
                subject.complete();
            }
        };

        fs.rmdir(path, handler);

        return subject;
    }

    public static mkdir(path: string, mode: string): Observable<void> {
        let subject = new Subject<void>();

        let handler = function(err?: NodeJS.ErrnoException) {
            if (err) {
                subject.error(err);

            } else {
                subject.next(undefined);
                subject.complete();
            }
        };

        fs.mkdir(path, mode, handler);

        return subject;
    }

    public static readdir(path: string): Observable<string[]> {
        let subject = new Subject<string[]>();

		let handler = function(err: NodeJS.ErrnoException, files: string[]) {
            if (err) {
                subject.error(err);

            } else {
                subject.next(files);
                subject.complete();
            }
        };

        fs.readdir(path, handler);

        return subject;
    }

    public static close(fd: number): Observable<void> {
        let subject = new Subject<void>();

        let handler = function(err?: NodeJS.ErrnoException) {
            if (err) {
                subject.error(err);

            } else {
                subject.next(undefined);
                subject.complete();
            }
        };

        fs.close(fd, handler);

        return subject;
    }

    public static open(path: string, flags: string, mode: string): Observable<number> {
        let subject = new Subject();

		let handler = function(err: NodeJS.ErrnoException, fd: number) {
            if (err) {
                subject.error(err);

            } else {
                subject.next(fd);
                subject.complete();
            }
        };

        fs.open(path, flags, mode, handler);

        return subject;
    }

    public static write(fd: number, buffer: Buffer, offset: number, length: number, position: number):
		Observable<{ bytesWritten: number, buffer: Buffer }> {

        let subject = new Subject<{ bytesWritten: number, buffer: Buffer }>();

		let handler = function(err: NodeJS.ErrnoException, bytesWritten: number, innerBuffer: Buffer) {
            if (err) {
                subject.error(err);

            } else {
                subject.next({ bytesWritten: bytesWritten, buffer: innerBuffer });
                subject.complete();
            }
        };

        fs.write(fd, buffer, offset, length, position, handler);

        return subject;
    }

    public static read(fd: number, buffer: Buffer, offset: number, length: number, position: number):
		Observable<{ bytesRead: number, buffer: Buffer }> {

        let subject = new Subject<{ bytesRead: number, buffer: Buffer }>();

		let handler = function(err: NodeJS.ErrnoException, bytesRead: number, innerBuffer: Buffer) {
            if (err) {
                subject.error(err);

            } else {
                subject.next({ bytesRead: bytesRead, buffer: innerBuffer });
                subject.complete();
            }
        };

        fs.read(fd, buffer, offset, length, position, handler);

        return subject;
    }

    public static readFile(fileName: string, encoding: string): Observable<string> {
        let subject = new Subject<string>();

		let handler = function(err: NodeJS.ErrnoException, data: string) {
            if (err) {
                subject.error(err);

            } else {
                subject.next(data);
                subject.complete();
            }
        };

        fs.readFile(fileName, encoding, handler);

		return subject;
    }

    public static writeFile(fileName: string, data: string, options?: { encoding?: string; mode?: number; flag?: string; }):
		Observable<void> {

        let subject = new Subject<void>();

		let handler = function(err?: NodeJS.ErrnoException) {
            if (err) {
                subject.error(err);

            } else {
                subject.next(undefined);
                subject.complete();
            }
        };

        fs.writeFile(fileName, data, options, handler);

		return subject;
    }

	public static watch(filename: string, options: { persistent?: boolean; }): Observable<{event: string, filename: string}> {
		let subject = new Subject<{event: string, filename: string}>();

		let handler = function(event: string, filename: string){
			subject.next({ event: event, filename: filename });
		};

		fs.watch(filename, options, handler);

		return subject;
	}

    public static watchFile(filename: string, options?: { persistent?: boolean; interval?: number; }):
		Observable<{curr: fs.Stats, prev: fs.Stats}> {

        let subject = new Subject<{curr: fs.Stats, prev: fs.Stats}>();

        let handler = function(curr: fs.Stats, prev: fs.Stats) {
            subject.next({ curr: curr, prev: prev });
        };

        fs.watchFile(filename, options, handler);

		return subject;
    }

	/**
    * Opens a stream to read the specified file
    * @param {string} path The path of the file to read
	* @param {OBJECT} options The options controlling the stream that's open. {see fs.readReadStream}
    * @returns {Observable} An observable sequence which fires on each 'data' event as well as handling 'error' and 'end' events.
							It will be an Observable<Buffer> if encoding is 'binary' (default). Otherwise it will publish strings.
    */
	public static createObservableReadStream(path: string,
		options?: { flags?: string; encoding?: string; fd?: number; mode?: number; autoClose?: boolean; }): Observable<Buffer | string> {

		let stream: NodeJS.ReadableStream = fs.createReadStream(path, options);

		return RxFs.fromReadableStream(stream);
	}

	public static createObservableLineReader(path: string): Observable<string> {
		let subject: Subject<string> = new Subject<string>();

		let stream: NodeJS.ReadableStream = fs.createReadStream(path);
		stream.pause();

		stream.on('error', function(err?: NodeJS.ErrnoException): void {
			subject.error(err);
		});

		let lineReader = require('readline').createInterface({
			input: stream,
			terminal: false

		}).on('line', function(line: string) {
			subject.next(line);

		}).on('close', function(){
			subject.complete();
		});

		stream.resume();

		return subject;
	}

	/**
    * Converts a flowing readable stream to an Observable sequence.
    * @param {Stream} stream A stream to convert to a observable sequence.
    * @returns {Observable} An observable sequence which fires on each 'data' event as well as handling 'error' and 'end' events.
    */
	public static fromReadableStream(stream: NodeJS.ReadableStream): Observable<Buffer | string> {
        stream.pause();

        return Observable.create(function(subscriber: Subscriber<Buffer | string>) {
            function dataHandler(data: Buffer | string) {
                subscriber.next(data);
            }

            function errorHandler(err?: NodeJS.ErrnoException) {
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
}
