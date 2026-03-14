import { useState } from 'react';
import type { SyntheticEvent } from 'react';

export const useTabs = (initialValue: number = 0) => {
  const [activeTab, setActiveTab] = useState<number>(initialValue);
  const handleTabChange = (_: SyntheticEvent, newValue: number) => setActiveTab(newValue);
  return { activeTab, handleTabChange };
};