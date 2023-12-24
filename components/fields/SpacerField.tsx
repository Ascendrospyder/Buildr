'use client';

import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from '../FormElements';
import { MdHeight } from 'react-icons/md';
import { Label } from '../ui/label';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import useDesigner from '../hooks/useDesigner';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Slider } from '../ui/slider';
import Box from '@mui/material/Box';

const type: ElementsType = 'SpacerField';

const propertiesSchema = z.object({
  height: z.number().min(5).max(200),
});

const DesignerComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  return (
    <div className='flex flex-col gap-2 w-full items-center'>
      <Label className='text-muted-foreground'>
        Spacer field: {elementInstance.extraAttributes?.height}px
      </Label>
      <MdHeight className='h-8 w-8' />
    </div>
  );
};

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

const PropertiesComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  const { updateElement } = useDesigner();

  const form = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: 'onBlur',
    defaultValues: {
      height: elementInstance.extraAttributes?.height,
    },
  });

  useEffect(() => {
    form.reset(elementInstance.extraAttributes);
  }, [elementInstance, form]);

  const finaliseChanges = (values: propertiesFormSchemaType) => {
    updateElement(elementInstance.id, {
      ...elementInstance,
      extraAttributes: {
        height: values.height,
      },
    });
  };

  return (
    <Form {...form}>
      <form
        className='space-y-4'
        onSubmit={(e) => {
          e.preventDefault();
        }}
        onBlur={form.handleSubmit(finaliseChanges)}
      >
        <FormField
          control={form.control}
          name='height'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Space between in (px): {form.watch('height')}
              </FormLabel>
              <FormControl className='pt-2'>
                <Slider
                  defaultValue={[field.value]}
                  min={5}
                  max={200}
                  step={1}
                  onValueChange={(value) => {
                    field.onChange(value[0]);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
      </form>
    </Form>
  );
};

const FormComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  return (
    <Box
      style={{ height: elementInstance.extraAttributes?.height, width: '100%' }}
    ></Box>
  );
};

export const SpacerFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      height: 20,
    },
  }),
  designerBtnElement: {
    icon: MdHeight,
    label: 'Spacer',
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: () => true,
};
