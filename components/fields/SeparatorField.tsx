'use client';

import {
  ElementsType,
  FormElement,
  FormElementInstance,
  SubmitFunction,
} from '../FormElements';
import { LuSeparatorHorizontal } from 'react-icons/lu';
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
import { Separator } from '../ui/separator';

const type: ElementsType = 'SeparatorField';

const DesignerComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  return (
    <div className='flex flex-col gap-2 w-full'>
      <Label className='text-muted-foreground'>Separator Field</Label>
      <Separator />
    </div>
  );
};

const PropertiesComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  return <p>No Properties for this element</p>;
};

const FormComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  return <Separator />;
};

export const SeparatorFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      title: 'Title Field',
    },
  }),
  designerBtnElement: {
    icon: LuSeparatorHorizontal,
    label: 'Separator',
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: () => true,
};
