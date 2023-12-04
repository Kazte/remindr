import CredentialProvider from 'next-auth/providers/credentials';
import prisma from '~/libs/prisma';
import bcrypt from 'bcrypt';


export default CredentialProvider({
  name: 'Credentials',
  credentials: {
    username: {label: 'Email', type: 'email', placeholder: 'email'},
    password: {
      label: 'Password',
      type: 'password',
      placeholder: 'password'
    }
  },
  async authorize(credentials: any) {
    const userFound = await prisma.user.findUnique({
      where: {
        email: credentials?.email
      }
    });

    if (!userFound) throw new Error('User not found!');

    const passwordMatch = bcrypt.compare(
      credentials?.password,
      userFound?.password!
    );

    if (!passwordMatch) throw new Error('Invalid Credentials');

    return {
      id: userFound.id,
      email: userFound.email,
      name: userFound.username
    };
  }
});