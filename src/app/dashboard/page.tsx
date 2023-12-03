import {getServerSession} from 'next-auth';
import db from '~/libs/prisma';
import {Alert, AlertDescription, AlertTitle} from '~/components/ui/alert';
import CreateCollectionButton from '~/components/CreateCollectionButton';
import CollectionCard from '~/components/CollectionCard';
import {getCurrentUser} from '~/libs/session';

export default async function DashboardPage() {
  const user = await getCurrentUser();

  const username = user?.name;

  const collections = await db.collection.findMany({
    where: {
      user: {email: user.email}
    },
    include: {
      tasks: true
    }
  });

  if (collections.length === 0) {
    return (
      <div className='flex flex-col gap-5 w-full'>
        <CreateCollectionButton/>
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
      <CreateCollectionButton/>
      <div className='flex flex-col gap-4 mt-6'>
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection}/>
        ))}
      </div>
    </>
  );
}
