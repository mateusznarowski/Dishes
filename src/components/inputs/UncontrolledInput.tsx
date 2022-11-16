import { forwardRef } from 'react';

import { TUncontrolledInputProps } from '../../types/InputTypes';

const UncontrolledInput = forwardRef<HTMLInputElement, TUncontrolledInputProps>(
  ({ type, name, placeholder, range, label }, ref) => {
    return (
      <>
        {label ? <label htmlFor={name}>{label}</label> : null}

        <input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          autoComplete='off'
          required
          step={range?.step}
          min={range?.min}
          max={range?.max}
          ref={ref}
          defaultValue={type === 'range' ? 0 : undefined}
        />
      </>
    );
  }
);

export default UncontrolledInput;
