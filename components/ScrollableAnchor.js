import React from 'react';
import PropTypes from 'prop-types';
import jump from 'jump.js';
import { withRouter } from 'react-router';

//@withRouter
class ScrollableAnchor extends React.Component {
  static propTypes = {
    duration: PropTypes.number,
    offset: PropTypes.number,
    callback: PropTypes.func,
    a11y: PropTypes.bool
  };

  static defaultProps = {
    duration: 5000,
    offset: 0,
    callback: undefined,
    a11y: false
  };

  componentDidUpdate(prevProps) {
    console.log('yo');
    console.log('this.props.location', this.props.location);
    console.log('prevProps.location', prevProps.location);
    if (this.props.location !== prevProps.location) {
      console.log('yoyo');
      const element = document.querySelector(this.props.location.hash);

      if (element) {
        console.log('yoyoyo');
        jump(element, {
          duration: this.props.duration,
          offset: this.props.offset,
          callback: this.props.callback,
          a11y: this.props.a11y
        });
      }
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollableAnchor);