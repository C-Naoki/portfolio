import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import BookIcon from '@material-ui/icons/Book';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import DescriptionIcon from '@material-ui/icons/Description';
import HomeIcon from '@material-ui/icons/Home';
import Link from 'next/link';
import styles from '../../styles/header.module.css';
import LanguageSwitcher from './LanguageSwitcher';

const DrawerContent = ({ handleDrawerToggle }: { handleDrawerToggle: any }) => {
  const handleCloseDrawer = () => {
    handleDrawerToggle();
  };

  return (
    <div className={styles.drawerContainer}>
    <List>
      <div className={styles.navigationSection}>
        <Link href="/" passHref>
          <ListItem button className={styles.listItem} onClick={handleCloseDrawer}>
            <ListItemIcon className={styles.navigationIcon}><HomeIcon /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
        <Link href="/blog" passHref>
          <ListItem button className={styles.listItem} onClick={handleCloseDrawer}>
            <ListItemIcon className={styles.navigationIcon}>
              <BookIcon />
            </ListItemIcon>
            <ListItemText primary="Blog" />
          </ListItem>
        </Link>
        <Link href="/publications" passHref>
          <ListItem button className={styles.listItem} onClick={handleCloseDrawer}>
            <ListItemIcon className={styles.navigationIcon}>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary="Publications" />
          </ListItem>
        </Link>
        <Link href="/contact" passHref>
          <ListItem button className={styles.listItem} onClick={handleCloseDrawer}>
            <ListItemIcon className={styles.navigationIcon}>
              <ContactMailIcon />
            </ListItemIcon>
            <ListItemText primary="Contact" />
          </ListItem>
        </Link>
      </div>
      <div className={styles.externalLinkSection}>
        <a href="https://github.com/C-Naoki" target="_blank" rel="noopener noreferrer" className={styles.externalLink}>
          <ListItem button className={styles.listItem}>
            <ListItemIcon className={styles.externalLinkIcon}>
              <FontAwesomeIcon icon={faGithub} className={styles.FontAwesomeIcon} />
            </ListItemIcon>
            <ListItemText primary="GitHub" />
          </ListItem>
        </a>
        <a href="https://twitter.com/C__Naoki" target="_blank" rel="noopener noreferrer" className={styles.externalLink}>
          <ListItem button className={styles.listItem}>
            <ListItemIcon className={styles.externalLinkIcon}>
              <FontAwesomeIcon icon={faTwitter} className={styles.FontAwesomeIcon} />
            </ListItemIcon>
            <ListItemText primary="Twitter" />
          </ListItem>
        </a>
        <a href="https://www.linkedin.com/in/naoki-chihara-0a35a827a/" target="_blank" rel="noopener noreferrer" className={styles.externalLink}>
          <ListItem button className={styles.listItem}>
            <ListItemIcon className={styles.externalLinkIcon}>
              <FontAwesomeIcon icon={faLinkedin} className={styles.FontAwesomeIcon} />
            </ListItemIcon>
            <ListItemText primary="LinkedIn" />
          </ListItem>
        </a>
      </div>
      <ListItem>
        <LanguageSwitcher />
      </ListItem>
    </List>
  </div>
  );
};

export default DrawerContent;
