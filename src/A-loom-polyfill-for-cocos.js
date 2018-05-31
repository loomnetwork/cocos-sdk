
import googleProtobuf from './google-protobuf'

"use strict";

(function() {
    console.log(this);
    if ('undefined' == typeof window.crypto) {
        window.crypto = {};
        window.crypto.getRandomValues = function(arr) {
            for (var i = 0; i < arr.length; i++) {
                /*
                 * TODO: use a beeter random, maybe can set custom seed or something.
                 *
                 */                     
                arr[i] = Math.round(cc.random0To1() * 255);
            }
            return arr;
        }
    }
    window['google-protobuf'] = googleProtobuf;
})();


/*
const crypto = {}
crypto.randomBytes = function(n) {
    var arr = new Uint8Array(n);
    for (var i = 0; i < arr.length; i++) {
        arr[i] = Math.round(cc.random0To1() * 255);
    }

    return v;
}
*/


