'use client';
import {PropsWithChildren} from 'react';
import {ThemeProvider as NextThemeProvider} from 'next-themes';

export default function Providers({children}: PropsWithChildren) {
  return (
    <NextThemeProvider attribute='class' enableSystem>
      {children}
    </NextThemeProvider>
  );
}