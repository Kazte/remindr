'use client';
import {Collection, Task} from '@prisma/client';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '~/components/ui/collapsible';
import {useMemo, useState} from 'react';
import {Button} from '~/components/ui/button';
import {cn} from '~/libs/utils';
import {CollectionColor, CollectionColors} from '~/libs/constants';
import {CaretDownIcon, CaretUpIcon} from '@radix-ui/react-icons';
import {Progress} from '~/components/ui/progress';
import {Separator} from '~/components/ui/separator';
import {MdAdd} from 'react-icons/md';
import {FiTrash} from 'react-icons/fi';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger
} from '~/components/ui/alert-dialog';
import {toast} from '~/components/ui/use-toast';
import {useRouter} from 'next/navigation';
import ICollection from '~/common/interfaces/collection.interface';
import CreateTaskDialog from './CreateTaskDialog';
import TaskCard from './TaskCard';

interface Props {
  collection: ICollection;
}

export default function CollectionCard({collection}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const [showCreateModal, setShowCreateModal] = useState(false);

  const removeCollection = async () => {
    try {
      await fetch(`/api/collection/${collection.id}`, {
        method: 'DELETE'
      });

      toast({
        title: 'Success',
        description: 'Collection deleted successfully!'
      });

      router.refresh();
    } catch (e: any) {
      console.log(e.message);
      toast({
        title: 'Error',
        description: 'Something went wrong.',
        variant: 'destructive'
      });
    }
  };

  const totalTasks = collection.tasks.length;
  const tasksDone = useMemo(() => {
    return collection.tasks.filter((x) => x.done).length;
  }, [collection.tasks]);

  const progress =
    collection.tasks.length === 0 ? 0 : (tasksDone / totalTasks) * 100;

  return (
    <>
      <CreateTaskDialog
        open={showCreateModal}
        setOpen={setShowCreateModal}
        collection={collection}
      />

      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className='transition'
      >
        <CollapsibleTrigger asChild>
          <Button
            variant='ghost'
            className={cn(
              'flex w-full justify-between p-6 relative overflow-hidden',
              isOpen && 'rounded-b-none',
              CollectionColors[collection.color as CollectionColor]
            )}
          >
            <span className='drop-shadow-[0_2px_2px_rgba(0,0,0,1)] font-bold text-white'>
              {collection.name}
            </span>
            {isOpen ? (
              <CaretUpIcon className='h-6 w-6 drop-shadow-[0_2px_2px_rgba(0,0,0,1)] text-white'/>
            ) : (
              <CaretDownIcon className='h-6 w-6 drop-shadow-[0_2px_2px_rgba(0,0,0,1)] text-white'/>
            )}
            <Progress className='rounded-none absolute w-full bottom-0 left-0' value={progress}/>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className='flex flex-col rounded-b-md dark:bg-neutral-900 shadow-lg'>
          {collection.tasks.length <= 0 ? (
            <Button
              variant={'ghost'}
              className='flex flex-col justify-center items-center gap-1 p-8 py-12 rounded-none'
              onClick={() => setShowCreateModal(true)}
            >
              <p>There are no task created yet...</p>
              <span className='text-sm'>Create one</span>
            </Button>
          ) : (
            <>
              <div className='p-4 gap-3 flex flex-col'>
                {collection.tasks
                  .sort((a, b) => {
                    return a.id > b.id ? 1 : -1;
                  })
                  .map((task) => (
                    <TaskCard key={task.id} task={task}/>
                  ))}
              </div>
            </>
          )}
          <Separator/>
          <footer className='h-[40px] px-4 p-[2px] text-xs text-neutral-500 flex justify-between items-center'>
            <p>
              Created at {collection.created_at.toLocaleDateString('en-Us')}
            </p>
            <div>
              <Button
                size='icon'
                variant='ghost'
                onClick={() => setShowCreateModal(true)}
              >
                <MdAdd/>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button size='icon' variant='ghost'>
                    <FiTrash/>
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
    </>
  );
}
