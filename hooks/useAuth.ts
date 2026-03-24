'use client';

import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User, signInWithCredential } from 'firebase/auth';

// Detect nếu đang chạy trong Capacitor (Android/iOS native app)
// Chạy an toàn cả trên server (SSR) lẫn browser
const isCapacitorNative = (): boolean => {
  if (typeof window === 'undefined') return false;
  return !!(window as Window & { Capacitor?: { isNativePlatform?: () => boolean } }).Capacitor?.isNativePlatform?.();
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    if (isCapacitorNative()) {
      // ---- ANDROID native: dùng plugin @codetrix-studio/capacitor-google-auth ----
      // Import động để tránh lỗi trên môi trường web (module không tồn tại)
      try {
        const { GoogleAuth } = await import('@codetrix-studio/capacitor-google-auth');
        await GoogleAuth.initialize({
          clientId: process.env.NEXT_PUBLIC_GOOGLE_WEB_CLIENT_ID || '',
          scopes: ['profile', 'email'],
          grantOfflineAccess: true,
        });
        const googleUser = await GoogleAuth.signIn();
        // Lấy idToken từ authentication object
        const idToken = googleUser?.authentication?.idToken;
        if (!idToken) throw new Error('Không nhận được idToken từ Google');
        // Tạo Firebase credential từ Google ID token
        const credential = GoogleAuthProvider.credential(idToken);
        await signInWithCredential(auth, credential);
      } catch (error) {
        console.error('Lỗi đăng nhập Google (Android):', error);
        alert('Đăng nhập bằng Google thất bại. Vui lòng thử lại!');
      }
    } else {
      // ---- WEB: dùng popup như cũ ----
      const provider = new GoogleAuthProvider();
      try {
        await signInWithPopup(auth, provider);
      } catch (error) {
        console.error('Lỗi đăng nhập:', error);
        alert('Đăng nhập bằng Google thất bại hoặc bị hủy. Vui lòng thử lại!');
      }
    }
  };

  const logout = async () => {
    try {
      // Đăng xuất khỏi Google plugin nếu đang trên Android
      if (isCapacitorNative()) {
        try {
          const { GoogleAuth } = await import('@codetrix-studio/capacitor-google-auth');
          await GoogleAuth.signOut();
        } catch {
          // Bỏ qua nếu plugin chưa init
        }
      }
      await signOut(auth);
    } catch (error) {
      console.error('Lỗi đăng xuất:', error);
    }
  };

  return { user, loading, loginWithGoogle, logout };
}
