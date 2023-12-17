import { GetFormContentByUrl } from '@/actions/form';
import { FormElementInstance } from '@/components/FormElements';
import FormSubmitComponent from '@/components/FormSubmitComponent';
import React from 'react';

class FormNotFoundException extends Error {}

async function SubmitPage({
  params,
}: {
  params: {
    formUrl: string;
  };
}) {
  const { formUrl } = params;
  // fetch the content of the form of interest
  const form = await GetFormContentByUrl(formUrl);

  if (!form) throw new FormNotFoundException('Form was not found');

  const formContent = JSON.parse(form.content) as FormElementInstance[];

  return <FormSubmitComponent formUrl={formUrl} content={formContent} />;
}

export default SubmitPage;
