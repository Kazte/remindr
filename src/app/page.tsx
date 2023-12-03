import {getServerSession} from 'next-auth';
import {wait} from '~/libs/wait';
import Link from 'next/link';
import {Button} from '~/components/ui/button';

export default async function Home() {
  const session = await getServerSession();
  const username = session?.user?.name;

  if (!username) {
    return (
      <div className='flex flex-col self-start justify-center items-center gap-6 w-full h-full flex-grow text-center'>
        <h1 className='text-4xl font-bold'>Welcome to remindr.</h1>
        <h2 className='text-3xl text-center font-semibold'>
          You can save reminders and set an expiration date for them.
        </h2>
        <h2 className='text-3xl text-center font-semibold'>
          Don't forget to complete them before the specified date 😿
        </h2>
        <div className='flex items-center justify-evenly gap-2 max-w-[560px]'>
          <Link href='/auth/login' className='w-full'>
            <Button variant='outline' className='w-full'>
              Sign In
            </Button>
          </Link>
          <Link href='/auth/register' className='w-full'>
            <Button variant='secondary' className='w-full'>
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col justify-start items-center gap-3 w-full h-full flex-grow'>
      <h1 className='text-4xl font-bold'>Welcome back, {username}</h1>
      <Button asChild>
        <Link href='/dashboard'>Go to your Dashboard</Link>
      </Button>
    </div>
  );
}
