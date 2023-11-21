import { Drawer, IconButton, makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Menu as MenuIcon } from "@material-ui/icons";
import Link from 'next/link';
import { useState } from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import DrawerContent from './DrawerContent';
import LanguageSwitcher from './LanguageSwitcher';


const useStyles = makeStyles((theme) => ({
  appBar: {
    background: '#007B59',
  },
  menuButton: {
    position: 'absolute',
    right: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  headerOptions: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  toolbarCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.3rem',
  },
  iconSpacing: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1.5),
  },
  LanguageSwitcher: {
    marginLeft: '40px',
    marginRight: '-40px',
  },
}));

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const classes = useStyles();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar className={classes.toolbarCenter}>
          <Typography variant="h6" className={classes.title}>
            Naoki Chihara
          </Typography>
          <div className={classes.headerOptions}>
            <Link href="/" passHref><Button color="inherit">Home</Button></Link>
            <Link href="/blog" passHref><Button color="inherit">Blog</Button></Link>
            <Link href="/publications" passHref><Button color="inherit">Publications</Button></Link>
            <Link href="/contact" passHref><Button color="inherit">Contact</Button></Link>
            <div className={classes.toolbarCenter}>
              <a href="https://github.com/C-Naoki" target="_blank" rel="noopener noreferrer" className={classes.toolbarCenter}>
                <FaGithub className={classes.iconSpacing} />
              </a>
              <a href="https://twitter.com/C__Naoki" target="_blank" rel="noopener noreferrer" className={classes.toolbarCenter}>
                <FaTwitter className={classes.iconSpacing} />
              </a>
              <a href="https://www.linkedin.com/in/naoki-chihara-0a35a827a/" target="_blank" rel="noopener noreferrer" className={classes.toolbarCenter}>
                <FaLinkedin className={classes.iconSpacing} />
              </a>
              <a className={classes.LanguageSwitcher}>
                <LanguageSwitcher />
              </a>
            </div>
          </div>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
      >
        <DrawerContent />
      </Drawer>
    </>
  );
};

export default Header;
