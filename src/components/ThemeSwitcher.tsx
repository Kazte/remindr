'use client';
import {useTheme} from 'next-themes';
import {useEffect, useState} from 'react';
import {Tabs, TabsList, TabsTrigger} from '~/components/ui/tabs';
import {DesktopIcon, MoonIcon, SunIcon} from '@radix-ui/react-icons';

export default function ThemeSwitcher() {
  const {theme, setTheme} = useTheme();
  const [mounted, setMounted] = useState(false);


  // Avoid hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return null;

  return (
    <Tabs defaultValue={theme} onValueChange={setTheme}>
      <TabsList className='border dark:border-neutral-800'>
        <TabsTrigger value='light'><SunIcon className='h-[1.2rem] w-[1.2rem]'/></TabsTrigger>
        <TabsTrigger value='dark'><MoonIcon className='h-[1.2rem] w-[1.2rem]'/></TabsTrigger>
        <TabsTrigger value='system'><DesktopIcon className='h-[1.2rem] w-[1.2rem]'/></TabsTrigger>
      </TabsList>
    </Tabs>
  );
}