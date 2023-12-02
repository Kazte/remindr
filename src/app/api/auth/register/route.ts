import {NextRequest, NextResponse} from 'next/server';
import prisma from '~/libs/prisma';
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    let userFound = await prisma.user.findUnique({
      where: {
        email: data.email
      }
    });

    if (userFound) {
      return NextResponse.json(
        {
          message: 'Email Already Exists'
        },
        {status: 400}
      );
    }

    userFound = await prisma.user.findUnique({
      where: {
        username: data.username
      }
    });

    if (userFound) {
      return NextResponse.json(
        {
          message: 'Username Already Exists'
        },
        {status: 400}
      );
    }

    data.password = await bcrypt.hash(data.password, 12);

    const newUser = await prisma.user.create({
      data
    });

    return NextResponse.json({
      username: newUser.username,
      email: newUser.email
    });
  } catch (error: any) {
    return NextResponse.json({message: error.message}, {status: 500});
  }
}