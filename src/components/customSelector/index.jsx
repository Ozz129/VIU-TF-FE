import React from 'react';
import { Select } from '@chakra-ui/react';

const CustomSelect = ({ options, placeholder, onChange, value, ...props }) => {

  console.log('OPTIONS::', options)
  return (
    <Select placeholder={placeholder} onChange={onChange} value={value} {...props}>
      {options.map((option, index) => (
        <option key={index} value={option.name}>
          {option.name ? option.name : option.stage}
        </option>
      ))}
    </Select>
  );
};

export default CustomSelect;
