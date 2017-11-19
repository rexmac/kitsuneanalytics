import React from 'react';
import Link from 'gatsby-link';
import capitalize from 'lodash/capitalize';
import Nav from './Nav';
import styles from './SiteHeader.module.scss';
import logo from '../img/logo--kitsune--white.svg';

const pages = [
  { dest: 'services' },
  { dest: 'team', linkText: 'Meet the Team' },
  { dest: 'contact' }
];

const SiteHeader = () => (
  <header className={styles['site-header']}>
    <aside className={styles.branding}>
      <img
        className="logo"
        src={logo}
        width="53"
        height="50"
        alt="Kitsune Analytics logo"
      />
      <div className={styles['name-title']}>
        <Link to='/'>
          <strong>Kitsune</strong><br />Analytics
        </Link>
      </div>
    </aside>
    <Nav />
  </header>
);

export default SiteHeader;
