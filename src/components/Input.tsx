import { forwardRef, useState } from 'react';

import { TInputProps } from '../types/InputTypes';

const Input = forwardRef<HTMLInputElement, TInputProps>(({ type, name, placeholder, range, label }, ref) => {
  const [rangeValue, setRangeValue] = useState(0);
  const isTypeRange = type === 'range';

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
        defaultValue={isTypeRange ? 0 : undefined}
        onChange={(event) => {
          isTypeRange ? setRangeValue(event.target.valueAsNumber) : null;
        }}
      />

      {isTypeRange ? (
        <span>
          Current level: <strong>{rangeValue}</strong>
        </span>
      ) : null}
    </>
  );
});

export default Input;
