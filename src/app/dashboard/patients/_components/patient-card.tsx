import { type Patient } from '@prisma/client';
import { format } from 'date-fns';
import { PencilIcon } from 'lucide-react';
import { type FC } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { DeletePatientDialog } from './delete-patient-dialog';
import { UpsertPatientModalForm } from './upsert-patient-modal-form';

type PatientCardProps = {
  patient: Patient;
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
  } = patient;

  const date = updatedAt ?? createdAt;
  const fullName = `${name} ${lastName}`;

  return (
    <Card className="transition-all hover:bg-muted h-[258px]">
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
      <CardContent className="space-y-2">
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
        <UpsertPatientModalForm
          patient={patient}
          buttonTrigger={
            <Button variant="secondary" size="icon">
              <PencilIcon className="size-4" />
            </Button>
          }
        />
        <DeletePatientDialog patientId={id} patientName={fullName} />
      </CardFooter>
    </Card>
  );
};
