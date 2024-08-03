import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const findUserByEmail = async (
  email: string,
  options?: Omit<Prisma.UserFindFirstArgs, "where">,
) => {
  return await prisma.user.findFirst({
    where: {
      email: {
        equals: email,
        mode: "insensitive",
      },
    },
    ...options,
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

export const updateUser = async ({
  id,
  ...restUser
}: Omit<Prisma.UserUpdateInput, "id"> & { id: string }) => {
  return await prisma.user.update({
    data: restUser,
    where: {
      id,
    },
  });
};
