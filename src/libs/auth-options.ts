import {AuthOptions} from 'next-auth';
import CredentialsProvider from '~/app/api/auth/[...nextauth]/(providers)/credentials.provider';
import DiscordProvider from '~/app/api/auth/[...nextauth]/(providers)/discord.provider';
import GithubProvider from '~/app/api/auth/[...nextauth]/(providers)/github.provider';
import prisma from '~/libs/prisma';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider,
    DiscordProvider,
    GithubProvider
  ],
  session: {
    strategy: 'jwt'
  },
  // adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/auth/login',
    error: '/auth/error'
  },
  callbacks: {
    async session({token, session}) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },
    async jwt({token, user}) {
      const dbUser = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!dbUser) {
        if (user) {
          token.id = user?.id;
        }
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.username,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
    // async signIn({profile}) {
    async signIn({user, account, profile}) {
      console.log('user', user);
      console.log('acc', account);
      console.log('profile', profile);

      if (account.provider === 'github') {
        user.username = profile.login;
      }

      if (account.provider === 'discord') {
        user.username = user.name;
      }

      try {
        const userFound = await prisma.user.findUnique({
          where: {
            email: user.email,
          }
        });

        if (userFound) {
          return true;
        }

        await prisma.user.create({
          data: {
            username: user.username,
            image: user.image,
            email: user.email
          }
        });

        return true;
      } catch (e) {
        console.log('error signin', e.message);
        return false;
      }
    }
  }
};