'use client';

import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from '../FormElements';
import { MdTextFields } from 'react-icons/md';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

const type: ElementsType = 'TextField';

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
  formComponent: () => <div>Form Design</div>,
  propertiesComponent: () => <div>Properties Design</div>,
};
