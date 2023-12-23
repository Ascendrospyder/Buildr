'use client';

import {
  ElementsType,
  FormElement,
  FormElementInstance,
  SubmitFunction,
} from '../FormElements';
import { MdOutlineSubtitles } from 'react-icons/md';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
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
import { Switch } from '../ui/switch';
import { cn } from '@/lib/utils';
import { title } from 'process';

const type: ElementsType = 'SubtitleField';

const propertiesSchema = z.object({
  subtitle: z.string().min(3).max(50),
});

const DesignerComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  return (
    <div className='flex flex-col gap-2 w-full'>
      <Label className='text-muted-foreground'>Subtitle Field</Label>
      <p className='text-lg'>{elementInstance.extraAttributes?.subtitle}</p>
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
      subtitle: elementInstance.extraAttributes?.subtitle,
    },
  });

  useEffect(() => {
    form.reset(elementInstance.extraAttributes);
  }, [elementInstance, form]);

  const finaliseChanges = (values: propertiesFormSchemaType) => {
    updateElement(elementInstance.id, {
      ...elementInstance,
      extraAttributes: {
        subtitle: values.subtitle,
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
          name='subtitle'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subtitle</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') e.currentTarget.blur();
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
  return <p className='text-lg'>{elementInstance.extraAttributes?.subtitle}</p>;
};

export const SubtitleFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      title: 'Subtitle Field',
    },
  }),
  designerBtnElement: {
    icon: MdOutlineSubtitles,
    label: 'Subtitle',
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: () => true,
};
