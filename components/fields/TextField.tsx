'use client';

import { ElementsType, FormElement } from '../FormElements';

const type: ElementsType = 'TextField';

export const TextFieldFormElement: FormElement = {
  type,
  designerComponent: () => <div>Text Design</div>,
  formComponent: () => <div>Form Design</div>,
  propertiesComponent: () => <div>Properties Design</div>,
};
