import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useRef, useState } from 'react';

import { TDish, TDishType } from './types/FormTypes';

import Input from './components/Input';
import Select from './components/Select';

const Form = ({ setData }: { setData: Dispatch<SetStateAction<TDish>> }) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const preparationTime = useRef<HTMLInputElement>(null);
  const [dishType, setDishType] = useState<TDishType>('');

  const noOfSlicesRef = useRef<HTMLInputElement>(null);
  const diameterRef = useRef<HTMLInputElement>(null);
  const spicinessScaleRef = useRef<HTMLInputElement>(null);
  const slicesOfBreadRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setDishType(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    let name = nameRef.current?.value === '' ? undefined : nameRef.current?.value;
    let preparation_time = preparationTime.current?.value === '' ? undefined : preparationTime.current?.value;
    let type = dishType;

    let dishDetails: Partial<TDish> = { name, preparation_time, type };

    let dishTypeDetails: Partial<TDish> = {};

    if (dishType === 'pizza' && noOfSlicesRef.current != null && diameterRef.current != null) {
      const no_of_slices = noOfSlicesRef.current.value === '' ? undefined : noOfSlicesRef.current.valueAsNumber;
      const diameter = diameterRef.current.value === '' ? undefined : parseFloat(diameterRef.current.value);

      dishTypeDetails = { no_of_slices, diameter };
    }

    if (dishType === 'soup' && spicinessScaleRef.current != null) {
      dishTypeDetails = {
        spiciness_scale: spicinessScaleRef.current.value === '' ? undefined : spicinessScaleRef.current.valueAsNumber,
      };
    }

    if (dishType === 'sandwich' && slicesOfBreadRef.current != null) {
      dishTypeDetails = {
        slices_of_bread: slicesOfBreadRef.current.value === '' ? undefined : slicesOfBreadRef.current.valueAsNumber,
      };
    }

    setData({ ...dishDetails, ...dishTypeDetails });
  };

  return (
    <form onSubmit={handleSubmit} className='form'>
      <Input type='text' name='name' label='Dish name' placeholder='Enter the name of the dish' ref={nameRef} />

      <Input type='time' name='preparation_time' label='Preparation time' range={{ step: 1 }} ref={preparationTime} />

      <Select name='type' label='Select type of dish' placeholder='dish' value={dishType} update={handleChange}>
        <option value='pizza'>Pizza</option>
        <option value='soup'>Soup</option>
        <option value='sandwich'>Sandwich</option>
      </Select>

      {dishType === 'pizza' && (
        <>
          <Input
            type='number'
            name='no_of_slices'
            label='Enter the number of slices'
            placeholder='eg. 8'
            range={{ step: 1, min: 1 }}
            ref={noOfSlicesRef}
          />

          <Input
            type='number'
            name='diameterRef'
            label='Specify the size of the pizza (diameter)'
            placeholder='eg. 30'
            range={{ step: 0.01, min: 1 }}
            ref={diameterRef}
          />
        </>
      )}

      {dishType === 'soup' && (
        <Input
          type='range'
          name='spiciness_scale'
          label='Specify how spicy the soup should be (1 - 10)'
          range={{ step: 1, min: 1, max: 10 }}
          ref={spicinessScaleRef}
        />
      )}

      {dishType === 'sandwich' && (
        <Input
          type='number'
          name='slices_of_bread'
          label='Enter the number of bread slices'
          placeholder='eg. 2'
          range={{ step: 1, min: 1 }}
          ref={slicesOfBreadRef}
        />
      )}

      <button className='btn form__submit'>Submit</button>
    </form>
  );
};

export default Form;
