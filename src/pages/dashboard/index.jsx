import React, { useEffect } from 'react';
import { Box, Flex, IconButton, Spacer } from '@chakra-ui/react';
import CloseIcon from '@mui/icons-material/Close';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import Sidebar from '../../components/sideBar';

// Datos de muestra para las gráficas
const data = [
  { name: 'Enero', Temperatura: 20, Humedad: 40 },
  { name: 'Febrero', Temperatura: 25, Humedad: 35 },
  { name: 'Marzo', Temperatura: 22, Humedad: 45 },
  // ...más datos
];

const Dashboard = () => {
    useEffect(() => {

    })
  return (
    <Flex h="100vh">
      <Sidebar />
      <Flex direction="column" flex="1" p="4">
        <Flex w="full" justifyContent="flex-end" mb="4">
          <IconButton
            icon={<CloseIcon />}
            aria-label="Cerrar sesión"
            // Aquí puedes añadir tu función para manejar el cierre de sesión
          />
        </Flex>
        <Spacer />
        <Box flex="1" p="6" rounded="md" bg="white">
          {/* Gráfica de líneas */}
          <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="Temperatura" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
          </LineChart>
          {/* Gráfica de barras */}
          <BarChart width={600} height={300} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Humedad" fill="#82ca9d" />
          </BarChart>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
