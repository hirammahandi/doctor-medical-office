import { type Prisma } from '@prisma/client';
import prisma from '@/lib/prisma';
import { type GetPaginatedPatientsResult } from './types';
import {
  PATIENTS_INITIAL_PAGE,
  PATIENTS_INITIAL_SKIP,
  PATIENTS_PER_PAGE,
} from './constants';

export const findPatients = (input: Prisma.PatientFindManyArgs) => {
  return prisma.patient.findMany(input);
};

export const findPaginatedPatientsByDoctorId = async (
  doctorId: string,
  queries: {
    skip?: number;
    take?: number;
    search?: string;
  } = {
    skip: PATIENTS_INITIAL_SKIP,
    take: PATIENTS_PER_PAGE,
  },
) => {
  const patients = await prisma.patient.findMany({
    where: {
      userId: doctorId,
      name: {
        search: queries.search,
        mode: 'insensitive',
      },
      lastName: {
        search: queries.search,
        mode: 'insensitive',
      },
    },
    include: {
      medicalHistories: {
        select: {
          id: true,
          description: true,
          createdAt: true,
        },
      },
    },
    skip: queries.skip,
    take: queries.take,
    orderBy: {
      updatedAt: 'desc',
    },
  });

  return patients;
};

export const createPatient = (patient: Prisma.PatientCreateInput) => {
  return prisma.patient.create({
    data: patient,
  });
};

export const updatePatient = (
  id: string,
  patient: Prisma.PatientUpdateInput,
) => {
  return prisma.patient.update({
    where: {
      id,
    },
    data: patient,
  });
};

export const countOfPatientsByDoctorId = (doctorId: string) => {
  return prisma.patient.count({
    where: {
      userId: doctorId,
    },
  });
};

export const findPaginatedPatients = async ({
  currentPage = PATIENTS_INITIAL_PAGE,
  userId,
  search,
  take = PATIENTS_PER_PAGE,
}: {
  currentPage?: number;
  userId: string;
  search?: string;
  take?: number;
}): Promise<GetPaginatedPatientsResult> => {
  const page = currentPage;
  const skip = (page - 1) * take;

  const [countsOfPatients, patients] = await Promise.all([
    countOfPatientsByDoctorId(userId),
    findPaginatedPatientsByDoctorId(userId, {
      skip,
      take,
      search,
    }),
  ]);

  const totalPages = Math.ceil(countsOfPatients / take);
  const total = countsOfPatients;

  return {
    patients,
    page,
    totalPages,
    total,
  };
};

export const deletePatientByDoctorId = async (
  doctorId: string,
  patientId: string,
) => {
  return await prisma.patient.delete({
    where: { id: patientId, userId: doctorId },
  });
};

export const findPatientById = async (params: Prisma.PatientFindUniqueArgs) => {
  return await prisma.patient.findUnique(params);
};
