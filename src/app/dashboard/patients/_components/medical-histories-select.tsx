'use client';

import { Check, ChevronsUpDown, XCircleIcon } from 'lucide-react';
import { type MouseEventHandler, useState, type ForwardedRef } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { FormControl } from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { SelectStyles } from '@/components/ui/select';
import { type GetPaginatedPatientsResult } from '@/features/patients';
import { cn } from '@/lib/utils';

type MedicalHistoriesSelectProps = {
  value: string | undefined;
  onChangeAction: (value: string) => void;
  setFocusAction: (field: 'id' | 'description') => void;
  setValueAction: (field: 'id' | 'description', value: string) => void;
  medicalHistories: GetPaginatedPatientsResult['patients'][number]['medicalHistories'];
};

const formatCreatedAt = (createdAt?: Date | null) => {
  return createdAt?.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const MedicalHistoriesSelect = ({
  medicalHistories,
  onChangeAction,
  setFocusAction: setFocus,
  setValueAction,
  value,
  ref,
}: MedicalHistoriesSelectProps & { ref: ForwardedRef<HTMLButtonElement> }) => {
  const [triggerWidth, setTriggerWidth] = useState(0);

  const handleSelectMedicalHistory = (
    history: MedicalHistoriesSelectProps['medicalHistories'][number],
  ) => {
    const previousValue = value;

    const newValue = previousValue === history.id ? '' : history.id;
    onChangeAction(newValue);

    const description = medicalHistories.find(
      ({ id }) => id === newValue,
    )?.description;

    setFocus('description');

    if (!description) {
      setValueAction('description', '');
    } else {
      setValueAction('description', description);
    }
  };

  const handleClearValue: MouseEventHandler<HTMLOrSVGElement> = (e) => {
    // TODO: Fix some error when the popup is open and use clear value event, after clear the value the popup is not closed
    e.stopPropagation();
    onChangeAction('');
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <div
            className={cn(
              SelectStyles,
              'flex items-center justify-between p-0 pr-3',
              !value && 'text-muted-foreground',
            )}
            ref={(el) => {
              (ref as (instance: HTMLDivElement | null) => void)(el);
              if (el) {
                setTriggerWidth(el.offsetWidth);
              }
            }}
          >
            <button className="flex-1 flex p-4 justify-start" type="button">
              {value
                ? formatCreatedAt(
                    medicalHistories.find((history) => history.id === value)
                      ?.createdAt,
                  )
                : 'Select medical history date'}
            </button>
            <div className="flex items-center justify-center gap-2">
              {!!value && (
                <XCircleIcon
                  className="cursor-pointer size-4 shrink-0 opacity-50 hover:opacity-100 transition-all"
                  onClick={handleClearValue}
                />
              )}
              <ChevronsUpDown className="cursor-pointer hover:opacity-100 size-4 shrink-0 opacity-50 transition-all" />
            </div>
          </div>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent
        className="p-0"
        style={{
          width: triggerWidth,
        }}
      >
        <Command>
          <CommandInput placeholder="Search language..." />
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {medicalHistories.map((history) => (
                <CommandItem
                  value={formatCreatedAt(history.createdAt)}
                  key={history.id}
                  onSelect={() => handleSelectMedicalHistory(history)}
                >
                  {formatCreatedAt(history.createdAt)}
                  <Check
                    className={cn(
                      'ml-auto',
                      history.id === value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
