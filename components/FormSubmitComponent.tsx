'use client';

import React, { useCallback, useRef, useState, useTransition } from 'react';
import { FormElementInstance, FormElement, FormElements } from './FormElements';
import { Button } from './ui/button';
import { IoIosSend } from 'react-icons/io';
import { toast } from './ui/use-toast';
import { ImSpinner2 } from 'react-icons/im';
import { SubmitFormToDB } from '@/actions/form';
import Confetti from 'react-confetti';

function FormSubmitComponent({
  formUrl,
  content,
}: {
  formUrl: string;
  content: FormElementInstance[];
}) {
  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});
  const [renderKey, setRenderKey] = useState(new Date().getTime());
  const [submitted, setSubmitted] = useState(false);

  const [pending, startTransition] = useTransition();

  const validateForm: () => boolean = useCallback(() => {
    for (const field of content) {
      const valueOfInterest = formValues.current[field.id] || '';
      const isValid = FormElements[field.type].validate(field, valueOfInterest);

      if (!isValid) {
        formErrors.current[field.id] = true;
      }
    }

    if (Object.keys(formErrors.current).length > 0) {
      return false;
    }

    return true;
  }, [content]);

  const submitValues = useCallback((key: string, value: string) => {
    formValues.current[key] = value;
  }, []);

  const submitForm = async () => {
    formErrors.current = {};
    const validForm = validateForm();
    // re renders form if invalid entry
    setRenderKey(new Date().getTime());
    if (!validForm) {
      toast({
        title: 'Error',
        description:
          'Please enter all required fields when submitting your form',
        variant: 'destructive',
      });
      return;
    }

    try {
      const dataToSend = JSON.stringify(formValues.current);
      await SubmitFormToDB(formUrl, dataToSend);
      setSubmitted(true);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong while submitting your form',
        variant: 'destructive',
      });
    }
  };

  if (submitted) {
    return (
      <>
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
        />
        <div className='flex justify-center w-full h-full items-center p-8'>
          <div className='max-w-[600px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-lg shadow-[#bc0a63] rounded-lg'>
            <h1 className='text-2xl font-bold'>Form Submitted</h1>
            <p className='text-muted-foreground '>
              Thanks for submitting the form, you can now close this page!
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className='flex justify-center w-full h-full items-center p-8'>
      <div
        key={renderKey}
        className='max-w-[600px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-lg shadow-[#bc0a63] rounded-lg'
      >
        {content.map((element) => {
          const FormElement = FormElements[element.type].formComponent;
          return (
            <FormElement
              key={element.id}
              elementInstance={element}
              submitValues={submitValues}
              isInvalid={formErrors.current[element.id]}
              defaultValue={formValues.current[element.id]}
            />
          );
        })}
        <Button
          className='mt-4 bg-[#bc0a63]'
          onClick={() => {
            startTransition(submitForm);
          }}
          disabled={pending}
        >
          {!pending && (
            <>
              Submit Form
              <IoIosSend className='ml-2 h-5 w-5' />
            </>
          )}
          {pending && <ImSpinner2 className='animate-spin ml-1' />}
        </Button>
      </div>
    </div>
  );
}

export default FormSubmitComponent;
