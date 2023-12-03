'use client';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '~/components/ui/card';
import {Label} from '~/components/ui/label';
import {Input} from '~/components/ui/input';
import {Button} from '~/components/ui/button';
import {useState, useTransition} from 'react';
import {ReloadIcon} from '@radix-ui/react-icons';
import {wait} from '~/libs/wait';

export default function RegisterCard() {

  const [isLoading, startTransition] = useTransition();
  const [error, setError] = useState();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const userData = JSON.stringify({
      username: data.get('username'),
      email: data.get('email'),
      password: data.get('password'),
    });
    startTransition(async () => {

      fetch('/api/auth/register', {
        method: 'POST',
        body: userData,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
        .then(responseData => {

          if (responseData.message) {
            setError(responseData.message);
          }

          console.log(responseData);
        }).catch(err => {
        console.log('error register', err.message);
      });
    });
  };


  return (
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle className='text-2xl'>Register</CardTitle>
      </CardHeader>
      <CardContent>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-1'>
            <Label htmlFor='username'>Username</Label>
            <Input id='username' name='username' placeholder='Your Username...'/>
          </div>
          <div className='flex flex-col gap-1'>
            <Label htmlFor='email'>Email</Label>
            <Input id='email' name='email' type='email' placeholder='Your Email...'/>
          </div>
          <div className='flex flex-col gap-1'>
            <Label htmlFor='password'>Password</Label>
            <Input id='password' name='password' type='password' placeholder='************'/>
          </div>
          <p className='text-sm text-red-600'>{error}</p>

          <Button disabled={isLoading} type='submit'>Register {isLoading && (
            <ReloadIcon className='ml-2 h-4 w-4 animate-spin'/>
          )}</Button>
        </form>
      </CardContent>
    </Card>
  );
};