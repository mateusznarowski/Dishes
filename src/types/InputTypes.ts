import { ChangeEvent } from 'react';

type TInputProps = {
  name?: string;
  label?: string;
  placeholder?: string;
};

export type TUncontrolledInputProps = TInputProps & {
  type?: 'text' | 'number' | 'time' | 'range';
  range?: {
    step?: number;
    min?: number;
    max?: number;
  };
};

export type TControlledInputProps = TUncontrolledInputProps & {
  value: number | string | undefined;
  update: (event: ChangeEvent<HTMLInputElement>) => void;
};

export type TSelectInputProps = TInputProps & {
  children: JSX.Element | JSX.Element[];
  value: number | string | undefined;
  update: (event: ChangeEvent<HTMLSelectElement>) => void;
};
