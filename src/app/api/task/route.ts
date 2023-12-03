import {getServerSession} from 'next-auth';
import {NextRequest, NextResponse} from 'next/server';
import prisma from '~/libs/prisma';
import {authOptions} from '../auth/[...nextauth]/route';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({data: null}, {status: 400});
  }

  const data = await request.json();

  const newTask = await prisma.task.create({
    data: {
      content: data.content,
      expires_at: data.expires_at,
      Collection: {
        connect: {
          id: data.collectionId
        }
      }
    }
  });

  return NextResponse.json({message: 'ok'});
}

export async function PATCH(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({data: null}, {status: 400});
  }

  const data = await request.json();

  await prisma.task.update({
    where: {id: data.id},
    data: {
      done: data.done
    }
  });

  return NextResponse.json({message: 'ok'});
}
