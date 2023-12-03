import Link from 'next/link';
import {Button} from '~/components/ui/button';

export default function ErrorPage({searchParams}: { searchParams: { error: string } }) {
  return (
    <div className='flex flex-col self-center justify-center items-center gap-6 w-full'>
      <h1 className='text-5xl font-bold'>Error Login</h1>
      <Link href='/'>
        <Button variant='link' className='text-2xl'>
          Back to Home
        </Button>
      </Link>
    </div>
  );
}