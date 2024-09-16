import { type Prisma } from '@prisma/client';
import prisma from '@/lib/prisma';
import { type GetPatientsPaginatedResult } from './types';

export const findPatientsByDoctorId = async (
  doctorId: string,
  queries: {
    skip?: number;
    take?: number;
    search?: string;
  } = {
    skip: 0,
    take: 5,
  },
) => {
  const patients = await prisma.patient.findMany({
    where: {
      userId: doctorId,
      name: {
        search: queries.search,
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
  currentPage = 1,
  userId,
  search,
  take = 6,
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
