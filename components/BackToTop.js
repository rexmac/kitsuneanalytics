import React from 'react';
import raf from 'raf';
import styles from './BackToTop.module.css';

export default class BackToTop extends React.Component {

  static propTypes = {
    scrollInHeight: React.PropTypes.number
  };

  static defaultProps = {
    scrollInHeight: 50
  };

  constructor(props) {
    super(props);

    this.state = {
      hidden: true,
      intervalId: 0
    };

    this.handlingScrollUpdate = false;
  }

  getScrollY = () => {
    if (window.pageYOffset !== undefined) {
      return window.pageYOffset
    } else if (window.scrollTop !== undefined) {
      return window.scrollTop
    } else {
      return (document.documentElement || document.body.parentNode || document.body).scrollTop
    }
  }

  handleScroll = () => {
    if (!this.handlingScrollUpdate) {
      this.handlingScrollUpdate = true;
      raf(this.update);
    }
  }

  update = () => {
    let currentScrollY = this.getScrollY();
    console.log(currentScrollY);
    console.log(this.props.scrollInHeight);

    this.setState({
      hidden: currentScrollY < this.props.scrollInHeight
    });

    this.handlingScrollUpdate = false;
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  scrollStep() {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
  }

  scrollToTop() {
    let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
    this.setState({ intervalId: intervalId });
  }

  render() {
    let renderStyle = [
      styles['backToTop'],
      this.state.hidden ? styles['hide'] : ''
    ];
    return (
      <button className={renderStyle.join(' ')}
              onClick={ () => { this.scrollToTop(); }}
      >Back to top</button>
    );
  }
}
