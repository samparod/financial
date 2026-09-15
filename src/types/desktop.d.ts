export {};

declare global {
  interface Window {
    istiqrar?: {
      load: () => Promise<unknown>;
      save: (data: unknown) => Promise<void>;
      dataDir: () => Promise<string>;
    };
  }
}
