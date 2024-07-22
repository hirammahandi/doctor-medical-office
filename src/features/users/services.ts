import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findFirst({
    where: {
      email: {
        equals: email,
        mode: "insensitive",
      },
    },
  });
};

export const findUserByUsername = async (username: string) => {
  return await prisma.user.findFirst({
    where: {
      username: {
        equals: username,
        mode: "insensitive",
      },
    },
  });
};

export const createUser = async (user: Prisma.UserCreateInput) => {
  return await prisma.user.create({
    data: user,
  });
};
