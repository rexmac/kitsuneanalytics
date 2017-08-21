import React from 'react';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers';
import capitalize from 'lodash/capitalize';
import styles from './SiteHeader.module.css';
import { goToAnchor } from 'react-scrollable-anchor'

const pages = [
  { dest: 'services' },
  { dest: 'team', linkText: 'Meet the Team' },
  { dest: 'contact' }
];

export default class SiteHeader extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    /*const anchorHash = event.target.href.split('#')[1];
    const windowHash = window.location.hash.replace('#', '');

    if(anchorHash === windowHash) {
      goToAnchor(`#${anchorHash}`);
    }*/
  }

  render() {
    return (
      <header className={styles['site-header']}>
        <aside className={styles['branding']}>
          <img className="logo" src={prefixLink('/img/logo--kitsune--white.svg')} width="53" height="50"
               alt="Kitsune Analytics logo"/>
          <div className={styles['name-title']}>
            <Link to={prefixLink('/')}>
              <strong>Kitsune</strong>Analytics
            </Link>
          </div>
        </aside>
        <nav className={styles['site-nav']}>
          <ul>
            {pages.map((p, i) => {
              const linkText = p.linkText || capitalize(p.dest)
              const target = p.dest
                ? p.dest.substr(0, 1) !== '/'
                  ? `#${p.dest}`
                  : `${p.dest}/`
                : '/';
              const linkElem = target.substr(0, 1) === '#'
                ? <a href={target} onClick={this.handleClick}>{linkText}</a>
                : <Link to={target}>{linkText}</Link>;
              return <li key={i}>{linkElem}</li>
            })}
          </ul>
        </nav>
      </header>
    )
  }
}
