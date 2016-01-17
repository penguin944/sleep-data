"use strict";
var rxjs_1 = require('rxjs');
var fs = require('fs');
class RxFs {
    static rename(path1, path2) {
        let subject = new rxjs_1.Subject();
        let handler = function (err) {
            if (err) {
                subject.error(err);
            }
            else {
                subject.next(undefined);
                subject.complete();
            }
        };
        fs.rename(path1, path2, handler);
        return subject;
    }
    static truncate(path, len) {
        let subject = new rxjs_1.Subject();
        let handler = function (err) {
            if (err) {
                subject.error(err);
            }
            else {
                subject.next(undefined);
                subject.complete();
            }
        };
        fs.truncate(path, len, handler);
        return subject;
    }
    static ftruncate(fd, len) {
        let subject = new rxjs_1.Subject();
        let handler = function (err) {
            if (err) {
                subject.error(err);
            }
            else {
                subject.next(undefined);
                subject.complete();
            }
        };
        fs.ftruncate(fd, len, handler);
        return subject;
    }
    static chmod(path, mode) {
        let subject = new rxjs_1.Subject();
        let handler = function (err) {
            if (err) {
                subject.error(err);
            }
            else {
                subject.next(undefined);
                subject.complete();
            }
        };
        fs.chmod(path, mode, handler);
        return subject;
    }
    static stat(path) {
        let subject = new rxjs_1.Subject();
        let handler = function (err, stats) {
            if (err) {
                subject.error(err);
            }
            else {
                subject.next(stats);
                subject.complete();
            }
        };
        fs.stat(path, handler);
        return subject;
    }
    static lstat(path) {
        let subject = new rxjs_1.Subject();
        let handler = function (err, stats) {
            if (err) {
                subject.error(err);
            }
            else {
                subject.next(stats);
                subject.complete();
            }
        };
        fs.lstat(path, handler);
        return subject;
    }
    static fstat(fd) {
        let subject = new rxjs_1.Subject();
        let handler = function (err, stats) {
            if (err) {
                subject.error(err);
            }
            else {
                subject.next(stats);
                subject.complete();
            }
        };
        fs.fstat(fd, handler);
        return subject;
    }
    static link(srcpath, dstpath) {
        let subject = new rxjs_1.Subject();
        let handler = function (err) {
            if (err) {
                subject.error(err);
            }
            else {
                subject.next(undefined);
                subject.complete();
            }
        };
        fs.link(srcpath, dstpath, handler);
        return subject;
    }
    static symlink(srcpath, dstpath, type) {
        let subject = new rxjs_1.Subject();
        let handler = function (err) {
            if (err) {
                subject.error(err);
            }
            else {
                subject.next(undefined);
                subject.complete();
            }
        };
        fs.symlink(srcpath, dstpath, type, handler);
        return subject;
    }
    static readlink(path) {
        let subject = new rxjs_1.Subject();
        let handler = function (err, resolvedPath) {
            if (err) {
                subject.error(err);
            }
            else {
                subject.next(resolvedPath);
                subject.complete();
            }
        };
        fs.readlink(path, handler);
        return subject;
    }
    static realpath(path) {
        let subject = new rxjs_1.Subject();
        let handler = function (err, resolvedPath) {
            if (err) {
                subject.error(err);
            }
            else {
                subject.next(resolvedPath);
                subject.complete();
            }
        };
        fs.realpath(path, handler);
        return subject;
    }
    static unlink(path) {
        let subject = new rxjs_1.Subject();
        let handler = function (err) {
            if (err) {
                subject.error(err);
            }
            else {
                subject.next(undefined);
                subject.complete();
            }
        };
        fs.unlink(path, handler);
        return subject;
    }
    static rmdir(path) {
        let subject = new rxjs_1.Subject();
        let handler = function (err) {
            if (err) {
                subject.error(err);
            }
            else {
                subject.next(undefined);
                subject.complete();
            }
        };
        fs.rmdir(path, handler);
        return subject;
    }
    static mkdir(path, mode) {
        let subject = new rxjs_1.Subject();
        let handler = function (err) {
            if (err) {
                subject.error(err);
            }
            else {
                subject.next(undefined);
                subject.complete();
            }
        };
        fs.mkdir(path, mode, handler);
        return subject;
    }
    static readdir(path) {
        let subject = new rxjs_1.Subject();
        let handler = function (err, files) {
            if (err) {
                subject.error(err);
            }
            else {
                subject.next(files);
                subject.complete();
            }
        };
        fs.readdir(path, handler);
        return subject;
    }
    static close(fd) {
        let subject = new rxjs_1.Subject();
        let handler = function (err) {
            if (err) {
                subject.error(err);
            }
            else {
                subject.next(undefined);
                subject.complete();
            }
        };
        fs.close(fd, handler);
        return subject;
    }
    static open(path, flags, mode) {
        let subject = new rxjs_1.Subject();
        let handler = function (err, fd) {
            if (err) {
                subject.error(err);
            }
            else {
                subject.next(fd);
                subject.complete();
            }
        };
        fs.open(path, flags, mode, handler);
        return subject;
    }
    static write(fd, buffer, offset, length, position) {
        let subject = new rxjs_1.Subject();
        let handler = function (err, bytesWritten, innerBuffer) {
            if (err) {
                subject.error(err);
            }
            else {
                subject.next({ bytesWritten: bytesWritten, buffer: innerBuffer });
                subject.complete();
            }
        };
        fs.write(fd, buffer, offset, length, position, handler);
        return subject;
    }
    static read(fd, buffer, offset, length, position) {
        let subject = new rxjs_1.Subject();
        let handler = function (err, bytesRead, innerBuffer) {
            if (err) {
                subject.error(err);
            }
            else {
                subject.next({ bytesRead: bytesRead, buffer: innerBuffer });
                subject.complete();
            }
        };
        fs.read(fd, buffer, offset, length, position, handler);
        return subject;
    }
    static readFile(fileName, encoding) {
        let subject = new rxjs_1.Subject();
        let handler = function (err, data) {
            if (err) {
                subject.error(err);
            }
            else {
                subject.next(data);
                subject.complete();
            }
        };
        fs.readFile(fileName, encoding, handler);
        return subject;
    }
    static writeFile(fileName, data, options) {
        let subject = new rxjs_1.Subject();
        let handler = function (err) {
            if (err) {
                subject.error(err);
            }
            else {
                subject.next(undefined);
                subject.complete();
            }
        };
        fs.writeFile(fileName, data, options, handler);
        return subject;
    }
    static watch(filename, options) {
        let subject = new rxjs_1.Subject();
        let handler = function (event, filename) {
            subject.next({ event: event, filename: filename });
        };
        fs.watch(filename, options, handler);
        return subject;
    }
    static watchFile(filename, options) {
        let subject = new rxjs_1.Subject();
        let handler = function (curr, prev) {
            subject.next({ curr: curr, prev: prev });
        };
        fs.watchFile(filename, options, handler);
        return subject;
    }
    static createObservableReadStream(path, options) {
        let stream = fs.createReadStream(path, options);
        return RxFs.fromReadableStream(stream);
    }
    static createObservableLineReader(path) {
        let subject = new rxjs_1.Subject();
        let stream = fs.createReadStream(path);
        stream.pause();
        stream.on('error', function (err) {
            subject.error(err);
        });
        let lineReader = require('readline').createInterface({
            input: stream,
            terminal: false
        }).on('line', function (line) {
            subject.next(line);
        }).on('close', function () {
            subject.complete();
        });
        stream.resume();
        return subject;
    }
    static fromReadableStream(stream) {
        stream.pause();
        return rxjs_1.Observable.create(function (subscriber) {
            function dataHandler(data) {
                subscriber.next(data);
            }
            function errorHandler(err) {
                subscriber.error(err);
            }
            function endHandler() {
                subscriber.complete();
            }
            stream.addListener('data', dataHandler);
            stream.addListener('error', errorHandler);
            stream.addListener('end', endHandler);
            stream.resume();
            return function () {
                stream.removeListener('data', dataHandler);
                stream.removeListener('error', errorHandler);
                stream.removeListener('end', endHandler);
            };
        }).publish().refCount();
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RxFs;
//# sourceMappingURL=rxify-fs.js.map