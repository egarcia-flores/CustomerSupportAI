import React from 'react';
import { Box, Stack } from '@mui/material';

export const MessageList = ({ messages, messagesEndRef }) => {
  return (
    <Stack
      direction={'column'}
      spacing={2}
      flexGrow={1}
      overflow="auto"
      maxHeight="100%"
    >
      {messages.map((message, index) => (
        <Box
          key={index}
          display="flex"
          justifyContent={
            message.role === 'assistant' ? 'flex-start' : 'flex-end'
          }
        >
          <Box
            bgcolor={
              message.role === 'assistant'
                ? 'primary.main'
                : 'secondary.main'
            }
            color="white"
            borderRadius={16}
            p={3}
          >
            {message.content}
          </Box>
        </Box>
      ))}
      <div ref={messagesEndRef} />
    </Stack>
  );
};
