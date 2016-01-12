var rxjs_1 = require('rxjs');
class RxJsNode {
    static fromCallbackFunc(fn) {
        return (...args) => {
            return new rxjs_1.Observable((subscriber) => {
                args.push((err, data) => {
                    if (err) {
                        subscriber.error(err);
                    }
                    else {
                        subscriber.next(data);
                    }
                });
                fn.apply(this, args);
            });
        };
    }
}
exports.RxJsNode = RxJsNode;
//# sourceMappingURL=rxify.js.map