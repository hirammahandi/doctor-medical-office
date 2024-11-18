import { UsersIcon } from 'lucide-react';
import { type FC } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

type TotalPatientsCardProps = {
  totalPatients: number;
};

export const TotalPatientsCard: FC<TotalPatientsCardProps> = ({
  totalPatients,
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
        <UsersIcon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{totalPatients}</div>
      </CardContent>
    </Card>
  );
};
