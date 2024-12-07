import React, { type FC } from 'react';
import { User, MapPin, Calendar, FileText, Clock } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { type GetPatientResult } from '@/features/patients';

type PatientDetailsProps = {
  patient: GetPatientResult;
};
export const PatientDetails: FC<PatientDetailsProps> = ({ patient }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="flex items-center text-sm font-medium text-muted-foreground">
            <User className="mr-2 h-4 w-4" />
            Name
          </Label>
          <p className="text-lg font-semibold">
            {patient.name} {patient.lastName}
          </p>
        </div>
        <div className="space-y-2">
          <Label className="flex items-center text-sm font-medium text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            Age
          </Label>
          <p className="text-lg">{patient.age} years old</p>
        </div>
        <div className="space-y-2">
          <Label className="flex items-center text-sm font-medium text-muted-foreground">
            <FileText className="mr-2 h-4 w-4" />
            Identification
          </Label>
          <p className="text-lg">{patient.identification}</p>
        </div>
        <div className="space-y-2">
          <Label className="flex items-center text-sm font-medium text-muted-foreground">
            <Clock className="mr-2 h-4 w-4" />
            Created At
          </Label>
          <p className="text-lg">{patient.createdAt?.toLocaleString()}</p>
        </div>
      </div>
      <div className="space-y-2 mt-4">
        <Label className="flex items-center text-sm font-medium text-muted-foreground">
          <MapPin className="mr-2 h-4 w-4" />
          Address
        </Label>
        <p className="text-lg">{patient.address}</p>
      </div>
    </>
  );
};
