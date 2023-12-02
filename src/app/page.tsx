import {getServerSession} from 'next-auth';
import {wait} from '~/libs/wait';
import Link from 'next/link';
import {Button} from '~/components/ui/button';

export default async function Home() {

  const session = await getServerSession();
  const username = session?.user?.name;

  if (!username) {
    return (<div>no username</div>);
  }

  return <div className='flex flex-col justify-center items-center gap-3'>
    <h1 className='text-4xl font-bold'>Welcome back, {username}</h1>
    <Button asChild>
      <Link href='/dashboard'>
        Go to your Dashboard
      </Link>
    </Button>
  </div>;
}
