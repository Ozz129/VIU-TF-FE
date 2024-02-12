import React from 'react';
import { Box, VStack, Text, Divider, Flex, Avatar, IconButton, Button } from '@chakra-ui/react';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import { ApiContext } from '../../context/apiKey.context';
import { useContext } from 'react';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import ApiKeyComponent from '../apiKey';
import ForestIcon from '@mui/icons-material/Forest';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useLocation } from 'react-router-dom';

const Sidebar = () => {

    const { apiKey, userName } = useContext(ApiContext);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const isActive = (path) => {
        console.log('----', pathname, '---', path, '---', pathname == path)
        return pathname == path ? 'si' : 'no'
    };

    const activeStyle = {
        backgroundColor: 'gray.700', // Ejemplo de color para la pestaña activa, ajusta según tu tema
    };

    return (
        <Box w="250px" h="100vh" bg="blue.500" color="white" p={5}>
        <VStack align="left" spacing={5}>
            <Flex alignItems="center">
            <Avatar name={userName} />
            <Box ml={3}>
                <Text fontWeight="bold">{userName}</Text>
                <Text fontSize="sm">Date: {new Date().toLocaleDateString()}</Text>
            </Box>
            </Flex>
            <ApiKeyComponent apiKey={apiKey}/>

            <Divider />
            <VStack align="left" spacing={3}>
          
            <Button 
                leftIcon={<DashboardIcon />} 
                variant='solid' 
                onClick={() => {navigate('/dashboard') }}
                style={isActive('/dashboard') == 'si' ? {backgroundColor: 'gray.700'} : {}}
                >
                Dashboard - {isActive('/dashboard').toString()}
            </Button>
            <Button 
                leftIcon={<ForestIcon />} 
                variant='solid' 
                onClick={() => {navigate('/crop') }}
                style={isActive('/crop') ? activeStyle : {}}
                >
                Cultivos - {isActive('/crop').toString()}
            </Button>
            </VStack>
        </VStack>
        </Box>
    );
};

export default Sidebar;
