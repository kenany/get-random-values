declare module 'global/window' {
  interface GlobalWindow extends Window {
    msCrypto?: Crypto
  }
  const globalWindow: GlobalWindow;
  export = globalWindow;
}
