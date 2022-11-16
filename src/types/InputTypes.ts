import { ChangeEvent } from 'react';

type TDefaultProps = {
  name: string;
  label?: string;
  placeholder?: string;
};

export type TInputProps = TDefaultProps & {
  type: 'text' | 'number' | 'time' | 'range';
  range?: {
    step?: number;
    min?: number;
    max?: number;
  };
};

export type TSelectProps = TDefaultProps & {
  children: JSX.Element | JSX.Element[];
  value: number | string | undefined;
  update: (event: ChangeEvent<HTMLSelectElement>) => void;
};
