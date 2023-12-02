import CredentialProvider from 'next-auth/providers/credentials';
import prisma from '~/libs/prisma';
import bcrypt from 'bcrypt';


export default CredentialProvider({
  name: 'Credentials',
  credentials: {
    username: {label: 'Username', type: 'text', placeholder: 'username'},
    password: {
      label: 'Password',
      type: 'password',
      placeholder: 'password'
    }
  },
  async authorize(credentials: any, _req) {
    const userFound = await prisma.user.findUnique({
      where: {username: credentials?.username}
    });

    if (!userFound) throw new Error('User not found!');

    const passwordMatch = await bcrypt.compare(
      credentials?.password,
      userFound.password
    );

    if (!passwordMatch) throw new Error('Invalid Credentials');

    return {
      id: userFound.id,
      email: userFound.email,
      name: userFound.username
    };
  }
});