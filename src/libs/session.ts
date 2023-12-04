import {getServerSession} from 'next-auth';
import ISession from '~/common/interfaces/user.interface';
import {authOptions} from '~/libs/auth-options';

export async function getCurrentUser(): Promise<ISession> {
  const session = await getServerSession(authOptions);

  return session?.user as ISession;
}