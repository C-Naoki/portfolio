import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import Link from 'next/link';
import styles from '../../styles/header.module.css';

interface NavigationIconProps {
  href: string;
  icon: React.ElementType;
  text: string;
  onClick: () => void;
}

const NavigationListItem: React.FC<NavigationIconProps> = ({ href, icon: Icon, text, onClick }) => {
  return (
    <Link href={href} passHref>
      <ListItem button className={styles.listItem} onClick={onClick}>
        <ListItemIcon className={styles.navigationIcon}>
          <Icon />
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    </Link>
  );
};

export default NavigationListItem;
