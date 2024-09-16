import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryState } from 'nuqs';
import { type SubmitHandler, useForm } from 'react-hook-form';
import {
  type SetNameSearchParamSchema,
  setNameSearchParamSchema,
} from '@/features/patients';

export const useSearchPatient = () => {
  const [name, setName] = useQueryState('search-by-name', {
    defaultValue: '',
  });

  const form = useForm<SetNameSearchParamSchema>({
    resolver: zodResolver(setNameSearchParamSchema),
    defaultValues: {
      name,
    },
  });

  const handleSetNameSearchParam: SubmitHandler<
    SetNameSearchParamSchema
  > = async (formData) => {
    await setName(formData.name);
  };

  return {
    states: {
      form,
    },
    actions: {
      handleSetNameSearchParam: form.handleSubmit(handleSetNameSearchParam),
    },
  };
};
