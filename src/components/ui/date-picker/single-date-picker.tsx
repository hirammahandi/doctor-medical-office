"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar, CalendarProps } from "@/components/ui/date-picker/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { FC, useState } from "react";
import { DEFAULT_PLACEHOLDER } from "./constants";

type SingleDatePickerProps = Omit<
  CalendarProps,
  "mode" | "onSelect" | "selected"
> & {
  placeholder?: string;
  defaultValue?: Date;
  onChange?: (date: Date | undefined) => void;
};

export const SingleDatePicker: FC<SingleDatePickerProps> = ({
  placeholder = DEFAULT_PLACEHOLDER,
  onChange,
  defaultValue,
  ...props
}) => {
  const [date, setDate] = useState<Date | undefined>(defaultValue);

  const handleChangeDate = (dateValue: Date | undefined) => {
    setDate(dateValue);
    onChange?.(dateValue);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          {...props}
          mode="single"
          selected={date}
          onSelect={handleChangeDate}
        />
      </PopoverContent>
    </Popover>
  );
};
