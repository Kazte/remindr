import { getServerSession } from 'next-auth';
import prisma from '~/libs/prisma';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import CreateCollectionButton from '~/components/CreateCollectionButton';
import CollectionCard from '~/components/CollectionCard';

export default async function DashboardPage() {
  const session = await getServerSession();
  const username = session?.user?.name;

  const collections = await prisma.collection.findMany({
    where: {
      user: { username: username! }
    },
    include: {
      tasks: true
    }
  });

  if (collections.length === 0) {
    return (
      <div className='flex flex-col gap-5 w-full'>
        <CreateCollectionButton />
        <Alert>
          <AlertTitle>There are no collections</AlertTitle>
          <AlertDescription>
            Create a new collection to get started!!
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <>
      <CreateCollectionButton />
      <div className='flex flex-col gap-4 mt-6'>
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
    </>
  );
}
