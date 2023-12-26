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
import ThemeSwitcher from './ThemeSwitcher';

type AnimatedButtonProps = {
  href: string;
  children: React.ReactNode;
};

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: 'var(--header-color)',
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
  ThemeSwitcher: {
    marginLeft: '35px',
    marginRight: '-40px',
  },
  buttonLine: {
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      width: '100%',
      height: '1px',
      bottom: '0',
      left: '0',
      backgroundColor: '#d4d4d4',
      transform: 'scaleX(0)',
      transition: 'transform 0.3s ease-in-out',
      transformOrigin: 'center top',
    },
    '&:hover::before': {
      transform: 'scaleX(1)',
      transformOrigin: 'center top',
    },
  },
}));

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ href, children }) => {
  const classes = useStyles();
  return (
    <Link href={href} passHref>
      <Button className={classes.buttonLine} color="inherit">
        {children}
      </Button>
    </Link>
  );
};

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const classes = useStyles();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbarCenter}>
          <Typography variant="h6" className={classes.title}>
            Naoki Chihara
          </Typography>
          <div className={classes.headerOptions}>
            <AnimatedButton href="/">Home</AnimatedButton>
            <AnimatedButton href="/blog">Blog</AnimatedButton>
            <AnimatedButton href="/publications">Publications</AnimatedButton>
            <AnimatedButton href="/contact">Contact</AnimatedButton>
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
              <a className={classes.ThemeSwitcher}>
                <ThemeSwitcher />
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
