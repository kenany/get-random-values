/// <reference types="node" />

declare module 'window-or-global' {
  declare const _: typeof globalThis &
    (typeof self | typeof global) & { msCrypto?: Crypto };
  export = _;
}
