'use client';

import { type Patient } from '@prisma/client';
import { BookOpen } from 'lucide-react';
import { type FC } from 'react';
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { type GetPaginatedPatientsResult } from '@/features/patients';
import { contentData } from '@/lib/content-data';
import { useUpsertPatientMedicalHistoryAction } from '../_hooks/use-upsert-patient-medical-history-action';
import { MedicalHistoriesSelect } from './medical-histories-select';

type UpsertMedicalHistoryFormProps = {
  patientId: Patient['id'];
  medicalHistories?: GetPaginatedPatientsResult['patients'][number]['medicalHistories'];
};

export const UpsertMedicalHistoryForm: FC<UpsertMedicalHistoryFormProps> = ({
  patientId,
  medicalHistories,
}) => {
  const {
    actions: { handleOpenDialog, handleUpsertMedicalHistory },
    states: { form, isLoading, openDialog },
  } = useUpsertPatientMedicalHistoryAction({ patientId });

  return (
    <Dialog onOpenChange={handleOpenDialog} open={openDialog}>
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
          <form className="space-y-4" onSubmit={handleUpsertMedicalHistory}>
            {!!medicalHistories?.length && (
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Medical Histories Dates</FormLabel>
                    <MedicalHistoriesSelect
                      medicalHistories={medicalHistories}
                      onChangeAction={field.onChange}
                      setFocusAction={form.setFocus}
                      setValueAction={form.setValue}
                      value={field.value}
                      ref={field.ref}
                    />
                    <FormDescription>
                      If you want update a medical history, select one by its
                      date, if not you can set the description and a new medical
                      history record going to be created for this patient.
                    </FormDescription>
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
