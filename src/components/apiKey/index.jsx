import React, { useState } from 'react';
import { Box, Text, Input, Button, useClipboard, Flex, Tooltip } from '@chakra-ui/react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
const ApiKeyComponent = ({ apiKey }) => {
  const { hasCopied, onCopy } = useClipboard(apiKey);
  const [isTooltipOpen, setTooltipOpen] = useState(false);

  const handleMouseLeave = () => {
    setTooltipOpen(false);
  };

  const handleCopyClick = () => {
    onCopy();
    setTooltipOpen(true);
  };

  return (
    <Flex align="center" justify="space-between" p={2} bg="gray.100" borderRadius="md" boxShadow="sm">
      <Text fontSize="sm" fontWeight="semibold" mr={2} color="black">
        Key:
      </Text>
      <Input fontSize="sm" value={apiKey} isReadOnly variant="unstyled" flexGrow={1} mr={2} color="black" />
      <Tooltip label={hasCopied ? "Copied!" : "Copy to clipboard"} isOpen={isTooltipOpen} placement="top" hasArrow>
        <Button onClick={handleCopyClick} onMouseLeave={handleMouseLeave} size="sm" variant="ghost">
          <ContentCopyIcon />
        </Button>
      </Tooltip>
    </Flex>
  );
};

export default ApiKeyComponent;