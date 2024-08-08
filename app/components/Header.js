'use client'
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { Box, Button, Typography } from "@mui/material";
import { styled } from '@mui/system';
const StyledSignInButton = styled(SignInButton)({
  backgroundColor: '#3f51b5', // Material UI primary color
  color: 'white',
  border: 'none',
  padding: '8px 16px',
  textTransform: 'none',
  cursor: 'pointer',
  borderRadius: '4px',
  '&:hover': {
    backgroundColor: '#002984', // Darker shade of primary color
  },
});

function Header() {
  const { user } = useUser();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px',
        backgroundColor: '#f5f5f5',
        width: '100%',
        borderBottom: '1px solid #ddd',
      }}
    >
      <Typography variant="h6">
        {user ? `Welcome ${user.firstName}` : 'Welcome'}
      </Typography>
      <Box>
        <SignedOut>
          <StyledSignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </Box>
    </Box>
  );
}

export default Header;
