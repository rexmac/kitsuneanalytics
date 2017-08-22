import React from 'react';
import Link from 'gatsby-link';
import capitalize from 'lodash/capitalize';
import styles from './SiteHeader.module.css';
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
          <strong>Kitsune</strong>Analytics
        </Link>
      </div>
    </aside>
    <nav className={styles['site-nav']}>
      <ul>
        {pages.map((p) => {
          const linkText = p.linkText || capitalize(p.dest);
          // eslint-disable-next-line no-nested-ternary
          const target = p.dest
            ? p.dest.substr(0, 1) !== '/'
              ? `#${p.dest}`
              : `${p.dest}/`
            : '/';
          const linkElem = target.substr(0, 1) === '#'
            ? <a href={target}>{linkText}</a>
            : <Link to={target}>{linkText}</Link>;
          return <li key={target}>{linkElem}</li>
        })}
      </ul>
    </nav>
  </header>
);

export default SiteHeader;
