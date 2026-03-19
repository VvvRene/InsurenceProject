import { useState } from 'react';
import { Drawer, Button, List, ListItem, ListItemText, Toolbar, ListItemButton, Collapse } from '@mui/material';
import { Link, Router, useNavigate } from 'react-router';
import useLeftDrawerStore from '~/.frontend/hooks/userLeftDrawerStore';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { CollapsibleListItem } from './CollapsibleListItem';

interface LeftDrawerProps {
  isToolbarAdjusted?: boolean;
}

export const LeftDrawer: React.FC<LeftDrawerProps> = ({ isToolbarAdjusted = false }) => {
  const { isDrawerOpen, closeDrawer } = useLeftDrawerStore();
  const [openFiles, setOpenFiles] = useState(false);
  const navigate = useNavigate();

  const handleFilesClick = () => {
    setOpenFiles(!openFiles);
  };

  return (
    <Drawer variant="temporary" anchor="left" open={isDrawerOpen} onClose={closeDrawer}>
      {isToolbarAdjusted && <Toolbar />}
      <List sx={{ width: 250 }}>
        <ListItemButton onClick={() => { closeDrawer(); navigate('/'); }}>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        {/* Collapsible List Item for Data Management */}
        <CollapsibleListItem label="Data Management">
          <ListItemButton sx={{ pl: 4 }} onClick={() => { closeDrawer(); navigate('/client'); }} >
            <ListItemText primary="Clients" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => { closeDrawer(); navigate('/playground'); }} >
            <ListItemText primary="Agents" />
          </ListItemButton>
        </CollapsibleListItem>
        {/* Collapsible List Item for Files Management */}
        <CollapsibleListItem label="Files Management">
          {/* Client Files */}
          <ListItemButton sx={{ pl: 4 }} onClick={() => { closeDrawer(); navigate('/client/files'); }} >
            <ListItemText primary="Clients" />
          </ListItemButton>
          {/* Agent Files */}
          <ListItemButton sx={{ pl: 4 }} onClick={() => { closeDrawer(); navigate('/agent/files'); }} >
            <ListItemText primary="Agents" />
          </ListItemButton>
        </CollapsibleListItem>
        <ListItemButton onClick={() => { closeDrawer(); navigate('/about'); }}>
          <ListItemText primary="About" />
        </ListItemButton>
      </List>
    </Drawer>
  );
} 