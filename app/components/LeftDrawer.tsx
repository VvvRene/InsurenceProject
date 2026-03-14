import { Drawer, Button, List, ListItem, ListItemText, Toolbar } from '@mui/material'; 
import { Router, useNavigate } from 'react-router';
import useLeftDrawerStore from '~/hooks/userLeftDrawerStore';

interface LeftDrawerProps { 
  isToolbarAdjusted?: boolean;
}

export const LeftDrawer: React.FC<LeftDrawerProps> = ({ isToolbarAdjusted = false }) => {
  const { isDrawerOpen, closeDrawer } = useLeftDrawerStore(); 
  const navigate = useNavigate();
  return (
    <Drawer variant="temporary" anchor="left" open={isDrawerOpen} onClose={closeDrawer}>
      { isToolbarAdjusted && <Toolbar /> }
      <List sx={{ width: 250 }}>
        <ListItem onClick={() => { closeDrawer(); navigate('/'); }}>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem onClick={() => { closeDrawer(); navigate('/about'); }}>
          <ListItemText primary="About" />
        </ListItem>
      </List>
    </Drawer>
  );
} 