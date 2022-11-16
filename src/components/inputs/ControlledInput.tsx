import { TControlledInputProps } from '../../types/InputTypes';

const ControlledInput = ({ type, name, placeholder, range, label, value, update }: TControlledInputProps) => {
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
        value={value}
        onChange={update}
      />
    </>
  );
};

export default ControlledInput;
