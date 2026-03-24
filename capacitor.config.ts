import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.tieuhongtuyen.sieutrinho',
  appName: 'Siêu Trí Nhớ',
  webDir: 'out',
  plugins: {
    StatusBar: {
      overlaysWebView: false,
    },
    GoogleAuth: {
      // Web Client ID (OAuth 2.0 client_type: 3) từ google-services.json
      clientId: '511576421453-bc6db0mb9a6i19rk53k7qr18t3tlb9s1.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
      serverClientId: '511576421453-bc6db0mb9a6i19rk53k7qr18t3tlb9s1.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
  }
};

export default config;
