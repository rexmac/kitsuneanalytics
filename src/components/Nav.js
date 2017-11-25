import React from 'react';
import Link from 'gatsby-link';
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
      expanded: false,
      scrollPosition: 0
    };

    this.handleNavClickEvent = this.handleNavClickEvent.bind(this);
    this.handleToggleEvent = this.handleToggleEvent.bind(this);
  }

  handleNavClickEvent() {
    this.setState({
      expanded: false
    });

    // @todo Trigger headroom hide nav?
    setTimeout(() => {this.props.headroomRef.unpin()}, 500);
    //this.props.headroomRef.unpin();

    // Custom scroll logic here to scroll to *top* of page anchor element
    // as some browsers will not scroll at all if even a sliver of the element
    // is still in view at top of page.
  }

  handleToggleEvent() {
    this.setState({
      expanded: !this.state.expanded,
      scrollPosition: window.pageYOffset
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

    /*
    if (expanded) {
      document.body.style.top = -scrollPosition + 'px';
      // document.body.classList.add('show-overlay');
    } else {
      // document.body.classList.remove('show-overlay');
      window.scrollTo(0, scrollPosition);
      document.body.style.top = 0;
    } */

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
                  offset={300}
                >
                  {linkText}
                </Scroll.Link>
              )
              : <Link to={target}>{linkText}</Link>;
            return <li key={target}>{linkElem}</li>
          })}
        </ul>
      </nav>
    )
  }
}

export default Nav;
