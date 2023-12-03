import {getServerSession} from 'next-auth';
import {authOptions} from '~/app/api/auth/[...nextauth]/route';
import ISession from '~/common/interfaces/user.interface';

export async function getCurrentUser(): Promise<ISession> {
  // @ts-ignore
  const session = await getServerSession(authOptions);

  return session?.user as ISession;
}