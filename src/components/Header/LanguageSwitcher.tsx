import { FaGithub, FaGlobe } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormControl, IconButton, Menu, MenuItem, Select, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { useState } from 'react';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
    "& .MuiSvgIcon-root": {
      color: theme.palette.text.secondary,
    },
  },
  select: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
  },
  globeIcon: {
    marginLeft: '20px',
  }
}));

const LanguageSwitcher = () => {
  const classes = useStyles();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLocaleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    router.push(router.pathname, router.asPath, { locale: event.target.value as string });
    handleCloseMenu();
  };

  const handleLocaleMenuItemClick = (locale: string) => {
    router.push(router.pathname, router.asPath, { locale });
    handleCloseMenu();
  };

  return (
    <>
      {isDesktop && (
        <IconButton color="inherit" onClick={handleMenu}>
          <FaGlobe fontSize="large" />
        </IconButton>
      )}
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={() => handleLocaleMenuItemClick('en')}>🇺🇸 English</MenuItem>
        <MenuItem onClick={() => handleLocaleMenuItemClick('ja')}>🇯🇵 日本語</MenuItem>
      </Menu>
      {isMobile && (
        <FormControl className={classes.formControl}>
          <Select
            value={router.locale}
            onChange={handleLocaleChange}
            className={classes.select}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="en">🇺🇸 English</MenuItem>
            <MenuItem value="ja">🇯🇵 日本語</MenuItem>
          </Select>
        </FormControl>
      )}
    </>
  );
};

export default LanguageSwitcher;
