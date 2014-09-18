var window = require('global/window');
var nodeCrypto = require('crypto');

function getRandomValues(buf) {
  if (window.crypto && window.crypto.getRandomValues) {
    window.crypto.getRandomValues(buf);
  }
  else if (typeof window.msCrypto === 'object' && typeof window.msCrypto.getRandomValues === 'function') {
    window.msCrypto.getRandomValues(buf);
  }
  else if (nodeCrypto.randomBytes) {
    if (buf.length > 65536) {
      var e = new Error();
      e.code = 22;
      e.message = 'Failed to execute \'getRandomValues\' on \'Crypto\': The ' +
        'ArrayBufferView\'s byte length (' + buf.length + ') exceeds the ' +
        'number of bytes of entropy available via this API (65536).';
      e.name = 'QuotaExceededError';
      throw e;
    }
    var bytes = nodeCrypto.randomBytes(buf.length);
    buf.set(bytes);
  }
  else {
    throw new Error('No secure random number generator available.');
  }
}

module.exports = getRandomValues;