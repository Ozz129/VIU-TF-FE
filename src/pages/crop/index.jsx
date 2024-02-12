import { Box, Flex, Button, useDisclosure, Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";
import DataTable from "./components/DataGrid"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Sidebar from "../../components/sideBar";
import CropForm from "./components/CropFrom";
import { useEffect, useState } from "react";
import { FormDataProvider } from "../../context/CropCreation.context";

const Crop = () => {

    const [ cropTypes, setCropTypes] = useState(null)
    const [ soilTypes, setSoilTypes] = useState(null)
    const [ crops, setCrops ] = useState([])
    const [creationCrop, setCreationCrop] = useState(false);

    const habldeCreationResult = (result) => {
      setCreationCrop(result);
  };

    const getCrops = async () => {
      const response = await fetch('http://localhost:3000/v1/crop', {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`        
        },
      });
      const data = await response.json();
      setCrops(data)
    }

    useEffect(() => {
      getCrops()
    }, [creationCrop])

    const { isOpen, onOpen, onClose } = useDisclosure();

    const theme = createTheme({
        components: {
          MuiDataGrid: {
            styleOverrides: {
              columnHeader: {
                backgroundColor: '#3481CE', 
                color: '#fff', 
              },
            },
          },
        },
      });

      useEffect(() => {
        const fetchApiKey = async () => {
          try {
            const response = await fetch('http://localhost:3000/v1/constants?filter=crop', {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`        
            },
          });
            const data = await response.json();
            setCropTypes(data.types);
          } catch (error) {
            console.error('Error al obtener la API key:', error);
          }
        };
    
        fetchApiKey();
      }, []);

      useEffect(() => {
        const fetchApiKey = async () => {
          try {
            const response = await fetch('http://localhost:3000/v1/constants?filter=soil', {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`        
            },
          });
            const data = await response.json();
            setSoilTypes(data.types[0]);
          } catch (error) {
            console.error('Error al obtener la API key:', error);
          }
        };
    
        fetchApiKey();
      }, []);

    return (
    <Flex h="100vh">
        <Sidebar />
        <Flex direction="column" flex="1" p="4">
        <Button onClick={onOpen} my={4}>
            Añadir Nuevo Cultivo
        </Button>
        <Box  p={4}>
            <ThemeProvider theme={theme}>
                <DataTable crops={crops}/>
            </ThemeProvider>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
        <ModalOverlay />
        <ModalContent>
          <FormDataProvider>
            <CropForm cropTypes={cropTypes} soilTypes={soilTypes} onClose={onClose} creationCrop={habldeCreationResult}/>
          </FormDataProvider>

        </ModalContent>
      </Modal>
        </Flex>
    </Flex>
      );
}

export default Crop;