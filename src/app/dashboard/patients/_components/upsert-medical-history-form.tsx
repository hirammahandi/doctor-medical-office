'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { type Patient } from '@prisma/client';
import { BookOpen } from 'lucide-react';
import { type FC, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  upsertMedicalHistorySchema,
  upsertPatientMedicalHistory,
  type UpsertMedicalHistorySchema,
} from '@/features/clinical-histories';
import { type GetPaginatedPatientsResult } from '@/features/patients';
import { contentData } from '@/lib/content-data';

type UpsertMedicalHistoryFormProps = {
  patientId: Patient['id'];
  medicalHistories?: GetPaginatedPatientsResult['patients'][number]['medicalHistories'];
};
export const UpsertMedicalHistoryForm: FC<UpsertMedicalHistoryFormProps> = ({
  patientId,
  medicalHistories,
}) => {
  const [openDialog, setOpenDialog] = useState(false);

  const form = useForm<UpsertMedicalHistorySchema>({
    defaultValues: { description: '' },
    resolver: zodResolver(upsertMedicalHistorySchema),
  });

  const isLoading = form.formState.isSubmitting;
  const errors = form.formState.errors;

  const handleOpenDialog = (open: boolean) => {
    if (isLoading) return;
    setOpenDialog(open);
  };

  const handleUpsertMedicalHistory: SubmitHandler<
    UpsertMedicalHistorySchema
  > = async (formData) => {
    const response = await upsertPatientMedicalHistory(patientId, formData);

    if (response?.error) {
      toast.error(response.error);
    } else {
      setOpenDialog(false);
      const successMessage = "Patient's medical history updated";
      toast.success(successMessage);
      form.reset();
    }
  };
  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip delayDuration={50}>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button size="icon">
                <BookOpen className="size-4" />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Medical History</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Patient Medical History</DialogTitle>
          <DialogDescription>
            Enter the details of the patient&apos;s medical history.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleUpsertMedicalHistory)}
          >
            {!!medicalHistories?.length && (
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        const description = medicalHistories.find(
                          (history) => history.id === value,
                        )?.description;

                        if (!description) return;

                        form.setValue('description', description);
                        form.setFocus('description');
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {medicalHistories.map((history) => (
                          <SelectItem key={history.id} value={history.id}>
                            {history.createdAt?.toDateString()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {contentData.globalContentData.labels.description}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={
                        contentData.globalContentData.placeholders.description
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" disabled={isLoading}>
                  Cancel
                </Button>
              </DialogClose>
              <Button isLoading={isLoading} type="submit">
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
