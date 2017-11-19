import React from 'react';
import Link from 'gatsby-link';
import capitalize from 'lodash/capitalize';
import styles from './Nav.module.scss';

const pages = [
  { dest: 'services' },
  { dest: 'team', linkText: 'Meet the Team' },
  { dest: 'contact' }
];

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      scrollPosition: 0
    };

    this.handleToggleEvent = this.handleToggleEvent.bind(this);
  }

  handleToggleEvent() {
    this.setState({
      expanded: !this.state.expanded,
      scrollPosition: window.pageYOffset
    });
  }

  render() {
    const expanded = this.state.expanded;
    const scrollPosition = this.state.scrollPosition;
    document.body.classList.toggle('has-overlay', expanded);

    /*
    if (expanded) {
      document.body.style.top = -scrollPosition + 'px';
      // document.body.classList.add('show-overlay');
    } else {
      // document.body.classList.remove('show-overlay');
      window.scrollTo(0, scrollPosition);
      document.body.style.top = 0;
    }*/

    return (
      <nav className={styles['site-nav']}>
        <input
          className={styles.trigger}
          type="checkbox"
          id="mainNavButton"
          tabIndex="-1"
          checked={expanded}
          onClick={this.handleToggleEvent}
        />
        <label htmlFor="mainNavButton">
          <span className="sr-only">Menu</span>
          <div className={styles.hamburger}>
            <span />
            <span />
            <span />
          </div>
        </label>
        <ul className={styles.menu}>
          {pages.map((p) => {
            const linkText = p.linkText || capitalize(p.dest);
            // eslint-disable-next-line no-nested-ternary
            const target = p.dest
              ? p.dest.substr(0, 1) !== '/'
                ? `#${p.dest}`
                : `${p.dest}/`
              : '/';
            const linkElem = target.substr(0, 1) === '#'
              ? <a href={target} onClick={this.handleToggleEvent}>{linkText}</a>
              : <Link to={target}>{linkText}</Link>;
            return <li key={target}>{linkElem}</li>
          })}
        </ul>
      </nav>
    )
  }
}

export default Nav;
