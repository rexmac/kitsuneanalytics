import React from 'react';
import PropTypes from 'prop-types';
import Headroom from 'react-headroom';
import { Link } from 'gatsby-link';
import Scroll from 'react-scroll';
import capitalize from 'lodash/capitalize';
import styles from './SiteFooter.module.scss';
import logo from '../img/logo--kitsune--white.svg';

const pages = [
  { dest: 'services' },
  { dest: 'team', linkText: 'Meet the Team' },
  { dest: 'contact' }
];

class SiteFooter extends React.Component {
  constructor(props) {
    super(props);

    this.handleNavClickEvent = this.handleNavClickEvent.bind(this);
  }

  handleNavClickEvent() {
    setTimeout(() => {this.props.headroomRef.unpin()}, 500);
  }

  render() {

    return (
      <footer className={styles['site-footer']}>
        <section className={styles.copyright}>
          &copy; {new Date().getFullYear()} Kitsune Analytics, LLC.
        </section>

        <aside className={styles.branding}>
          <img
            className="logo"
            src={logo}
            width="53"
            height="50"
            alt="Kitsune Analytics logo"
          />
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
                ? (
                  <Scroll.Link
                    to={target.substr(1)}
                    spy
                    smooth
                    duration={500}
                    onClick={this.handleNavClickEvent}
                    offset={0}
                  >
                    {linkText}
                  </Scroll.Link>
                )
                : <Link to={target}>{linkText}</Link>; // eslint-disable-line jsx-a11y/anchor-is-valid
                  return <li key={target}>{linkElem}</li>
              })}
          </ul>
        </nav>
      </footer>
    );
  }
}

SiteFooter.propTypes = {
  headroomRef: PropTypes.instanceOf(Headroom).isRequired
};

export default SiteFooter;
