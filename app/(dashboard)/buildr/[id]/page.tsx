import { GetFormFromDbId, GetFormsFromDB } from '@/actions/form';
import FormBuildr from '@/components/FormBuildr';
import React from 'react';

async function BuildrPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;

  const form = await GetFormFromDbId(Number(id));

  if (!form) {
    throw new Error("Form doesn't exist!");
  }
  return <FormBuildr form={form} />;
}

export default BuildrPage;
