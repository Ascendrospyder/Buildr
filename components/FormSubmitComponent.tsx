'use client';

import React from 'react';
import { FormElementInstance, FormElement, FormElements } from './FormElements';

function FormSubmitComponent({
  formUrl,
  content,
}: {
  formUrl: string;
  content: FormElementInstance[];
}) {
  return (
    <div className='flex justify-center w-full h-full items-center p-8'>
      <div className='max-w-[600px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-lg shadow-[#bc0a63] rounded-lg'>
        {content.map((element) => {
          const FormElement = FormElements[element.type].formComponent;
          return <FormElement key={element.id} elementInstance={element} />;
        })}
      </div>
    </div>
  );
}

export default FormSubmitComponent;
