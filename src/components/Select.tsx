import { TSelectProps } from '../types/InputTypes';

const ControlledSelect = ({ name, label, placeholder, children, value, update }: TSelectProps) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>

      <div>
        <select name={name} id={name} required onChange={update} value={value}>
          <option value='' disabled hidden>
            Choose a {placeholder}
          </option>
          {children}
        </select>

        <span></span>
      </div>
    </>
  );
};

export default ControlledSelect;
