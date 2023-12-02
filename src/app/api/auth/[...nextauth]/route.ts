import NextAuth from 'next-auth';
import CredentialsProvider from './(providers)/credentials.provider';
import prisma from '~/libs/prisma';

export const authOptions = {
  providers: [
    CredentialsProvider
  ],
  pages: {
    signIn: '/auth/login'
  },
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};
