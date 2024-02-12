import React from 'react';
import { Text, Flex } from '@chakra-ui/react';

const TableTitle = ({ text, icon }) => {
  return (
    <Flex align="center" gap="2"> {/* Asegura alineación vertical y espacio entre ícono y texto */}
      {icon}
      <Text fontSize="md">{text}</Text>
    </Flex>
  );
};

export default TableTitle;
