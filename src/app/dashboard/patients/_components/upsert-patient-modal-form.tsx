'use client';

import { DialogClose, DialogTrigger } from '@radix-ui/react-dialog';
import { type Patient } from '@prisma/client';
import { type ReactNode, type FC } from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';
import { contentData } from '@/lib/content-data';
import { useUpsertPatientAction } from '../_hooks/use-upsert-patient-action';

type UpsertPatientModalFormProps = {
  patient?: Patient;
  buttonTrigger?: ReactNode;
  openOnCreateParam?: boolean;
};

export const UpsertPatientModalForm: FC<UpsertPatientModalFormProps> = ({
  patient,
  buttonTrigger,
  openOnCreateParam,
}) => {
  const {
    states: { form, isLoading, openDialog },
    actions: { handleCreatePatient, handleOpenDialog },
  } = useUpsertPatientAction({ patient, openOnCreateParam });

  return (
    <Dialog open={openDialog} onOpenChange={handleOpenDialog}>
      {!!buttonTrigger && (
        <DialogTrigger asChild>{buttonTrigger}</DialogTrigger>
      )}
      <DialogContent className="w-11/12 max-w-3xl md:w-full">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {patient?.id
              ? contentData.upsertPatientContentData.update.title
              : contentData.upsertPatientContentData.create.title}
          </DialogTitle>
          <DialogDescription>
            {patient?.id
              ? contentData.upsertPatientContentData.update.description
              : contentData.upsertPatientContentData.create.description}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleCreatePatient} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {contentData.globalContentData.labels.firstName}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={
                          contentData.globalContentData.placeholders.firstName
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {contentData.globalContentData.labels.lastName}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={
                          contentData.globalContentData.placeholders.lastName
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {contentData.globalContentData.labels.age}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder={
                          contentData.globalContentData.placeholders.age
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="identification"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {contentData.globalContentData.labels.identification}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={
                          contentData.globalContentData.placeholders
                            .identification
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {contentData.globalContentData.labels.address}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={
                        contentData.globalContentData.placeholders.address
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
                <Button
                  disabled={isLoading}
                  type="button"
                  variant="outline-destructive"
                >
                  {contentData.globalContentData.cancel}
                </Button>
              </DialogClose>
              <Button isLoading={isLoading} type="submit">
                {contentData.globalContentData.save}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
