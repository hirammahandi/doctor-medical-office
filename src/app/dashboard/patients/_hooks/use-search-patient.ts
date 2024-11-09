import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useRef } from 'react';
import { PatientQueryParams } from '@/features/patients';

export const useSearchPatient = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const timer = useRef<NodeJS.Timeout | null>(null);

  const searchValue = searchParams.get(PatientQueryParams.SEARCH) ?? '';

  const handleSetSearchQueryParam = (search: string | null) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      const queryParams = new URLSearchParams(searchParams);
      if (search) {
        queryParams.set(PatientQueryParams.SEARCH, search);
      } else {
        queryParams.delete(PatientQueryParams.SEARCH);
      }
      router.replace(`${pathname}?${queryParams.toString()}`);
    }, 500);
  };

  return {
    states: {
      searchValue,
    },
    actions: {
      handleSetSearchQueryParam,
    },
  };
};
