import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import BookIcon from '@material-ui/icons/Book';
import DescriptionIcon from '@material-ui/icons/Description';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';

const useStyles = makeStyles((theme) => ({
  link: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
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
}));

const DrawerContent = ({ handleDrawerToggle }: { handleDrawerToggle: any }) => {
  const classes = useStyles();

  const handleCloseDrawer = () => {
    handleDrawerToggle();
  };

  return (
    <div className={classes.drawerContainer}>
    <List>
      <div className={classes.navigationSection}>
        <Link href="/" passHref>
          <ListItem button className={classes.listItem} onClick={handleCloseDrawer}>
            <ListItemIcon className={classes.icon}><HomeIcon /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
        <Link href="/blog" passHref>
          <ListItem button className={classes.listItem} onClick={handleCloseDrawer}>
            <ListItemIcon className={classes.icon}><BookIcon /></ListItemIcon>
            <ListItemText primary="Blog" />
          </ListItem>
        </Link>
        <Link href="/publications" passHref>
          <ListItem button className={classes.listItem} onClick={handleCloseDrawer}>
            <ListItemIcon className={classes.icon}><DescriptionIcon /></ListItemIcon>
            <ListItemText primary="Publications" />
          </ListItem>
        </Link>
        <Link href="/contact" passHref>
          <ListItem button className={classes.listItem} onClick={handleCloseDrawer}>
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

export default DrawerContent;
