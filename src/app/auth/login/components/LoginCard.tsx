'use client';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '~/components/ui/card';
import {Label} from '~/components/ui/label';
import {Input} from '~/components/ui/input';
import {Button} from '~/components/ui/button';
import {signIn} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import {Separator} from '~/components/ui/separator';
import {DiscordLogoIcon, GitHubLogoIcon, ReloadIcon} from '@radix-ui/react-icons';
import {useTransition} from 'react';

export default function LoginCard() {
  const router = useRouter();

  const [isLoading, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      const data = new FormData(e.currentTarget);

      const userData = {
        username: data.get('username'),
        password: data.get('password'),
        redirect: false
      };


      try {
        await signIn('credentials', userData);

        router.push('/dashboard');
        router.refresh();
      } catch (e) {
        // @ts-ignore
        console.log(e.message);
      }
    });

  };

  return (
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle className='text-2xl'>Login</CardTitle>
        <CardDescription>Enter your email to create your account</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        <div className='flex flex-row flex-wrap justify-evenly gap-6'>
          <Button variant='outline' className='w-[calc(50%-1.5rem)]' onClick={async () => {
            startTransition(async () => {
              await signIn('github', {callbackUrl: '/dashboard'});
            });
          }}>
            <GitHubLogoIcon className='mr-2 h-4 w-4'/>
            Github
          </Button>
          <Button variant='outline' className='w-[calc(50%-1.5rem)]' onClick={async () => {
            startTransition(async () => {
              await signIn('discord', {callbackUrl: '/dashboard'});
            });
          }}>
            <DiscordLogoIcon className='mr-2 h-4 w-4'/>
            Discord
          </Button>
        </div>
        <Separator content='OR CONTINUE WITH'/>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-1'>
            <Label htmlFor='username'>Username</Label>
            <Input id='username' name='username' placeholder='Your Username...'/>
          </div>
          <div className='flex flex-col gap-1'>
            <Label htmlFor='password'>Password</Label>
            <Input id='password' name='password' type='password' placeholder='************'/>
          </div>

          <Button disabled={isLoading} type='submit'>Login {isLoading && (
            <ReloadIcon className='ml-2 h-4 w-4 animate-spin'/>
          )}</Button>
        </form>
      </CardContent>

    </Card>
  );
}