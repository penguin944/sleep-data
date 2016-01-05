import { Observable, Subject } from 'rxjs';
import * as fs from 'fs';

export default class RxFs extends fs {
	public static rename(path1, path2): Observable {
		let subject = new Subject();

		let handler = function(err?: NodeJS.ErrnoException) {
			if (err) {
				subject.error(err);

			} else {
				subject.next();
				subject.complete();
			}
		};

		fs.rename(path1, path2, handler);

		return subject;
	}

	public static truncate(fd: number, len: number): Observable {
		let subject = new Subject();

		let handler = function(err?: NodeJS.ErrnoException) {
			if (err) {
				subject.onError(err);

			} else {
				subject.onNext();
				subject.onCompleted();
			}
		};

		fs.truncate(fd, len, handler);

		return subject;
	}

	public static chmod(path: string, mode: string): Observable {
	    let subject = new Subject();

	    let handler = function (err) {
	         if (err) {
	             subject.error(err);
	         } else {
	             subject.next();
	             subject.complete();
	         }
	    };

	    fs.chmod(path, mode, handler);

	    return subject;
	}

	public static stat(path: string): Observable<fs.Stats> {
	     let subject = new Subject<fs.Stats>();

	     let handler = function(err, stats) {
	         if (err) {
	             subject.error(err);
	         }  else {
	             subject.next(stats);
	             subject.complete();
	         }
	     };

	     fs.stat(path, handler);

	     return subject;
	}

	public static lstat(path: string): Observable<fs.Stats> {
		let subject = new Subject();

		let handler = function(err?: NodeJS.ErrnoException, stats: fs.Stats) {
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

		 let handler = function(err?: NodeJS.ErrnoException, stats: fs.Stats) {
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
	            subject.next();
	            subject.complete();
	        }
	    };

		fs.link(srcpath, dstpath, handler);

		return subject;
	}

	public static symlink(srcpath: string, dstpath: string, type?: string): Subject<void> {
	    let subject = new Subject<void>();

	    let handler = function(err?: NodeJS.ErrnoException) {
	    	if (err) {
	            subject.error(err);

	        } else {
	            subject.next();
	            subject.complete();
	        }
	    };

	    fs.symlink(srcpath, dstpath, type, handler);

	    return subject;
	}

	public static readlink(path: string) {
		let subject = new Subject(),
		handler = function(err, resolvedPath) {
		if (err) {
		subject.onError(err);
		} else {
		subject.onNext(resolvedPath);
		subject.onCompleted();
		}
		};
		fs.readlink(path, handler);
		return subject;
	};
exports.realpath  = function(path) {
     var subject = new Rx.AsyncSubject(),
     handler = function(err, resolvedPath) {
         if (err) {
             subject.onError(err);
         } else {
             subject.onNext(resolvedPath);
             subject.onCompleted();
         }
     };
     fs.realpath(path, handler);
     return subject;
};
exports.unlink  = function(path) {
     var subject = new Rx.AsyncSubject(),
     handler =  function(err) {
         if (err) {
             subject.onError(err);
         } else {
             subject.onNext();
             subject.onCompleted();
         }
     };
     fs.unlink(path, handler);
     return subject;
};
exports.rmdir  = function(path) {
     var subject = new Rx.AsyncSubject(),
     handler = function (err) {
         if (err) {
             subject.onError(err);
         } else {
             subject.onNext();
             subject.onCompleted();
         }
     };
     fs.rmdir(path, handler);
     return subject;
};
exports.mkdir  = function(path, mode) {
     var subject = new Rx.AsyncSubject(),
     handler = function (err) {
         if (err) {
             subject.onError(err);
         } else {
             subject.onNext();
             subject.onCompleted();
         }
     };
     fs.mkdir(path, mode, handler);
     return subject;
};
exports.readdir = function(path) {
     var subject = new Rx.AsyncSubject(),
     handler = function(err, files) {
         if (err) {
             subject.onError(err);
         } else {
             subject.onNext(files);
             subject.onCompleted();
         }
     };
     fs.readdir(path, handler);
     return subject;
};
exports.close  = function(fd) {
     var subject = new Rx.AsyncSubject(),
     handler = function (err) {
         if (err) {
             subject.onError(err);
         } else {
             subject.onNext();
             subject.onCompleted();
         }
     };
     fs.close(fd, handler);
     return subject;
};
exports.open = function(path, flags, mode) {
     var subject = new Rx.AsyncSubject(),
     handler = function(err, fd) {
         if (err) {
             subject.onError(err);
         } else {
             subject.onNext(fd);
             subject.onCompleted();
         }
     };
     fs.open(path, flags, mode,  handler);
     return subject;
};
exports.write = function (fd, buffer, offset, length, position) {
     var subject = new Rx.AsyncSubject(),
     handler = function(err, written, innerBuffer) {
         if (err) {
             subject.onError(err);
         } else {
             subject.onNext({ written: written, buffer: innerBuffer });
             subject.onCompleted();
         }
     };
     fs.write(fd, buffer, offset, length, position, handler);
     return subject;
};
exports.read = function (fd, buffer, offset, length, position) {
     var subject = new Rx.AsyncSubject(),
     handler = function (err, bytesRead, innerBuffer) {
         if (err) {
             subject.onError(err);
         } else {
             subject.onNext({ bytesRead: bytesRead, buffer: innerBuffer });
             subject.onCompleted();
         }
     };
     fs.read(fd, buffer, offset, length, position, handler);
     return subject;
};
exports.readFile = function(fileName, encoding) {
     var subject = new Rx.AsyncSubject(),
     handler = function(err, data) {
         if (err)
         {
             subject.onError(err);
         } else {
             subject.onNext(data);
             subject.onCompleted();
         }
     };
     fs.readFile(fileName, encoding,  handler);
     return subject;
};
exports.writeFile  = function(fileName, data, encoding) {
     var subject = new Rx.AsyncSubject(),
     handler = function (err) {
         if (err) {
             subject.onError(err);
         } else {
             subject.onNext();
             subject.onCompleted();
         }
     };
     fs.writeFile(fileName, data, encoding, handler);
     return subject;
};
exports.watchFile = function(filename, options) {
     var subject = new Rx.AsyncSubject(),
     handler = function(curr, prev) {
         subject.onNext( { curr: curr, prev: prev });
         subject.onCompleted();
     };
     fs.watchFile(filename, options, handler);
     return subject;
};
