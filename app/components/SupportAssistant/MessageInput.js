import React from 'react';
import { Stack, TextField, Button } from '@mui/material';

export const MessageInput = ({ message, setMessage, sendMessage, isLoading, handleKeyPress }) => {
  return (
    <Stack direction={'row'} spacing={2}>
      <TextField
        label="Message"
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={isLoading}
      />
      <Button 
        variant="contained" 
        onClick={sendMessage} 
        disabled={isLoading}
      >
        {isLoading ? 'Sending...' : 'Send'}
      </Button>
    </Stack>
  );
};
