import React, { useEffect, useState } from 'react';
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
} from '@chakra-ui/react';

import GrassIcon from '@mui/icons-material/Grass';
import BlurOnIcon from '@mui/icons-material/BlurOn';
import ChecklistIcon from '@mui/icons-material/Checklist';
import WaterDropIcon from '@mui/icons-material/WaterDrop';

import TableTitle from './TabTitle';
import CustomSelect from '../../../components/customSelector';
import CropConditionForm from './CropConditionForm';
import { useFormData } from '../../../context/CropCreation.context';
import CropRevisionTable from './CropRevisionTable';


function CropForm({ cropTypes, soilTypes, onClose, creationCrop }) {  

    const [seeCropAge, setSeeCropAge] = useState(false)
    const [stages, setStages] = useState([]);
    const { updateFormData } = useFormData();
  
      
    const onChangeCropType = (event) => {
        const selectedCrop = event.target.value
        const crop = cropTypes.filter(crop => crop.name === selectedCrop)
        setStages(crop[0].stages)
        setSeeCropAge(true)
        updateFormData({ cropTypeId: selectedCrop });
    }

    const onChangeSoilType = (event) => {
        const soilTypeId = event.target.value
        updateFormData({ soilTypeId });
    }

    const onChangeStage = (event) => {
        const cicle = event.target.value
        updateFormData({ cicle });
    }

    const stepsContent = [
        {   
            title: 'Cultivo',
            description: 'Elige el tipo de cultivo y la etapa en la que se encuentra',
            icon: <GrassIcon />, 
            content: <>
                <CustomSelect 
                options={cropTypes}
                placeholder='Elige la especie de tu cultivo'
                onChange={onChangeCropType}/>
                {
                    seeCropAge &&  <Box mt={4}>
                        <CustomSelect 
                            options={stages}
                            placeholder='Elige la etapa de tu cultivo'
                            onChange={onChangeStage}/>
                    </Box>
                }
            </>
        },
        { 
            title: 'Suelo', 
            description: 'Elige el tipo de suelo',
            icon: <BlurOnIcon />, 
            content: <CustomSelect 
                options={soilTypes}
                placeholder='Elige el tipo de suelo'
                onChange={onChangeSoilType}/>
            },
        { 
            title: 'Riego', 
            description: 'Indica las condiciones de evaluación',
            icon: <WaterDropIcon />, 
            content: <CropConditionForm /> 
        },
        { 
            title: 'Revisión',
            description: '¿Es esta información correcta?', 
            icon: <ChecklistIcon />, 
            content: <CropRevisionTable onClose={onClose} creationCrop={creationCrop}/> 
        },
    ];
    
  return (
        <Tabs isFitted variant="enclosed" colorScheme="yellow">
            <TabList>
                {stepsContent.map((step, index) => (
                <Tab key={index} _selected={{ color: 'white', bg: 'blue.500' }}>
                    <TableTitle icon={step.icon} text={step.title}/>
                </Tab>
                ))}
            </TabList>
            <TabPanels>
                {stepsContent.map((step, index) => (
                <TabPanel key={index}>
                    <Text align="center" mb={2} fontSize="small">{step.description}</Text>
                    <Box>{step.content}</Box>
                </TabPanel>
                ))}
            </TabPanels>
        </Tabs>

  );
}

export default CropForm;
