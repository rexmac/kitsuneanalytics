import React from 'react';
import Link from 'gatsby-link';
import Nav from './Nav';
import styles from './SiteHeader.module.scss';
import logo from '../img/logo--kitsune--white.svg';

const SiteHeader = (props) => (
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
    <Nav headroomRef={props.headroomRef} />
  </header>
);

export default SiteHeader;
