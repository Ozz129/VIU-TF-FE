import React, { useState } from 'react';
import { Box, Button, Input, VStack, Heading, Text, Link, Image } from '@chakra-ui/react';

const LoginPage = () => {
  const [user, setUser] = useState({
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState([]);

  // Actualizar el estado del usuario basado en el input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  // Función para manejar el login
  const handleLogin = async () => {
    // Validación de campos vacíos
    if (!user.username || !user.password) {
      setErrors(['Please fill in all fields.']);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login success:', data);
        // Aquí puedes redireccionar al usuario o hacer algo con los datos de login
      } else {
        throw new Error(data.message || 'An error occurred during login.');
      }
    } catch (error) {
      setErrors([error.message]);
    }
  };

  return (
    <Box minH="100vh" minW="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" bg="blue.50">
      <VStack spacing={4} w="full" maxW="md" p={5} boxShadow="md" bg="white" rounded="lg">
        <Image
          src="https://cdn3.iconfinder.com/data/icons/internet-of-things-flat-7/64/Internet_of_Things_flat-38-512.png"
          alt="AquaControl Logo"
          boxSize="100px"
          objectFit="cover"
          marginBottom="4"
        />
        <Heading as="h1" size="xl" color="blue.600">AquaControl</Heading>
        <Input name="username" placeholder="Username" onChange={handleInputChange} />
        <Input name="password" placeholder="Password" type="password" onChange={handleInputChange} />
        <Button colorScheme="blue" w="full" onClick={handleLogin}>Login</Button>
        {errors.length > 0 && <Text color="red.500">{errors.join(', ')}</Text>}
        <Text>Don't have an account?</Text>
        <Button variant="outline" colorScheme="green">Register</Button>
      </VStack>
    </Box>
  );
};

export default LoginPage;
