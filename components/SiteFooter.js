import React from 'react';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers';
import capitalize from 'lodash/capitalize';
import styles from './SiteFooter.module.css';

const pages = [
  { dest: 'services' },
  { dest: 'meet-the-team', linkText: 'Meet the Team' },
  { dest: 'contact' }
];

const SiteFooter = () =>
  <footer className={styles['site-footer']}>
    <section className={styles['copyright']}>
      &copy; {new Date().getFullYear()} Kitsune Analytics, LLC.
    </section>

    <aside className={styles['branding']}>
      <img className="logo" src={prefixLink('/img/logo--kitsune--white.svg')} width="53" height="50" alt="Kitsune Analytics logo" />
    </aside>

    <nav className={styles['site-nav']}>
      <ul>
        {pages.map((p, i) => {
          const linkText = p.linkText || capitalize(p.dest);
          const target = p.dest
            ? p.dest.substr(0, 1) !== '/'
              ? `/#${p.dest}`
              : `${p.dest}/`
            : '/';
          const linkElem = target.substr(0, 1) === '#'
            ? <a href={target}>{linkText}</a>
            : <Link to={target}>{linkText}</Link>;
          return <li key={i}>{linkElem}</li>
        })}
      </ul>
    </nav>
  </footer>;

export default SiteFooter;