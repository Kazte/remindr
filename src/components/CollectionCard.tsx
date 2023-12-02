'use client';
import { Collection, Task } from '@prisma/client';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '~/components/ui/collapsible';
import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { cn } from '~/libs/utils';
import { CollectionColor, CollectionColors } from '~/libs/constants';
import { CaretDownIcon, CaretUpIcon } from '@radix-ui/react-icons';
import { Progress } from '~/components/ui/progress';
import { Separator } from '~/components/ui/separator';
import { MdAdd } from 'react-icons/md';
import { FiTrash } from 'react-icons/fi';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger
} from '~/components/ui/alert-dialog';
import { toast } from '~/components/ui/use-toast';
import { useRouter } from 'next/navigation';

interface Props {
  collection: Collection & {
    tasks: Task[];
  };
}

export default function CollectionCard({ collection }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const removeCollection = async () => {
    try {
      console.log(collection.id);
      await fetch(`/api/collection/${collection.id}`, {
        method: 'DELETE'
      });

      toast({
        title: 'Success',
        description: 'Collection deleted successfully!'
      });

      router.refresh();
    } catch (e) {
      console.log(e.message);
      toast({
        title: 'Error',
        description: 'Something went wrong.',
        variant: 'destructive'
      });
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant='ghost'
          className={cn(
            'flex w-full justify-between p-6',
            isOpen && 'rounded-b-none',
            CollectionColors[collection.color as CollectionColor]
          )}
        >
          <span className='drop-shadow-[0_2px_2px_rgba(0,0,0,1)] font-bold'>
            {collection.name}
          </span>
          {isOpen ? (
            <CaretUpIcon className='h-6 w-6 drop-shadow-[0_2px_2px_rgba(0,0,0,1)]' />
          ) : (
            <CaretDownIcon className='h-6 w-6 drop-shadow-[0_2px_2px_rgba(0,0,0,1)]' />
          )}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className='flex flex-col rounded-b-md dark:bg-neutral-900 shadow-lg'>
        {collection.tasks.length <= 0 ? (
          <div>No tasks</div>
        ) : (
          <>
            <Progress className='rounded-none' value={45} />
            <div className='p-4 gap-3 flex flex-col'>
              {collection.tasks.map((task) => (
                <div key={task.id}>{task.content}</div>
              ))}
            </div>
          </>
        )}
        <Separator />
        <footer className='h-[40px] px-4 p-[2px] text-xs text-neutral-500 flex justify-between items-center'>
          <p>Created at {collection.created_at.toLocaleDateString('en-Us')}</p>
          <div>
            <Button size='icon' variant='ghost'>
              <MdAdd />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger>
                <Button size='icon' variant='ghost'>
                  <FiTrash />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                Are you sure you want to delete the collection?
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={removeCollection}>
                    Proceed
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </footer>
      </CollapsibleContent>
    </Collapsible>
  );
}
