// ApiContext.js
import React, { createContext, useState, useEffect } from 'react';

export const ApiContext = createContext(null);

export const ApiKeyProvider = ({ children }) => {
    const [apiKey, setApiKey] = useState('');
    const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const response = await fetch('http://localhost:3000/v1/user/api-key', {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`        
        },
      });
        const data = await response.json();
        console.log('DATA:::', data)
        setApiKey(data.data.apiKey);
        setUserName(data.data.fullName)
      } catch (error) {
        console.error('Error al obtener la API key:', error);
      }
    };

    fetchApiKey();
  }, []);

  return (
    <ApiContext.Provider value={{ apiKey, userName }}>
      {children}
    </ApiContext.Provider>
  );
};
