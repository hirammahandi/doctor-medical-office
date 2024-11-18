import { Suspense } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DoctorInfoSectionContainer,
  DoctorInfoSectionSkeleton,
} from './doctor-info';
import { RecentPatientsContainer } from './recent-patients';
import {
  TotalPatientsCardContainer,
  TotalPatientsCardSkeleton,
} from './total-patients';
import { RecentPatientsTableSkeleton } from './recent-patients/recent-patients-table-skeleton';

const recentMedicalHistories = [
  {
    id: 1,
    patientName: 'John Doe',
    date: '2023-06-15',
    summary: 'Routine checkup, blood pressure normal',
  },
  {
    id: 2,
    patientName: 'Alice Johnson',
    date: '2023-06-18',
    summary: 'Prescribed medication for hypertension',
  },
  {
    id: 3,
    patientName: 'Bob Williams',
    date: '2023-06-20',
    summary: 'Referred to specialist for further tests',
  },
];

export const DoctorMedicalDashboardContainer = () => {
  return (
    <>
      <Suspense fallback={<DoctorInfoSectionSkeleton />}>
        <DoctorInfoSectionContainer />
      </Suspense>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<TotalPatientsCardSkeleton />}>
          <TotalPatientsCardContainer />
        </Suspense>
      </div>

      <Suspense fallback={<RecentPatientsTableSkeleton />}>
        <RecentPatientsContainer />
      </Suspense>

      {/* TODO: Handle the recent medical histories */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Medical Histories</CardTitle>
            <CardDescription>
              Latest updates on patient medical histories.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Summary</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentMedicalHistories.map((history) => (
                  <TableRow key={history.id}>
                    <TableCell>{history.patientName}</TableCell>
                    <TableCell>{history.date}</TableCell>
                    <TableCell>{history.summary}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
