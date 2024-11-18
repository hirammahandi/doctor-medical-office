import { format } from 'date-fns';
import { Suspense, type FC } from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { type GetPaginatedPatientsResult } from '@/features/patients';
import { DeletePatientDialog } from './delete-patient-dialog';
import { UpsertMedicalHistoryForm } from './upsert-medical-history-form';
import { UpsertPatientButton } from './upsert-patient-button';
import { UpsertPatientModalForm } from './upsert-patient-modal-form';
import { ViewPatientDetailsButton } from './view-patient-details-button';

type PatientCardProps = {
  patient: GetPaginatedPatientsResult['patients'][number];
};

export const PatientCard: FC<PatientCardProps> = ({ patient }) => {
  const {
    name,
    id,
    address,
    age,
    identification,
    lastName,
    updatedAt,
    createdAt,
    medicalHistories,
  } = patient;

  const date = updatedAt ?? createdAt;
  const fullName = `${name} ${lastName}`;

  return (
    <Card className="transition-all hover:bg-muted h-[258px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="truncate">{fullName}</span>
          {date ? (
            <Badge variant="secondary">{format(date, 'dd/MM/yyyy')}</Badge>
          ) : null}
        </CardTitle>
        <CardDescription>
          <Label htmlFor="identification" className="font-medium truncate">
            Identification:
          </Label>{' '}
          {identification}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 flex-1">
        <div className="text-sm">
          <Label htmlFor="age" className="font-medium">
            Age:
          </Label>{' '}
          {age}
        </div>
        <div className="text-sm">
          <Label htmlFor="address" className="font-medium">
            Address:
          </Label>{' '}
          {address}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-end gap-2">
        <UpsertMedicalHistoryForm
          patientId={id}
          medicalHistories={medicalHistories}
        />
        <ViewPatientDetailsButton id={id} />
        <Suspense>
          <UpsertPatientModalForm
            patient={patient}
            buttonTrigger={<UpsertPatientButton />}
          />
        </Suspense>
        <DeletePatientDialog patientId={id} patientName={fullName} />
      </CardFooter>
    </Card>
  );
};
