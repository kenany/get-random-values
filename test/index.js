const test = require('tape');
const isFunction = require('lodash.isfunction');
const isBrowser = require('is-browser');

const getRandomValues = require('../');

test('exports a function', function(t) {
  t.plan(1);
  t.ok(isFunction(getRandomValues));
});

test('does not cast buffer', function(t) {
  // eslint-disable-next-line max-len
  /** @type {readonly (Uint8ArrayConstructor | Int8ArrayConstructor | Int16ArrayConstructor | Uint16ArrayConstructor | Int32ArrayConstructor | Uint32ArrayConstructor)[]} */
  let TYPES = [
    Uint8Array
  ];

  if (isBrowser) {
    TYPES = [
      ...TYPES,
      Int8Array,
      Int16Array,
      Uint16Array,
      Int32Array,
      Uint32Array
    ];
  }

  t.plan(TYPES.length * 3);

  for (const Type of TYPES) {
    const buf = new Type(8);
    t.doesNotThrow(function() {
      getRandomValues(buf);
    });
    t.equal(buf.constructor, Type);
    t.equal(buf.length, 8);
  }
});

test('throws on length >65536', function(t) {
  t.plan(1);
  t.throws(function() {
    getRandomValues(new Uint8Array(65537));
  }, /QuotaExceededError/);
});

test('returns argument', function(t) {
  t.plan(1);
  const argument = new Uint8Array(1024);
  t.equal(getRandomValues(argument), argument);
});
