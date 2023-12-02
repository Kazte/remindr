import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle} from '~/components/ui/sheet';
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from '~/components/ui/form';
import {useForm} from 'react-hook-form';
import {createCollectionSchema, createCollectionSchemaType} from '~/libs/schemas/createCollection';
import {zodResolver} from '@hookform/resolvers/zod';
import {Input} from '~/components/ui/input';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '~/components/ui/select';
import {CollectionColor, CollectionColors} from '~/libs/constants';
import {cn} from '~/libs/utils';
import {Separator} from '~/components/ui/separator';
import {Button} from '~/components/ui/button';
import {toast} from '~/components/ui/use-toast';
import {ReloadIcon} from '@radix-ui/react-icons';
import {useRouter} from 'next/navigation';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateCollectionSidebar({open, onOpenChange}: Props) {
  const form = useForm<createCollectionSchemaType>({
    defaultValues: {},
    resolver: zodResolver(createCollectionSchema)
  });

  const router = useRouter()

  const onSubmit = async (data: any) => {
    try {
      await fetch('/api/collection', {
        method: 'POST',
        body: JSON.stringify(data)
      });

      openChangeWrapper(false);

      router.refresh();

      toast({
        title: 'Success',
        description: 'Collection create successfully!',
        variant: 'destructive'
      });
    } catch (e) {
      // @ts-ignore
      console.log('error collection', e.message);
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again later.',
        variant: 'destructive'
      });
    }
  };


  const openChangeWrapper = (open: boolean) => {
    form.reset();
    onOpenChange(open);
  };

  return (
    <Sheet open={open} onOpenChange={openChangeWrapper}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add new collection</SheetTitle>
          <SheetDescription>Collection are a way to group your tasks</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={onSubmit} className='space-y-4 flex flex-col'>
            <FormField control={form.control} name='name' render={({field}) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='Personal' {...field}/>
                </FormControl>
                <FormDescription>Collection name</FormDescription>
                <FormMessage/>
              </FormItem>
            )}/>

            <FormField control={form.control} name='color' render={({field}) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <FormControl>
                  <Select onValueChange={(color) => field.onChange(color)}>
                    <SelectTrigger
                      className={cn('w-full h-8 text-white', CollectionColors[field.value as CollectionColor])}>
                      <SelectValue placeholder='Color' className='w-full h-8'/>
                    </SelectTrigger>
                    <SelectContent>
                      {
                        Object.keys(CollectionColors).map((color) => (
                          <SelectItem key={color} value={color} className={cn(
                            `w-full h-8 rounded-md my-1 text-white font-bold dark:focus:ring-gray-300 focus:ring-2 ring-neutral-600 focus:ring-inset cursor-pointer`,
                            CollectionColors[color as CollectionColor]
                          )}><span
                            className='drop-shadow-[0_2px_2px_rgba(0,0,0,1)]'>{color}</span></SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>Collection name</FormDescription>
                <FormMessage/>
              </FormItem>
            )}/>
          </form>
        </Form>
        <div className='flex flex-col gap-3 mt-4'>
          <Separator orientation='horizontal'/>
          <Button disabled={form.formState.isSubmitting}
                  onClick={form.handleSubmit(onSubmit)}>Confirm {form.formState.isSubmitting &&
            <ReloadIcon className='ml-2 h-4 w-4 animate-spin'/>}</Button>
        </div>
      </SheetContent>

    </Sheet>
  );
}