import { Suspense } from 'react';
import { Loader } from '@/components/ui/loader';
import { PatientsContainer } from './_components/patients-container';
import { PatientsHeader } from './_components/patients-header';

type SearchParams = Promise<{ search?: string }>;

const PatientsPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  // @note to get the params and searchParams must be use async await. Refer https://nextjs.org/docs/messages/sync-dynamic-apis
  const { search } = await searchParams;

  return (
    <>
      <PatientsHeader key={search} />
      <div className="mx-auto w-full">
        <Suspense
          key={search}
          fallback={
            <Loader className="grid place-content-center min-h-[70dvh]" />
          }
        >
          <PatientsContainer search={search} />
        </Suspense>
      </div>
    </>
  );
};

export default PatientsPage;
