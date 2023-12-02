'use client';
import ICollection from '~/common/interfaces/collection.interface';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from './ui/dialog';
import { AlertDialogFooter, AlertDialogHeader } from './ui/alert-dialog';
import { cn } from '~/libs/utils';
import { CollectionColors } from '~/libs/constants';
import { useForm } from 'react-hook-form';
import {
  createTaskSchema,
  createTaskSchemaType
} from '~/libs/schemas/createTask';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from './ui/form';
import { Textarea } from './ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';
import { Button } from './ui/button';
import { CalendarIcon, ReloadIcon } from '@radix-ui/react-icons';
import * as FormatDate from 'date-fns';
import Loader from './Loader';
import { toast } from './ui/use-toast';
import { useRouter } from 'next/navigation';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  collection: ICollection;
}

export default function CreateTaskDialog({ open, setOpen, collection }: Props) {
  const router = useRouter();

  const form = useForm<createTaskSchemaType>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      collectionId: collection.id
    }
  });

  const onSubmit = async (data: createTaskSchemaType) => {
    try {
      await fetch('/api/task', {
        method: 'POST',
        body: JSON.stringify(data)
      });

      toast({
        title: 'Success',
        description: 'Task created!'
      });

      openChangeWrapper(false);
      router.refresh();
    } catch (e) {
      toast({
        title: 'Error',
        description: 'Cannot create Task',
        variant: 'destructive'
      });
    }
  };

  const openChangeWrapper = (value: boolean) => {
    setOpen(value);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={openChangeWrapper}>
      <DialogContent className='sm:max-w-[425px]'>
        <AlertDialogHeader>
          <DialogTitle className='flex gap-2'>
            Add task to collection: <span>{collection.name}</span>
          </DialogTitle>
          <DialogDescription>Add a task to your collection.</DialogDescription>
        </AlertDialogHeader>
        <div>
          <Form {...form}>
            <form
              className='flex flex-col space-y-4'
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name='content'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={5}
                        placeholder='Task content...'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='expires_at'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expires At</FormLabel>
                    <FormDescription>
                      When should this task expires?
                    </FormDescription>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'justify-start text-left font-normal w-full',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            <CalendarIcon className='mr-2 h-4 w-4' />
                            {field.value ? (
                              <span>
                                {FormatDate.format(field.value, 'PPP')}
                              </span>
                            ) : (
                              <span>No Expiration</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <Calendar
                            mode='single'
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <AlertDialogFooter>
          <Button
            disabled={form.formState.isSubmitting}
            className='w-full'
            onClick={form.handleSubmit(onSubmit)}
          >
            Confirm
            {form.formState.isSubmitting && (
              <ReloadIcon className='animate-spin h-4 w-4 ml-2' />
            )}
          </Button>
        </AlertDialogFooter>
      </DialogContent>
    </Dialog>
  );
}
