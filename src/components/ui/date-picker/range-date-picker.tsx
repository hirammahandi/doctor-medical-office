'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { type DateRange } from 'react-day-picker';
import { type FC, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  type CalendarProps,
} from '@/components/ui/date-picker/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { DEFAULT_PLACEHOLDER } from './constants';

type RangeDatePickerProps = Omit<
  CalendarProps,
  'mode' | 'onSelect' | 'selected'
> & {
  placeholder?: string;
  defaultValue?: DateRange;
  onChange?: (date: DateRange | undefined) => void;
};

export const RangeDatePicker: FC<RangeDatePickerProps> = ({
  placeholder = DEFAULT_PLACEHOLDER,
  defaultValue,
  className,
  onChange,
  ...props
}) => {
  const [date, setDate] = useState<DateRange | undefined>(defaultValue);

  const handleChangeDate = (dateValue: DateRange | undefined) => {
    setDate(dateValue);
    onChange?.(dateValue);
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {!!date?.from && (
              <>
                {date.to ? (
                  <>
                    {format(date.from, 'LLL dd, y')} -{' '}
                    {format(date.to, 'LLL dd, y')}
                  </>
                ) : (
                  format(date.from, 'LLL dd, y')
                )}
              </>
            )}

            {!date?.from && <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            {...props}
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleChangeDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
