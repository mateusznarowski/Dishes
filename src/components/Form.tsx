import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useRef, useState } from 'react';

import { TDish } from '../types/FormTypes';

import ControlledInput from './inputs/ControlledInput';
import SelectInput from './inputs/SelectInput';
import UncontrolledInput from './inputs/UncontrolledInput';

const Form = ({ setData }: { setData: Dispatch<SetStateAction<Partial<TDish>>> }) => {
  const dishTemplate = {
    name: '',
    preparation_time: '',
    type: '',
  };

  const [dish, setDish] = useState<Partial<TDish>>(dishTemplate);

  const noOfSlices = useRef<HTMLInputElement>(null);
  const diameter = useRef<HTMLInputElement>(null);
  const spicinessScale = useRef<HTMLInputElement>(null);
  const slicesOfBread = useRef<HTMLInputElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setDish((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    let dishDetails: Partial<TDish> = {};

    if (dish?.type === 'pizza' && noOfSlices.current != null && diameter.current != null) {
      dishDetails = {
        no_of_slices: noOfSlices.current.valueAsNumber,
        diameter: diameter.current.valueAsNumber,
      };
    }

    if (dish?.type === 'soup' && spicinessScale.current != null) {
      dishDetails = { spiciness_scale: spicinessScale.current.valueAsNumber };
    }

    if (dish?.type === 'sandwich' && slicesOfBread.current != null) {
      dishDetails = { slices_of_bread: slicesOfBread.current.valueAsNumber };
    }

    setData({ ...dish, ...dishDetails });
  };

  return (
    <form onSubmit={handleSubmit}>
      <ControlledInput
        type='text'
        name='name'
        label='Dish name'
        placeholder='What are we serving today?'
        value={dish?.name}
        update={handleChange}
      />

      <ControlledInput
        type='time'
        name='preparation_time'
        label='Preparation time'
        range={{ step: 1 }}
        value={dish?.preparation_time}
        update={handleChange}
      />

      <SelectInput name='type' label='Select type of dish' placeholder='dish' value={dish?.type} update={handleChange}>
        <option value='pizza'>Pizza</option>
        <option value='soup'>Soup</option>
        <option value='sandwich'>Sandwich</option>
      </SelectInput>

      {dish?.type === 'pizza' && (
        <>
          <UncontrolledInput
            type='number'
            name='no_of_slices'
            label='Enter the number of slices'
            placeholder='eg. 8'
            range={{ step: 1, min: 1 }}
            ref={noOfSlices}
          />

          <UncontrolledInput
            type='number'
            name='diameter'
            label='Specify the size of the pizza (Diameter)'
            placeholder='eg. 30'
            range={{ min: 1 }}
            ref={diameter}
          />
        </>
      )}

      {dish?.type === 'soup' && (
        <UncontrolledInput
          type='range'
          name='spiciness_scale'
          label='How spicy the soup should be (1 - 10)'
          range={{ step: 1, min: 1, max: 10 }}
          ref={spicinessScale}
        />
      )}

      {dish?.type === 'sandwich' && (
        <UncontrolledInput
          type='number'
          name='slices_of_bread'
          label='Enter the number of bread slices'
          placeholder='eg. 2'
          range={{ step: 1, min: 1 }}
          ref={slicesOfBread}
        />
      )}

      <button>Submit</button>
    </form>
  );
};

export default Form;
