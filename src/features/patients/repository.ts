import { type Prisma } from '@prisma/client';
import prisma from '@/lib/prisma';
import { type GetPatientsPaginatedResult } from './types';
import {
  PATIENTS_INITIAL_PAGE,
  PATIENTS_INITIAL_SKIP,
  PATIENTS_PER_PAGE,
} from './constants';

export const findPatientsByDoctorId = async (
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
    skip: queries.skip,
    take: queries.take,
    orderBy: {
      updatedAt: 'desc',
    },
  });

  return patients;
};

export const createPatient = async (patient: Prisma.PatientCreateInput) => {
  return await prisma.patient.create({
    data: patient,
  });
};

export const countOfPatientsByDoctorId = async (doctorId: string) => {
  return await prisma.patient.count({
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
}): Promise<GetPatientsPaginatedResult> => {
  const page = currentPage;
  const skip = (page - 1) * take;

  const [countsOfPatients, patients] = await Promise.all([
    countOfPatientsByDoctorId(userId),
    findPatientsByDoctorId(userId, {
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
