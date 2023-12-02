'use client';
import {Button} from '~/components/ui/button';
import {useState} from 'react';
import CreateCollectionSidebar from '~/components/CreateCollectionSidebar';

export default function CreateCollectionButton() {

  const [open, setOpen] = useState(false);

  const handleOpen = (open: boolean) => setOpen(open);

  return (
    <>
      <Button variant='outline' className='w-full' onClick={() => setOpen(true)}><span
        className='bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent font-semibold'>Create collection</span></Button>

      <CreateCollectionSidebar open={open} onOpenChange={handleOpen}/>
    </>
  );
}