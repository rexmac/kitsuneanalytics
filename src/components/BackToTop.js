import React from 'react';
import raf from 'raf';
import PropTypes from 'prop-types';
import jump from 'jump.js';
import styles from './BackToTop.module.css';


function getScrollY() {
  if (typeof window === 'undefined') {
    return 0;
  }

  if (window.pageYOffset !== undefined) {
    return window.pageYOffset;
  } else if (window.scrollTop !== undefined) {
    return window.scrollTop;
  }

  return (document.documentElement || document.body.parentNode || document.body).scrollTop;
}

class BackToTop extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hidden: true,
      pinHeight: '99999px',
      intervalId: 0
    };

    this.handlingScrollUpdate = false;
    this.handleScroll = this.handleScroll.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (!this.handlingScrollUpdate) {
      this.handlingScrollUpdate = true;
      raf(this.update);
    }
  }

  update() {
    const currentScrollY = getScrollY();
    const footerHeight = 106;
    const pinHeight = document.body.scrollHeight - document.documentElement.clientHeight - footerHeight;
    // console.log('currentScrollY', currentScrollY);
    // console.log('pinHeight', pinHeight);
    // console.log('document.body.scrollHeight', document.body.scrollHeight);
    // console.log('document.documentElement.clientHeight', document.documentElement.clientHeight);
    // console.log('this.props.scrollInHeight', this.props.scrollInHeight);

    this.setState({
      hidden: currentScrollY < this.props.scrollInHeight,
      pinHeight
    });

    this.handlingScrollUpdate = false;
  }

  render() {
    const renderStyle = [
      styles.backToTop,
      this.state.hidden ? styles.hidden : ''
    ];
    const currentScrollY = getScrollY();

    const inlineStyle = {};
    if (currentScrollY >= this.state.pinHeight) {
      inlineStyle.bottom = 'auto';
      inlineStyle.top = document.documentElement.clientHeight - (currentScrollY - this.state.pinHeight) - 56;
    } else {
      inlineStyle.bottom = '1rem';
      inlineStyle.top = 'auto';
    }

    return (
      <button
        className={renderStyle.join(' ')}
        style={inlineStyle}
        onClick={() => {jump('.headroom-wrapper', {duration: 300})}}
      >Back to top</button>
    );
  }
}

BackToTop.propTypes = {
  scrollInHeight: PropTypes.number
};

BackToTop.defaultProps = {
  scrollInHeight: 50
};

export default BackToTop;
