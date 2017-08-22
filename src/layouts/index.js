import React from 'react';
import PropTypes from 'prop-types';
import Headroom from 'react-headroom';
import '../css/manifest.scss';
import BackToTop from '../components/BackToTop';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';

const MainLayout = (props) =>
  (
    <div>
      <Headroom>
        <SiteHeader />
      </Headroom>

      {/* @todo Wrap or replace this with a <main> element? */}
      {/* <Container
       style={{
       maxWidth: 960,
       padding: `${rhythm(1)} ${rhythm(3/4)}`,
       paddingTop: 0,
       }}
       > */}
      <BackToTop scrollInHeight={600} scrollStepInPx={50} delayInMs={16.66} />
      <main>
        {props.children()}
      </main>

      <SiteFooter />

    </div>
  );

MainLayout.propTypes = {
  children: PropTypes.func.isRequired
};

export default MainLayout;