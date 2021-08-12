import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.jobandcare.app',
  appName: 'jobandcare',
  webDir: 'dist/jobandcare',
  bundledWebRuntime: false,
  "server": {
    "allowNavigation": [
      "locker.sagesof.com",
      "jobandcare.com",
      "*.jobandcare.com",
      "pay.payphonetodoesposible.com",
      "*.pay.payphonetodoesposible.com"
    ]
  }
};

export default config;
