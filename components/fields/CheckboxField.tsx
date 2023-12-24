'use client';

import {
  ElementsType,
  FormElement,
  FormElementInstance,
  SubmitFunction,
} from '../FormElements';

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
import { IoMdCheckbox } from 'react-icons/io';
import { Checkbox } from '../ui/checkbox';

const type: ElementsType = 'CheckboxField';

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
});

const DesignerComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  const id = `checkbox-${elementInstance.id}`;
  return (
    <div className='flex items-top space-x-2'>
      <Checkbox id={id} />
      <div className='grid gap-1.5 leading-none'>
        <Label htmlFor={id}>
          {elementInstance.extraAttributes?.label}
          {elementInstance.extraAttributes?.required && '*'}
        </Label>
        {elementInstance.extraAttributes?.helperText && (
          <p className='text-muted-foreground text-[0.8rem]'>
            {elementInstance.extraAttributes?.helperText}
          </p>
        )}
      </div>
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
  submitValues,
  isInvalid,
  defaultValue,
}: {
  elementInstance: FormElementInstance;
  submitValues?: SubmitFunction;
  isInvalid?: boolean;
  defaultValue?: string;
}) => {
  const [value, setValue] = useState<boolean>(
    defaultValue === 'true' ? true : false
  );
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  const id = `checkbox-${elementInstance.id}`;
  return (
    <div className='flex items-top space-x-2'>
      <Checkbox
        id={id}
        checked={value}
        className={cn(error && 'border-red-500')}
        onCheckedChange={(checked) => {
          let value = false;
          if (checked === true) value = true;
          setValue(value);

          if (!submitValues) return;
          const stringValue = value ? 'true' : 'false';
          const valid = CheckboxFieldFormElement.validate(
            elementInstance,
            stringValue
          );
          setError(!valid);
          submitValues(elementInstance.id, stringValue);
        }}
      />
      <div className='grid gap-1.5 leading-none'>
        <Label htmlFor={id} className={cn(error && 'border-red-500')}>
          {elementInstance.extraAttributes?.label}
          {elementInstance.extraAttributes?.required && '*'}
        </Label>
        {elementInstance.extraAttributes?.helperText && (
          <p
            className={cn(
              'text-muted-foreground text-[0.8rem]',
              error && 'text-red-500'
            )}
          >
            {elementInstance.extraAttributes?.helperText}
          </p>
        )}
      </div>
    </div>
  );
};

export const CheckboxFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      label: 'Text Field',
      helperText: 'Helper text',
      required: false,
    },
  }),
  designerBtnElement: {
    icon: IoMdCheckbox,
    label: 'Checkbox',
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: (
    formElement: FormElementInstance,
    currentValue: string
  ): boolean => {
    const element = formElement;

    // check if the required field is filled out
    if (element.extraAttributes?.required) {
      return currentValue === 'true';
    }

    // if not required then its true
    return true;
  },
};
