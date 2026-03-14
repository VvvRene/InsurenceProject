import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Stack,
  Box
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu'
import ThemeToggle from './ThemeToggle';
import useLeftDrawerStore from '~/hooks/userLeftDrawerStore';
import { LeftDrawer } from './LeftDrawer';

const TopNavBar: React.FC = () => {
  const { toggleDrawer } = useLeftDrawerStore();
  return (
    <>
      <AppBar position="relative" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} >
        <Toolbar>
          <IconButton onClick={toggleDrawer}><MenuIcon className="text-gray-100" /></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Insurance Management System
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Stack direction="row" spacing={2}>
              {/* <Button color="inherit">Home</Button>
            <Button color="inherit">Products</Button>
            <Button color="inherit">About</Button>  */}
              <ThemeToggle />
            </Stack>
          </Box>
        </Toolbar>
      </AppBar>
      <Box>
        <LeftDrawer isToolbarAdjusted={true} />
      </Box>
    </>
  );
};

export default TopNavBar;