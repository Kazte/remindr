import {Avatar, AvatarFallback, AvatarImage} from '~/components/ui/avatar';
import ThemeSwitcher from '~/components/ThemeSwitcher';
import Link from 'next/link';
import AvatarNavBar from '~/components/AvatarNavBar';
import {getServerSession} from 'next-auth';
import {Button} from '~/components/ui/button';

export default async function NavBar() {

  const session = await getServerSession();


  if (!session){
    return (
      <nav className='flex items-center justify-between w-full h-[60px] p-4 px-8'>
        <Link href='/' className='text-2xl font-bold'>remindr.</Link>
        <div className='flex items-center gap-2'>
          <Link href='/auth/login'>
            <Button variant='outline'>
              Sign In
            </Button>
          </Link>
          <Link href='/auth/register'>
            <Button variant='secondary'>
              Sign Up
            </Button>
          </Link>
          <ThemeSwitcher/>
        </div>
      </nav>
    );
  }

  return (
    <nav className='flex items-center justify-between w-full h-[60px] p-4 px-8'>
      <Link href='/' className='text-2xl font-bold'>remindr.</Link>
      <div className='flex items-center gap-2'>
        <AvatarNavBar/>
        <ThemeSwitcher/>
      </div>
    </nav>
  );
}