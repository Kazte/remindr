'use client';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '~/components/ui/card';
import {Label} from '~/components/ui/label';
import {Input} from '~/components/ui/input';
import {Button} from '~/components/ui/button';

export default function RegisterCard() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const userData = JSON.stringify({
      username: data.get('username'),
      email: data.get('email'),
      password: data.get('password'),
    });

    fetch('/api/auth/register', {
      method: 'POST',
      body: userData,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(responseData => {
        console.log(responseData);
      }).catch(err => {
      console.log('error register', err.message);
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

          <Button type='submit'>Register</Button>
        </form>
      </CardContent>

    </Card>
  );
}