import React, { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Box, Flex, Text, Button, useToast } from '@chakra-ui/react';
import { useFormData } from '../../../context/CropCreation.context';

const CropRevisionTable = ({ onClose, creationCrop }) => {
    const { formData } = useFormData();
    const toast = useToast()

    const tableData = [
        { indicator: 'Cultivo', value: formData.cropTypeId ?? '-'},
        { indicator: 'Etapa', value: formData.cicle ?? '-' },
        { indicator: 'Suelo', value: formData.soilTypeId ?? '-' },
        { indicator: 'Punto de Saturación', value: formData.saturationPoint ? `${formData.saturationPoint} %` : '-' },
        { indicator: 'Temperatura (max)', value: formData.tempIrrigationControl ? `${formData.tempIrrigationControl}º C` : '-' },
    ];

    const onSubmitCrop = async () => {
        const restriction = Object.values(formData).some(value =>value === null) 
        if(restriction) {
            toast({
                title: 'Error',
                description: "Es necesario diligenciar toda la información.",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }

        const response = await fetch('http://localhost:3000/v1/crop', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${localStorage.getItem('token')}`        
            },
            body: JSON.stringify(formData),
        });

        if(response.ok) {
            toast({
                title: 'Exito',
                description: "Se ha creado el cultivo",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            onClose();
            creationCrop(true)
        }
    }

    return (
        <Box overflowX="auto">
        <Table variant="simple">
            <Thead bg="blue.500">
            <Tr>
                <Th color="#fff" textAlign="center">Indice</Th>
                <Th color="#fff" textAlign="center">Valor</Th>
            </Tr>
            </Thead>
            <Tbody>
            {tableData.map((row, index) => (
                <Tr key={index}>
                    <Td fontWeight="bold" textAlign="center">
                        {row.indicator}
                    </Td>
                <Td textAlign="center">{row.value}</Td>
                </Tr>
            ))}
            </Tbody>
        </Table>
            <Button colorScheme="blue" w="fit-content" float="right" onClick={onSubmitCrop} isDisabled=''>Crear</Button>
        </Box>
  );
};

export default CropRevisionTable;
