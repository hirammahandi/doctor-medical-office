'use client';

import { SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useSearchPatient } from '../_hooks/use-search-patient';

export const PatientSearchBar = () => {
  const {
    actions: { handleSetNameSearchParam },
    states: { form },
  } = useSearchPatient();

  return (
    <Form {...form}>
      <form onSubmit={handleSetNameSearchParam} className="flex-1">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  endAdornment={
                    <Button
                      type="submit"
                      variant="ghost"
                      size="icon"
                      className="size-8"
                    >
                      <SearchIcon className="size-4" />
                    </Button>
                  }
                  placeholder="Search patients by name..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
