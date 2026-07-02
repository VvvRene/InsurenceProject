import React from 'react';
import { IconButton, Menu, MenuItem, ListItemText } from '@mui/material';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'zh-TW', label: '繁', name: '繁體中文' },
];

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    handleClose();
  };

  const currentLang = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{
          color: 'inherit',
          border: 1,
          borderColor: 'divider',
          borderRadius: 1,
          px: 1,
          fontSize: '0.875rem',
          fontWeight: 600,
          minWidth: 40,
        }}
      >
        {currentLang.label}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            selected={i18n.language === lang.code}
          >
            <ListItemText>{lang.name}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageSwitcher;