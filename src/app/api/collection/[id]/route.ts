import {NextRequest, NextResponse} from 'next/server';
import {getServerSession} from 'next-auth';
import {authOptions} from '~/app/api/auth/[...nextauth]/route';
import prisma from '~/libs/prisma';

export async function DELETE(
  request: Request,
  {params}: { params: { id: number } }
) {
  const session = await getServerSession(authOptions);


  if (!params.id) {
    return NextResponse.json({data: null}, {status: 400});
  }

  if (!session) {
    return NextResponse.json({data: null}, {status: 400});
  }


  await prisma.collection.delete({
    where: {
      id: parseInt(params.id.toString())
    }
  });

  return NextResponse.json({message: 'ok'});
}