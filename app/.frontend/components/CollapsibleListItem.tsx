import { useState } from 'react';
import { List, ListItemButton, ListItemText, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface CollapsibleListItemProps {
  label: string;
  children: React.ReactNode;
  initialOpen?: boolean;
}

export function CollapsibleListItem({ 
  label, 
  children, 
  initialOpen = false 
}: CollapsibleListItemProps) {
  const [open, setOpen] = useState(initialOpen);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={label} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children}
        </List>
      </Collapse>
    </>
  );
}