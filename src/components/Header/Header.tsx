import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Drawer, IconButton, List, ListItem, ListItemText, makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Menu as MenuIcon } from "@material-ui/icons";
import HomeIcon from '@material-ui/icons/Home';
import BookIcon from '@material-ui/icons/Book';
import DescriptionIcon from '@material-ui/icons/Description';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import Link from 'next/link';
import { useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';


const useStyles = makeStyles((theme) => ({
  link: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
  menuButton: {
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
  drawerContainer: {
    width: 250,
  },
  icon: {
    minWidth: '35px',
    color: 'rgba(0, 0, 0, 0.54)',
    marginRight: '4px',
  },
  listItem: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    '&:not(:last-child)': {
      marginBottom: theme.spacing(1),
    },
    '& .MuiListItemIcon-root': {
      minWidth: '35px',
    },
    '& .MuiListItemText-primary': {
      marginLeft: '6px',
    },
  },
  navigationSection: {
    paddingBottom: theme.spacing(2),
  },
  externalLinkSection: {
    paddingTop: theme.spacing(2),
  },
  externalIcon: {
    fontSize: '1.5rem',
    width: '20px',
    height: '20px',
  },
  languageSwitcher: {
    marginLeft: 'auto',
  },
  listItemIcon: {
    marginLeft: '3px',
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.3rem',
  },
  iconSpacing: {
    margin: theme.spacing(1),
  },
}));

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const classes = useStyles();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const renderDrawer = () => {
    const classes = useStyles();
    return (
      <div className={classes.drawerContainer}>
        <List>
          <div className={classes.navigationSection}>
            <Link href="/" passHref>
              <ListItem button className={classes.listItem}>
                <ListItemIcon className={classes.icon}><HomeIcon /></ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </Link>
            <Link href="/blog" passHref>
              <ListItem button className={classes.listItem}>
                <ListItemIcon className={classes.icon}><BookIcon /></ListItemIcon>
                <ListItemText primary="Blog" />
              </ListItem>
            </Link>
            <Link href="/publications" passHref>
              <ListItem button className={classes.listItem}>
                <ListItemIcon className={classes.icon}><DescriptionIcon /></ListItemIcon>
                <ListItemText primary="Publications" />
              </ListItem>
            </Link>
            <Link href="/contact" passHref>
              <ListItem button className={classes.listItem}>
                <ListItemIcon className={classes.icon}><ContactMailIcon /></ListItemIcon>
                <ListItemText primary="Contact" />
              </ListItem>
            </Link>
          </div>
          <div className={classes.externalLinkSection}>
            <a href="https://github.com/C-Naoki" target="_blank" rel="noopener noreferrer" className={classes.link}>
              <ListItem button className={classes.listItem}>
                <ListItemIcon className={classes.listItemIcon}><FontAwesomeIcon icon={faGithub} className={classes.externalIcon} /></ListItemIcon>
                <ListItemText primary="GitHub" />
              </ListItem>
            </a>
            <a href="https://twitter.com/C__Naoki" target="_blank" rel="noopener noreferrer" className={classes.link}>
              <ListItem button className={classes.listItem}>
                <ListItemIcon className={classes.listItemIcon}><FontAwesomeIcon icon={faTwitter} className={classes.externalIcon} /></ListItemIcon>
                <ListItemText primary="Twitter" />
              </ListItem>
            </a>
            <a href="https://www.linkedin.com/in/naoki-chihara-0a35a827a/" target="_blank" rel="noopener noreferrer" className={classes.link}>
              <ListItem button className={classes.listItem}>
                <ListItemIcon className={classes.listItemIcon}><FontAwesomeIcon icon={faLinkedin} className={classes.externalIcon} /></ListItemIcon>
                <ListItemText primary="LinkedIn" />
              </ListItem>
            </a>
          </div>
          <ListItem className={classes.languageSwitcher}>
            <LanguageSwitcher />
          </ListItem>
        </List>
      </div>
    );
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Naoki Chihara
          </Typography>
          <div className={classes.headerOptions}>
            <Link href="/" passHref><Button color="inherit">Home</Button></Link>
            <Link href="/blog" passHref><Button color="inherit">Blog</Button></Link>
            <Link href="/publications" passHref><Button color="inherit">Publications</Button></Link>
            <Link href="/contact" passHref><Button color="inherit">Contact</Button></Link>
            <LanguageSwitcher />
            <div>
              <a href="https://github.com/C-Naoki" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGithub} className={classes.iconSpacing} />
              </a>
              <a href="https://twitter.com/C__Naoki" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} className={classes.iconSpacing} />
              </a>
              <a href="https://www.linkedin.com/in/naoki-chihara-0a35a827a/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} className={classes.iconSpacing} />
              </a>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
      >
        {renderDrawer()}
      </Drawer>
    </>
  );
};

export default Header;
