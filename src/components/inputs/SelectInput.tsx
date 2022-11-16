import { TSelectInputProps } from '../../types/InputTypes';

const ControlledSelectInput = ({ name, label, placeholder, children, value, update }: TSelectInputProps) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>

      <select name={name} id={name} required onChange={update} value={value}>
        <option value='' disabled hidden>
          Choose a {placeholder}
        </option>
        {children}
      </select>
    </>
  );
};

export default ControlledSelectInput;
