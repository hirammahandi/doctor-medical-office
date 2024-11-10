import { Suspense } from 'react';
import { Loader } from '@/components/ui/loader';
import { type PatientsQueryParamSchema } from '@/features/patients';
import { PatientsContainer } from './_components/patients-container';
import { PatientsHeader } from './_components/patients-header';

type SearchParams = Promise<PatientsQueryParamSchema>;

const PatientsPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  // @note to get the params and searchParams must be use async await. Refer https://nextjs.org/docs/messages/sync-dynamic-apis
  const patientQueryParams = await searchParams;

  return (
    <>
      <PatientsHeader key={patientQueryParams.search} />
      <div className="mx-auto w-full">
        <Suspense
          key={`${patientQueryParams.search}-${patientQueryParams.page}`}
          fallback={
            <Loader className="grid place-content-center min-h-[70dvh]" />
          }
        >
          <PatientsContainer patientQueryParams={patientQueryParams} />
        </Suspense>
      </div>
    </>
  );
};

export default PatientsPage;
