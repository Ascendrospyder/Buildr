'use client';

import React, { useCallback, useRef } from 'react';
import { FormElementInstance, FormElement, FormElements } from './FormElements';
import { Button } from './ui/button';
import { IoIosSend } from 'react-icons/io';

function FormSubmitComponent({
  formUrl,
  content,
}: {
  formUrl: string;
  content: FormElementInstance[];
}) {
  const formValues = useRef<{ [key: string]: string }>({});

  const submitValues = useCallback((key: string, value: string) => {
    formValues.current[key] = value;
  }, []);

  const submitForm = () => {
    console.log(formValues.current);
  };

  return (
    <div className='flex justify-center w-full h-full items-center p-8'>
      <div className='max-w-[600px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-lg shadow-[#bc0a63] rounded-lg'>
        {content.map((element) => {
          const FormElement = FormElements[element.type].formComponent;
          return (
            <FormElement
              key={element.id}
              elementInstance={element}
              submitValues={submitValues}
            />
          );
        })}
        <Button
          className='mt-4 bg-[#bc0a63]'
          onClick={() => {
            submitForm();
          }}
        >
          Submit Form
          <IoIosSend className='ml-2 h-5 w-5' />
        </Button>
      </div>
    </div>
  );
}

export default FormSubmitComponent;
