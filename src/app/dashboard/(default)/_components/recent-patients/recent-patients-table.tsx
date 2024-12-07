import Link from 'next/link';
import { type FC } from 'react';
import { EmptyResultsView } from '@/components/empty-results-view';
import { Button } from '@/components/ui/button';
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
import { type GetPatientResult } from '@/features/patients';
import { contentData } from '@/lib/content-data';
import { ClientRoutes, ClientSearchParams } from '@/lib/clients-routes';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';

type RecentPatientProps = {
  recentPatients: GetPatientResult[];
};

export const RecentPatientsTable: FC<RecentPatientProps> = ({
  recentPatients,
}) => {
  return (
    <div className="mt-8">
      <Card>
        <CardHeader>
          <CardTitle>Recent Patient Information</CardTitle>
          <CardDescription>Overview of recently seen patients</CardDescription>
        </CardHeader>
        <CardContent>
          {recentPatients.length ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient Name</TableHead>
                  <TableHead className="text-end">Age</TableHead>
                  <TableHead className="text-end">Identification</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Creado en</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>
                      <Button asChild className="h-fit p-0" variant="link">
                        <Link href={`${ClientRoutes.PATIENTS}/${patient.id}`}>
                          {patient.name} {patient.lastName}
                        </Link>
                      </Button>
                    </TableCell>
                    <TableCell align="right">{patient.age}</TableCell>
                    <TableCell align="right">
                      {patient.identification}
                    </TableCell>
                    <TableCell>{patient.address}</TableCell>
                    <TableCell>
                      <TooltipProvider delayDuration={50}>
                        <Tooltip>
                          <TooltipTrigger>
                            {patient.createdAt?.toLocaleDateString('en-US', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                            })}
                          </TooltipTrigger>
                          <TooltipContent>
                            {patient.createdAt?.toLocaleDateString(undefined, {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <EmptyResultsView className="min-h-full">
              <Button asChild>
                <Link
                  href={{
                    pathname: ClientRoutes.PATIENTS,
                    query: {
                      [ClientSearchParams.CREATE.param]:
                        ClientSearchParams.CREATE.values.true,
                    },
                  }}
                >
                  {contentData.upsertPatientContentData.create.addButtonTrigger}
                </Link>
              </Button>
            </EmptyResultsView>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
