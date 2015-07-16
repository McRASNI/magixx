/**
 * Created by ofir on 02/05/15.
 */
angular.module('magix.services.sessionService',[])
    .service('sessionService', function() {
        this.scopes = [];
        this.setStorage = function(key, value) {
            var scope, _i, _len, _ref;
            _ref = this.scopes;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                scope = _ref[_i];
                scope[key] = value;
            }
            value = value === void 0 ? null : JSON.stringify(value);
            return sessionStorage.setItem(key, value);
        };

        this.getStorage = function(key) {
            var sessionValue;
            sessionValue = sessionStorage.getItem(key);
            if (sessionValue === "undefined") {
                return null;
            }
            return JSON.parse(sessionValue);
        };

        this.register = function(scope) {
            var key, value;
            for (key in sessionStorage) {
                value = sessionStorage[key];
                scope[key] = (value != null) && value !== "undefined" ? JSON.parse(value) : null;
            }
            this.scopes.push(scope);
            return scope.$on('$destroy', (function(_this) {
                return function() {
                    return _this.scopes = _this.scopes.filter(function(s) {
                        return s.$id !== scope.$id;
                    });
                };
            })(this));
        };

        this.clear = function() {
            var key, _results;
            _results = [];
            for (key in sessionStorage) {
                _results.push(this.setStorage(key, null));
            }
            return _results;
        };
        this.accessor = function(name, value) {
            if (value == null) {
                return this.getStorage(name);
            }
            return this.setStorage(name, value);
        };
    });