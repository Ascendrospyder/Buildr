'use client';

import { ElementsType, FormElement } from '../FormElements';
import { MdTextFields } from 'react-icons/md';

const type: ElementsType = 'TextField';

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
  designerComponent: () => <div>Text Design</div>,
  formComponent: () => <div>Form Design</div>,
  propertiesComponent: () => <div>Properties Design</div>,
};
