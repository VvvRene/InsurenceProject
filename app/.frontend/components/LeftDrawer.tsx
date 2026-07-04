import { Drawer, List, ListItemText, Toolbar, ListItemButton } from '@mui/material';
import { useNavigate } from 'react-router';
import useLeftDrawerStore from '~/.frontend/hooks/userLeftDrawerStore';
import { CollapsibleListItem } from './CollapsibleListItem';
import { useTranslation } from 'react-i18next';

interface LeftDrawerProps {
  isToolbarAdjusted?: boolean;
}

export const LeftDrawer: React.FC<LeftDrawerProps> = ({ isToolbarAdjusted = false }) => {
  const { t } = useTranslation();
  const { isDrawerOpen, closeDrawer } = useLeftDrawerStore();
  const navigate = useNavigate();

  return (
    <Drawer variant="temporary" anchor="left" open={isDrawerOpen} onClose={closeDrawer}>
      {isToolbarAdjusted && <Toolbar />}
      <List sx={{ width: 250 }}>
        <ListItemButton onClick={() => { closeDrawer(); navigate('/'); }}>
          <ListItemText primary={t('nav.dashboard')} />
        </ListItemButton>
        {/* Collapsible List Item for Data Management */}
        <CollapsibleListItem label={t('nav.dataManagement')}>
          <ListItemButton sx={{ pl: 4 }} onClick={() => { closeDrawer(); navigate('/policy'); }} >
            <ListItemText primary={t('nav.policies')} />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => { closeDrawer(); navigate('/client'); }} >
            <ListItemText primary={t('nav.clients')} />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => { closeDrawer(); navigate('/insurance-companies'); }} >
            <ListItemText primary={t('nav.insuranceCompanies')} />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => { closeDrawer(); navigate('/brokers'); }} >
            <ListItemText primary={t('nav.brokers')} />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => { closeDrawer(); navigate('/vehicle-info'); }} >
            <ListItemText primary={t('nav.vehicleInfo')} />
          </ListItemButton>
        </CollapsibleListItem>
        {/* Collapsible List Item for Files Management */}
        <CollapsibleListItem label={t('nav.filesManagement')}>
          {/* Client Files */}
          <ListItemButton sx={{ pl: 4 }} onClick={() => { closeDrawer(); navigate('/client/files'); }} >
            <ListItemText primary={t('nav.clients')} />
          </ListItemButton> 
        </CollapsibleListItem>
        <ListItemButton onClick={() => { closeDrawer(); navigate('/about'); }}>
          <ListItemText primary={t('nav.about')} />
        </ListItemButton>
      </List>
    </Drawer>
  );
}
