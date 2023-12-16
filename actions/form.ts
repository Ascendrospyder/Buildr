'use server';

import { currentUser } from '@clerk/nextjs';
import prisma from '@/lib/prisma';
import { formSchema, formSchemaType } from '@/schemas/form';

class UserNotFoundErr extends Error {}

export async function FetchFormStats() {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundErr();
  }

  const stats = prisma?.form.aggregate({
    where: {
      userId: user.id,
    },
    _sum: {
      numVisits: true,
      submissions: true,
    },
  });

  const visits = (await stats)?._sum.numVisits || 0;
  const submissions = (await stats)?._sum.submissions || 0;

  let submissionRate = 0;

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  const bounceRate = 100 - submissionRate;

  return {
    visits,
    submissions,
    submissionRate,
    bounceRate,
  };
}

export const CreateForm = async (data: formSchemaType) => {
  const validation = formSchema.safeParse(data);

  if (!validation.success) {
    throw new Error('Form is not valid!');
  }

  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  const form = await prisma.form.create({
    data: {
      userId: user.id,
      name: data.name,
      description: data.description,
    },
  });

  if (!form) {
    throw new Error(
      'Something went wrong when creating a form in the database'
    );
  }

  return form.id;
};

export const GetFormsFromDB = async () => {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundErr();
  }

  return await prisma.form.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const GetFormFromDbId = async (id: number) => {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundErr();
  }

  return await prisma.form.findUnique({
    where: {
      userId: user.id,
      id,
    },
  });
};

export const UpdateFormContentDb = async (id: number, data: string) => {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundErr();
  }

  // once we have the new json data go ahead an make an update to the backend
  // database
  return await prisma.form.update({
    where: {
      userId: user.id,
      id,
    },
    data: {
      content: data,
    },
  });
};

export const PublishFormDb = async (id : number) => {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundErr();
  }

  return await prisma.form.update({
    data: {
      published: true
    },
    where: {
      userId: user.id,
      id
    }
  })
};
