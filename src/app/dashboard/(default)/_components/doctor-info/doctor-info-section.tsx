import { type FC } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { type FindUserResult } from '@/features/users';

type DoctorInfoSectionProps = Pick<FindUserResult, 'name' | 'lastName'>;

export const DoctorInfoSection: FC<DoctorInfoSectionProps> = ({
  lastName,
  name,
}) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">Doctor&apos;s Dashboard</h1>
      <Avatar className="h-12 w-12">
        <AvatarFallback>
          {name[0]} {lastName[0]}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};
