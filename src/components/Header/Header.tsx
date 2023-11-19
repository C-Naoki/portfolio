import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';


const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1, fontSize: '1.3rem' }}>
          Naoki Chihara
        </Typography>
        <Link href="/" style={{ marginRight: '60px' }} passHref><Button color="inherit">Home</Button></Link>
        <Link href="/blog" style={{ marginRight: '60px' }} passHref><Button color="inherit">Blog</Button></Link>
        <Link href="/publications" style={{ marginRight: '60px' }} passHref><Button color="inherit">Publications</Button></Link>
        <Link href="/contact" style={{ marginRight: '48px' }} passHref><Button color="inherit">Contact</Button></Link>
        <LanguageSwitcher/>
        <div>
        <a href="https://github.com/C-Naoki" target="_blank" rel="noopener noreferrer" style={{ marginLeft: '20px', marginRight: '20px' }}>
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <a href="https://twitter.com/C__Naoki" target="_blank" rel="noopener noreferrer" style={{ marginRight: '20px' }}>
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="https://www.linkedin.com/in/naoki-chihara-0a35a827a/" target="_blank" rel="noopener noreferrer" style={{ marginRight: '50px' }}>
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
