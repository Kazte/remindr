import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '~/app/api/auth/[...nextauth]/route';
import prisma from '~/libs/prisma';

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ data: null }, { status: 400 });
  }

  const collections = await prisma.collection.findMany({
    where: {
      user: {
        username: session?.user?.name!
      }
    },
    include: {
      tasks: true
    }
  });

  console.log('get collections', collections);

  return NextResponse.json({ data: collections });
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ data: null }, { status: 400 });
  }

  const data = await request.json();

  console.log('session', session);

  const newCollection = await prisma.collection.create({
    data: {
      name: data.name,
      color: data.color,
      user: {
        connect: {
          username: session?.user?.name!
        }
      }
    }
  });

  return NextResponse.json({ message: 'ok' });
}
