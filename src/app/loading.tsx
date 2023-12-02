import Loader from '~/components/Loader';

export default function Loading() {
  return (
    <Loader loaded={false} message='Loading...'/>
  );
}