'use client';

import {Task} from '@prisma/client';
import {Checkbox} from './ui/checkbox';
import {cn} from '~/libs/utils';
import {useTransition} from 'react';
import {useRouter} from 'next/navigation';
import {format} from 'date-fns';

interface Props {
  task: Task;
}

function getExpirationColor(expires_at: Date) {
  const days = Math.floor(expires_at.getTime() - Date.now()) / 1000 / 60 / 60;

  if (days < 0) return 'text-gray-500 dark:text-gray-400';

  if (days <= 3 * 24) return 'text-red-500 dark:text-red-400';
  if (days <= 7 * 24) return 'text-orange-500 dark:text-orange-400';
  return 'text-green-500 dark:text-green-400';
}

export default function TaskCard({task}: Props) {
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();

  const handleOnCheckedChange = (checked: boolean) => {
    startTransition(async () => {
      await fetch('/api/task', {
        method: 'PATCH',
        body: JSON.stringify({
          id: task.id,
          done: checked
        })
      });

      router.refresh();
    });
  };

  return (
    <div className='flex gap-3 items-start w-full '>
      <Checkbox
        disabled={isLoading}
        id={task.id.toString()}
        className='w-5 h-5'
        checked={task.done}
        onCheckedChange={handleOnCheckedChange}
      />
      <label
        htmlFor={task.id.toString()}
        className={cn(
          'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 decoration-1 dark:decoration-white w-full cursor-pointer',
          task.done && 'line-through'
        )}
      >
        {task.content}
        {task.expires_at && (
          <p
            className={cn(
              'text-xs text-neutral-500 dark:text-neutral-400 mt-1',
              getExpirationColor(task.expires_at)
            )}
          >
            {format(task.expires_at, 'dd/MM/yyyy')}
          </p>
        )}
      </label>
    </div>
  );
}
