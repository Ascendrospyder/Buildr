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
import { MdOutlineDateRange } from 'react-icons/md';
import { Button } from '../ui/button';
import { FaCalendarAlt } from 'react-icons/fa';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar } from '../ui/calendar';

const type: ElementsType = 'DateField';

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
  return (
    <div className='flex flex-col gap-2 w-full'>
      <Label>
        {elementInstance.extraAttributes?.label}
        {elementInstance.extraAttributes?.required && '*'}
      </Label>
      <Button
        variant={'outline'}
        className='w-full justify-start text-left font-normal'
      >
        <FaCalendarAlt className='mr-2 h-4 w-4' />
        <span>Pick a date</span>
      </Button>
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
  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : undefined
  );
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  return (
    <div className='flex flex-col gap-2 w-full'>
      <Label className={cn(error && 'text-red-500')}>
        {elementInstance.extraAttributes?.label}
        {elementInstance.extraAttributes?.required && '*'}
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal',
              !date && 'text-muted-foreground',
              error && 'border-red-500'
            )}
          >
            <FaCalendarAlt className='mr-2 h-4 w-4' />
            {date ? format(date, 'PPP') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            mode='single'
            selected={date}
            onSelect={(date) => {
              setDate(date);

              if (!submitValues) return;
              const value = date?.toUTCString() || '';
              const valid = DateFieldFormElement.validate(
                elementInstance,
                value
              );
              setError(!valid);
              submitValues(elementInstance.id, value);
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
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
  );
};

export const DateFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      label: 'Date Field',
      helperText: 'Pick a date',
      required: false,
    },
  }),
  designerBtnElement: {
    icon: MdOutlineDateRange,
    label: 'Date',
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
      return currentValue.length > 0;
    }

    // if not required then its true
    return true;
  },
};
