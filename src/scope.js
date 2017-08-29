"use strict";
var _ = require("lodash");

function Scope() {
    this.$$watchers = [];
}

//$scope.$watch('attr',function(newVal,oldVla,scope){});
Scope.prototype.$watch = function(watchFn, listenerFn, valueEq) {
    var self = this;
    var watcher = {
        watchFn: watchFn,
        listenerFn: listenerFn || function() {},
        valueEq: !!valueEq,
        last: initWatchVal
    };
    this.$$watchers.unshift(watcher);
    this.$$lastDirtyWatch = null;
    //destory watch in $$watchers
    return function() {
        var index = self.$$watchers.indexOf(watcher);
        if (index >= 0) {
            self.$$watchers.splice(index, 1);
            self.$$lastDirtyWatch = null;
        }
    };
};

Scope.prototype.$$digestOnece = function() {
    var self = this;
    var newValue, oldValue, dirty;
    _.forEachRight(this.$$watchers, function(watcher) {
        try {
            if (watcher) {
                newValue = watcher.watchFn(self);
                oldValue = watcher.last;
                if (!self.$$areEqual(newValue, oldValue, watcher.valueEq)) {
                    self.$$lastDirtyWatch = watcher;
                    watcher.last = (watcher.valueEq ? _.cloneDeep(newValue) : newValue);
                    watcher.listenerFn(newValue, (oldValue === initWatchVal ? newValue : oldValue), self);
                    dirty = true;

                } else if (self.$$lastDirtyWatch === watcher) {
                    return false;
                }
            }
        } catch (e) {
            console.log(e);
        }
    });
    return dirty;
};
Scope.prototype.$digest = function() {
    var ttl = 10;
    var dirty;
    this.$$lastDirtyWatch = null;
    do {
        dirty = this.$$digestOnece();
        if (dirty && !(ttl--)) {
            throw '10 digest iterations reached';
        }
    } while (dirty);
};

Scope.prototype.$$areEqual = function(newVal, oldVal, valueEq) {
    if (valueEq) {
        return _.isEqual(newVal, oldVal);
    } else {
        return newVal === oldVal || (typeof newVal === 'number' && typeof oldVal === 'number' &&
            isNaN(newVal) && isNaN(oldVal));
    }
};

function initWatchVal() {}


module.exports = Scope;