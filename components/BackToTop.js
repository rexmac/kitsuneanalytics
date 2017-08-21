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
      pinHeight: '99999px',
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
    const currentScrollY = this.getScrollY();
    const footerHeight = 106;
    const pinHeight = document.body.scrollHeight - document.documentElement.clientHeight - footerHeight;
    //console.log('currentScrollY', currentScrollY);
    //console.log('pinHeight', pinHeight);
    //console.log('document.body.scrollHeight', document.body.scrollHeight);
    //console.log('document.documentElement.clientHeight', document.documentElement.clientHeight);
    //console.log('this.props.scrollInHeight', this.props.scrollInHeight);

    this.setState({
      hidden: currentScrollY < this.props.scrollInHeight,
      pinHeight: pinHeight
    });

    this.handlingScrollUpdate = false;
  }

  componentDidMount() {
    //window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    //window.removeEventListener('scroll', this.handleScroll);
  }

  scrollStep() {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
  }

  scrollToTop() {
    const intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
    this.setState({ intervalId: intervalId });
  }

  render() {
    const renderStyle = [
      styles['backToTop'],
      this.state.hidden ? styles['hidden'] : ''
      //this.state.pinned ? styles['pinned'] : ''
    ];
    const footerHeight = 106;
    const currentScrollY = this.getScrollY();
    // 1rem + currentScrollY - this.state.pinHeight
    //console.log('render currentScrollY', currentScrollY);
    //console.log('redner this.state.pinHeight', this.state.pinHeight);

    let inlineStyle = {};
    if (currentScrollY >= this.state.pinHeight) {
      inlineStyle.bottom = 'auto';
      inlineStyle.top = document.documentElement.clientHeight - (currentScrollY - this.state.pinHeight) - 56;
    } else {
      inlineStyle.bottom = '1rem';
      inlineStyle.top = 'auto';
    }

    return (
      <button className={renderStyle.join(' ')}
              style={ inlineStyle }
              onClick={ () => { this.scrollToTop(); }}
      >Back to top</button>
    );
  }
}
