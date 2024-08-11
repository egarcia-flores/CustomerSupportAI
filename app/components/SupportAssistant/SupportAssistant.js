import { Box, Stack } from '@mui/material';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { useChat } from '../../hooks/useChat.hooks';

export const SupportAssistant = () => {
  const {
    messages,
    message,
    setMessage,
    sendMessage,
    isLoading,
    handleKeyPress,
    messagesEndRef
  } = useChat();

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      paddingTop={8}
      alignItems="center"
    >
      <Stack
        direction={'column'}
        width="500px"
        height="700px"
        border="1px solid black"
        p={2}
        spacing={3}
      >
        <MessageList messages={messages} messagesEndRef={messagesEndRef} />
        <MessageInput
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          isLoading={isLoading}
          handleKeyPress={handleKeyPress}
        />
      </Stack>
    </Box>
  );
}