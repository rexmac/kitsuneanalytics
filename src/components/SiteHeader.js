import React from 'react';
import PropTypes from 'prop-types';
import Headroom from 'react-headroom';
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
        <Link to='/' href>
          <strong>Kitsune</strong><br />Analytics
        </Link>
      </div>
    </aside>
    <Nav headroomRef={props.headroomRef} />
  </header>
);

SiteHeader.propTypes = {
  headroomRef: PropTypes.instanceOf(Headroom).isRequired
};

export default SiteHeader;
