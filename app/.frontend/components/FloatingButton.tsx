import React from 'react';
import Fab from '@mui/material/Fab'; 
import Box from '@mui/material/Box';

interface FloatingButtonProps{
  icon: React.ElementType;
  onClicked: ()=>void
}

const FloatingButton: React.FC<FloatingButtonProps> = ( { icon: Icon, onClicked } ) => {
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab 
        color="primary" 
        aria-label="add"
        onClick={onClicked}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
      >
        <Icon />
      </Fab>
    </Box>
  );
};

export default FloatingButton;