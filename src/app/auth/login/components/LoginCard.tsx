'use client';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '~/components/ui/card';
import {Label} from '~/components/ui/label';
import {Input} from '~/components/ui/input';
import {Button} from '~/components/ui/button';
import {signIn} from 'next-auth/react';
import {useRouter} from 'next/navigation';

export default function LoginCard() {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const userData = {
      username: data.get('username'),
      password: data.get('password'),
      redirect: false
    };


    try {
      const res = await signIn('credentials', userData);

      router.push('/dashboard');
      router.refresh();
    } catch (e) {
      // @ts-ignore
      console.log(e.message);
    }
  };

  return (
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle className='text-2xl'>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-1'>
            <Label htmlFor='username'>Username</Label>
            <Input id='username' name='username' placeholder='Your Username...'/>
          </div>
          <div className='flex flex-col gap-1'>
            <Label htmlFor='password'>Password</Label>
            <Input id='password' name='password' type='password' placeholder='************'/>
          </div>

          <Button type='submit'>Login</Button>
        </form>
      </CardContent>

    </Card>
  );
}