import { Observable, Subject, Subscriber } from 'rxjs';
import * as Rx from 'rxjs';
import * as fs from 'fs';
import * as readline from 'readline';

export default class RxFs {
    public static rename(path1: string, path2: string): Observable<void> {
	    return Observable.bindNodeCallback(fs.rename)(path1, path2);
    }

    public static truncate(path: string, len: number): Observable<void> {
		return Observable.bindNodeCallback(fs.truncate)(path, len);
    }

    public static ftruncate(fd: number, len: number): Observable<void> {
		return Observable.bindNodeCallback(fs.ftruncate)(fd, len);
    }

    public static chmod(path: string, mode: string): Observable<void> {
		return Observable.bindNodeCallback(fs.chmod)(path, mode);
    }

    public static stat(path: string): Observable<fs.Stats> {
		return Observable.bindNodeCallback(fs.stat)(path);
    }

    public static lstat(path: string): Observable<fs.Stats> {
		return Observable.bindNodeCallback(fs.lstat)(path);
    }

    public static fstat(fd: number): Observable<fs.Stats> {
		return Observable.bindNodeCallback(fs.fstat)(fd);
    }

    public static link(srcpath: string, dstpath: string): Observable<void> {
		return Observable.bindNodeCallback(fs.link)(srcpath, dstpath);
    }

    public static symlink(srcpath: string, dstpath: string, type?: string): Observable<void> {
		return Observable.bindNodeCallback(fs.symlink)(srcpath, dstpath, type);
    }

    public static readlink(path: string): Observable<string> {
		return Observable.bindNodeCallback(fs.readlink)(path);
    }

    public static realpath(path: string): Observable<string> {
		return Observable.bindNodeCallback(fs.realpath)(path);
    }

    public static unlink(path: string): Observable<void> {
		return Observable.bindNodeCallback(fs.unlink)(path);
    }

    public static rmdir(path: string): Observable<void> {
		return Observable.bindNodeCallback(fs.rmdir)(path);
    }

    public static mkdir(path: string, mode: string): Observable<void> {
		return Observable.bindNodeCallback(fs.mkdir)(path, mode);
    }

	public static readdirFiles(path: string): Observable<string> {
		return Observable.bindNodeCallback(fs.readdir)(path);
	}

    public static readdir(path: string): Observable<string[]> {
        return Observable.bindNodeCallback(fs.readdir)(path);
    }

    public static close(fd: number): Observable<void> {
        return Observable.bindNodeCallback(rs.close)(fd);
    }

    public static open(path: string, flags: string, mode: string): Observable<number> {
        return Observable.bindNodeCallback(fs.open)(path, flags, mode);
    }

    public static write(fd: number, buffer: Buffer, offset: number, length: number, position: number):
		Observable<{ bytesWritten: number, buffer: Buffer }> {

        return Observable.bindNodecallback(rs.write)(fd, buffer, offset, length, position);
    }

    public static read(fd: number, buffer: Buffer, offset: number, length: number, position: number):
		Observable<{ bytesRead: number, buffer: Buffer }> {

        return Observable.bindNodeCallback(fs.read)(fd, buffer, offset, length, position);
    }

    public static readFile(fileName: string, encoding: string): Observable<string> {
        return Observable.bindNodeCallback(fs.readFile)(fs.readFile(fileName, encoding);
    }

    public static writeFile(fileName: string, data: string, options?: { encoding?: string; mode?: number; flag?: string; }):
		Observable<void> {

	    return Observable.bindNodeCallback(fs.writeFile)(fileName, data, options);
    }

	public static watch(filename: string, options: { persistent?: boolean; }): Observable<{event: string, filename: string}> {
		return Observable.bindNodeCallback(fs.watch)(filename, options);
	}

    public static watchFile(filename: string, options?: { persistent?: boolean; interval?: number; }):
		Observable<{curr: fs.Stats, prev: fs.Stats}> {

	    return Observable.bindNodeCallback(fs.watchFile)(filename, options);
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
