import { Drawer, Button, List, ListItem, ListItemText, Toolbar } from '@mui/material';
import { Link, Router, useNavigate } from 'react-router';
import useLeftDrawerStore from '~/hooks/userLeftDrawerStore';

interface LeftDrawerProps {
  isToolbarAdjusted?: boolean;
}

export const LeftDrawer: React.FC<LeftDrawerProps> = ({ isToolbarAdjusted = false }) => {
  const { isDrawerOpen, closeDrawer } = useLeftDrawerStore();
  const navigate = useNavigate();
  return (
    <Drawer variant="temporary" anchor="left" open={isDrawerOpen} onClose={closeDrawer}>
      {isToolbarAdjusted && <Toolbar />}
      <List sx={{ width: 250 }}>
        <ListItem onClick={() => { closeDrawer(); navigate('/'); }}>
          <Link reloadDocument to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemText primary="Dashboard" />
          </Link>
        </ListItem>
        <ListItem onClick={() => { closeDrawer(); navigate('/about'); }}>
          <Link reloadDocument to="/about" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemText primary="About" />
          </Link>
        </ListItem>
      </List>
    </Drawer>
  );
} 