import React from 'react';
import { Box, Tabs, Tab, Paper } from '@mui/material';
import { motion, AnimatePresence } from "motion/react";
import { useTabs } from '~/.frontend/hooks/useTabs';

// Define the shape of each tab object
export interface TabItem {
  label: string;
  content: React.ReactNode;
}

interface TabsLayoutProps {
  tabs: TabItem[];
}

export const TabsLayout: React.FC<TabsLayoutProps> = ({ tabs }) => {
  const { activeTab, handleTabChange } = useTabs(0);

  return (
    <Box>
       <Tabs 
          value={activeTab} 
          textColor="inherit"
          indicatorColor="primary"
          variant="scrollable" 
          scrollButtons="auto"
          onChange={handleTabChange}
        >
          {tabs.map((tab, index) => (
            <Tab key={tab.label} label={tab.label} id={`tab-${index}`} />
          ))}
        </Tabs>

      {/* Animation Container */}
      <Paper sx={{ position: 'relative', minHeight: '200px', p: 1 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab} // Key change triggers the animation
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {tabs[activeTab]?.content}
          </motion.div>
        </AnimatePresence>
      </Paper>
    </Box>
  );
};