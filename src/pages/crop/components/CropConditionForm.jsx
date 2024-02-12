import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { useFormData } from '../../../context/CropCreation.context';

function CropConditionForm() {
    const { updateFormData } = useFormData();

    let [saturationPoint, setSaturation] = useState();
    let [tempIrrigationControl, setTemperature] = useState();


    const onChangeStauration = (e) => {
        saturationPoint = e.target.value;
        setSaturation(saturationPoint);
        updateFormData({ saturationPoint });

    }

    const onChangeTemp = (e) => {
        tempIrrigationControl = e.target.value;
        setTemperature(tempIrrigationControl)
        updateFormData({ tempIrrigationControl });
    }
  
  

  return (
    <Box maxWidth="500px" mx="auto" mt="5">
        <FormControl id="saturationPoint" isRequired>
          <FormLabel>Punto de saturación</FormLabel>
          <Input type="number" name="saturationPoint" value={saturationPoint} onChange={onChangeStauration} placeholder="% de humedad en tierra" />
        </FormControl>

        <FormControl id="tempIrrigationControl" mt="4" isRequired>
          <FormLabel>Temperatura ambiente (máxima)</FormLabel>
          <Input type="number" name="tempIrrigationControl" value={tempIrrigationControl} onChange={onChangeTemp} placeholder="Grados Centigrados" />
        </FormControl>
    </Box>
  );
}

export default CropConditionForm;
