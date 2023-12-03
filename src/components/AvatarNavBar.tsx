'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem
} from '~/components/ui/dropdown-menu';
import {Avatar, AvatarFallback, AvatarImage} from '~/components/ui/avatar';
import {getSession, signOut, useSession} from 'next-auth/react';
import {Button} from './ui/button';
import ISession from '~/common/interfaces/user.interface';
import Link from 'next/link';
import {cn} from '~/libs/utils';

export default function AvatarNavBar({user}: {
  user: ISession
}) {

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={`${user.image}`}/>
          <AvatarFallback>{user.name[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator/>
        <DropdownMenuGroup>
          <DropdownMenuItem asChild className='cursor-pointer'>
            <Link href='/dashboard'>
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className='cursor-pointer'>
            <Link href='/settings'>
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>Billing</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator/>
        <DropdownMenuItem
          className={cn('cursor-pointer text-red-500 hover:text-blue-500')}
          onClick={handleSignOut}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
