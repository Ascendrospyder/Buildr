import { ParagraphFieldFormElement } from './fields/ParagraphField';
import { SeparatorFieldFormElement } from './fields/SeparatorField';
import { SubtitleFieldFormElement } from './fields/SubtitleField';
import { TextFieldFormElement } from './fields/TextField';
import { TitleFieldFormElement } from './fields/TitleField';

export type ElementsType =
  | 'TextField'
  | 'TitleField'
  | 'SubtitleField'
  | 'ParagraphField'
  | 'SeparatorField';
export type SubmitFunction = (key: string, value: string) => void;

export type FormElement = {
  type: ElementsType;

  construct: (id: string) => FormElementInstance;

  designerBtnElement: {
    icon: React.ElementType;
    label: string;
  };

  designerComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  formComponent: React.FC<{
    elementInstance: FormElementInstance;
    submitValues?: (key: string, value: string) => void;
    isInvalid?: boolean;
    defaultValue?: string;
  }>;
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;

  validate: (formElement: FormElementInstance, currentValue: string) => boolean;
};

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>;
};

type FormElementsType = {
  [key in ElementsType]: FormElement;
};

export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
  TitleField: TitleFieldFormElement,
  SubtitleField: SubtitleFieldFormElement,
  ParagraphField: ParagraphFieldFormElement,
  SeparatorField: SeparatorFieldFormElement,
};
