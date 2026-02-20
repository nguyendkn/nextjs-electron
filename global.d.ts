// Global type declarations for the Electron API

interface ElectronAPI {
  platform: string;
  getAppVersion: () => Promise<string>;
  system: {
    getInfo: () => Promise<{
      cpu: { usage: number; cores: number };
      memory: { usage: number; total: number; used: number };
    }>;
  };
  updater: {
    check: () => Promise<any>;
    install: () => void;
    getStatus: () => Promise<any>;
  };
  ping: () => Promise<string>;
}

interface Window {
  electronAPI: ElectronAPI;
}
