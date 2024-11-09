'use client';

import { XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSearchPatient } from '../_hooks/use-search-patient';

export const PatientSearchBar = () => {
  const {
    actions: { handleSetSearchQueryParam },
    states: { searchValue },
  } = useSearchPatient();

  const hasSearch = !!searchValue;

  return (
    <Input
      defaultValue={searchValue}
      className="flex-1"
      onChange={(e) => handleSetSearchQueryParam(e.target.value)}
      endAdornment={
        <div className="flex items-center gap-2">
          {hasSearch ? <Button
              onClick={() => handleSetSearchQueryParam(null)}
              type="button"
              variant="ghost"
              size="icon"
              className="size-8"
            >
              <XIcon className="size-4" />
            </Button> : null}
        </div>
      }
      placeholder="Search patients..."
    />
  );
};
