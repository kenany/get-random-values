const window = require('global/window');
const nodeCrypto = require('node:crypto');

/**
 * @template {ArrayBufferView<ArrayBufferLike>} T
 * @param {T} buf
 * @returns {T}
 */
function getRandomValues(buf) {
  if (window.crypto?.getRandomValues) {
    return window.crypto.getRandomValues(buf);
  }

  if (
    typeof window.msCrypto === 'object' &&
    typeof window.msCrypto.getRandomValues === 'function'
  ) {
    return window.msCrypto.getRandomValues(buf);
  }

  if (nodeCrypto.randomBytes) {
    if (!(buf instanceof Uint8Array)) {
      throw new TypeError('expected Uint8Array');
    }
    if (buf.length > 65_536) {
      const e = new Error(
        "Failed to execute 'getRandomValues' on 'Crypto': The " +
          "ArrayBufferView's byte length (" +
          buf.length +
          ') exceeds the ' +
          'number of bytes of entropy available via this API (65536).'
      );
      // @ts-expect-error
      e.code = 22;
      e.name = 'QuotaExceededError';
      throw e;
    }
    const bytes = nodeCrypto.randomBytes(buf.length);
    buf.set(bytes);
    return buf;
  }

  throw new Error('No secure random number generator available.');
}

module.exports = getRandomValues;
