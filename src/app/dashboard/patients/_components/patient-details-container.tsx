import { type PropsWithChildren, type FC } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type PatientDetailsContainerProps = PropsWithChildren<{
  isDialog?: boolean;
}>;

export const PatientDetailsContainer: FC<PatientDetailsContainerProps> = ({
  children,
  isDialog,
}) => {
  return (
    <>
      {!isDialog ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Patient Details</CardTitle>
            <CardDescription>
              Detailed information about the patient
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">{children}</CardContent>
        </Card>
      ) : (
        children
      )}
    </>
  );
};
