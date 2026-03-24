"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";
import { StatusBar } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  React.useEffect(() => {
    // Tự động hiển thị thanh Status Bar của hệ điều hành trên app
    if (Capacitor.isNativePlatform()) {
      import('@capacitor/status-bar').then(({ StatusBar, Style }) => {
        StatusBar.show().catch(console.error);
      });
    }
  }, []);

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
