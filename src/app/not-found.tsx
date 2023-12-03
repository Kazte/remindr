import {Separator} from '~/components/ui/separator';
import {Button} from '~/components/ui/button';
import Link from 'next/link';

export default function NotFound () {
  return (
   <div className='flex flex-col self-center justify-center items-center gap-6 w-full'>
    <h1 className='text-4xl font-bold'>404 | Page not Found.</h1>
     <Link href='/'>
       <Button variant='link' className='text-2xl'>
         Back to Home
       </Button>
     </Link>
   </div>
  );
}