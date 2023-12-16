'use client';

import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from '../FormElements';
import { MdTextFields } from 'react-icons/md';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
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

const type: ElementsType = 'TextField';

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
  placeHolder: z.string().max(50),
});

const DesignerComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  return (
    <div className='flex flex-col gap-2 w-full'>
      <Label>
        {elementInstance.extraAttributes?.label}
        {elementInstance.extraAttributes?.required && '*'}
      </Label>
      <Input
        readOnly
        disabled
        placeholder={elementInstance.extraAttributes?.placeHolder}
      />
      {elementInstance.extraAttributes?.helperText && (
        <p className='text-muted-foreground text-[0.8rem]'>
          {elementInstance.extraAttributes?.helperText}
        </p>
      )}
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
      label: elementInstance.extraAttributes?.label,
      helperText: elementInstance.extraAttributes?.helperText,
      required: elementInstance.extraAttributes?.required,
      placeHolder: elementInstance.extraAttributes?.placeHolder,
    },
  });

  useEffect(() => {
    form.reset(elementInstance.extraAttributes);
  }, [elementInstance, form]);

  const finaliseChanges = (values: propertiesFormSchemaType) => {
    updateElement(elementInstance.id, {
      ...elementInstance,
      extraAttributes: {
        label: values.label,
        helperText: values.helperText,
        placeHolder: values.placeHolder,
        required: values.required,
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
          name='label'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Form Label</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription className='text-xs text-muted-foreground'>
                This is the forms label which will be located above the field
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>

        <FormField
          control={form.control}
          name='placeHolder'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Form Place Holder</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription className='text-xs text-muted-foreground'>
                This is the forms placeholder which is located below the form
                label
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>

        <FormField
          control={form.control}
          name='helperText'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Helper Text</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription className='text-xs text-muted-foreground'>
                This is the forms Helper text which is the small piece of text
                at the bottom
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>

        <FormField
          control={form.control}
          name='required'
          render={({ field }) => (
            <FormItem className='flex items-center justify-between rounded-lg border p-3 shadow-sm'>
              <div className='space-y-1'>
                <FormLabel>Required</FormLabel>
                <FormDescription className='text-xs text-muted-foreground'>
                  This is the forms placeholder which is located below the form
                  label
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className='ml-[7px]'
                ></Switch>
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
    <div className='flex flex-col gap-2 w-full'>
      <Label>
        {elementInstance.extraAttributes?.label}
        {elementInstance.extraAttributes?.required && '*'}
      </Label>
      <Input placeholder={elementInstance.extraAttributes?.placeHolder} />
      {elementInstance.extraAttributes?.helperText && (
        <p className='text-muted-foreground text-[0.8rem]'>
          {elementInstance.extraAttributes?.helperText}
        </p>
      )}
    </div>
  );
};

export const TextFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      label: 'Text Field',
      helperText: 'Helper text',
      required: false,
      placeHolder: 'insert value here...',
    },
  }),
  designerBtnElement: {
    icon: MdTextFields,
    label: 'Text Field',
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
};
