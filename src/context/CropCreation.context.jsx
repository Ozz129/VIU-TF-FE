import React, { createContext, useContext, useState } from 'react';

const FormDataContext = createContext();

export const FormDataProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    cropTypeId: null,
    cicle: null,
    soilTypeId: null,
    saturationPoint: null,
    tempIrrigationControl: null
}); 

  const updateFormData = (newData) => {
    setFormData((prevData) => ({...prevData, ...newData}));
  };

  return (
    <FormDataContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};

export const useFormData = () => useContext(FormDataContext);
