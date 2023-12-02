import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '~/components/ui/card';
import {Label} from '~/components/ui/label';
import {Input} from '~/components/ui/input';
import {ReactNode} from 'react';
import {SelectContent, SelectItem, SelectTrigger, SelectValue} from '~/components/ui/select';
import {Button} from '~/components/ui/button';
import RegisterCard from '~/app/auth/register/components/RegisterCard';

function Select(props: { children: ReactNode }) {
  return null;
}

export default function RegisterPage() {
  return (
    <RegisterCard/>
  );
}