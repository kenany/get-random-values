var getRandomValues = require('../');
var test = require('tape');
var isFunction = require('lodash.isfunction');
var forEach = require('lodash.foreach');
var isBrowser = require('is-browser');

test('exports a function', function(t) {
  t.plan(1);
  t.ok(isFunction(getRandomValues));
});

test('does not cast buffer', function(t) {
  var TYPES = [
    Uint8Array,
  ];

  if (isBrowser) {
    Array.prototype.push.apply(TYPES, [
      Int8Array,
      Int16Array,
      Uint16Array,
      Int32Array,
      Uint32Array
    ]);
  }

  t.plan(TYPES.length * 3);

  forEach(TYPES, function(Type) {
    var buf = new Type(8);
    t.doesNotThrow(function() {
      getRandomValues(buf);
    });
    t.equal(buf.constructor, Type);
    t.equal(buf.length, 8);
  })
});

test('throws on length >65536', function(t) {
  t.plan(1);
  t.throws(function() {
    getRandomValues(new Uint8Array(65537));
  }, new RegExp(/QuotaExceededError/));
});

test('returns arguemnt', function(t) {
  t.plan(1);
  var argument = new Uint8Array(1024);
  t.equal(getRandomValues(argument), argument);
});
