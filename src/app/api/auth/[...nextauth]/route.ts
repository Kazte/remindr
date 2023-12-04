import NextAuth, {AuthOptions} from 'next-auth';
import CredentialsProvider from './(providers)/credentials.provider';
import prisma from '~/libs/prisma';
import DiscordProvider from '~/app/api/auth/[...nextauth]/(providers)/discord.provider';
import GithubProvider from '~/app/api/auth/[...nextauth]/(providers)/github.provider';
import {authOptions} from '~/libs/auth-options';


const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};
