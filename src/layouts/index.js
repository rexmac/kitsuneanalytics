import React from 'react';
import PropTypes from 'prop-types';
import Headroom from 'react-headroom';
import '../css/manifest.scss';
import BackToTop from '../components/BackToTop';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';

class MainLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      headroomRef: null
    };
  }

  componentDidMount() {
    this.setState({headroomRef: this.headroom});
  }

  render() {
    const { headroomRef } = this.state;

    return (
      <div>
        <Headroom ref={(c) => { this.headroom = c; }}>
          <SiteHeader headroomRef={headroomRef} />
        </Headroom>

        <BackToTop scrollInHeight={600} scrollStepInPx={50} delayInMs={16.66} />

        <main>
          {this.props.children()}
        </main>

        <SiteFooter eadroomRef={headroomRef} />

      </div>
    );
  }
};

MainLayout.propTypes = {
  children: PropTypes.func.isRequired
};

export default MainLayout;
