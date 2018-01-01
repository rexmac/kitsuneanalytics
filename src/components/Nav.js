import React from 'react';
import PropTypes from 'prop-types';
import Headroom from 'react-headroom';
import { Link}  from 'gatsby-link';
import capitalize from 'lodash/capitalize';
import Scroll from 'react-scroll';
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
      expanded: false
    };

    this.handleNavClickEvent = this.handleNavClickEvent.bind(this);
    this.handleToggleEvent = this.handleToggleEvent.bind(this);
  }

  handleNavClickEvent() {
    this.setState({
      expanded: false
    });

    setTimeout(() => {this.props.headroomRef.unpin()}, 500);
  }

  handleToggleEvent() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  render() {
    const { expanded } = this.state;

    if(typeof document !== 'undefined') {
      // When dropping support for IE11, replace the if block below with the single line, two-argument toggle:
      //   document.body.classList.toggle('has-overlay', expanded);
      if (document.body.classList.contains('has-overlay')) {
        if (! expanded) {
          document.body.classList.remove('has-overlay');
        }
      } else if (expanded) {
        document.body.classList.add('has-overlay');
      }
    }

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
    )
  }
}

Nav.propTypes = {
  headroomRef: PropTypes.instanceOf(Headroom).isRequired
};

export default Nav;
