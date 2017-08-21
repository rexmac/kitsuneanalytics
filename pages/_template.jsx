import React from 'react';
import { Container } from 'react-responsive-grid';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers';
import Headroom from 'react-headroom';
import '../css/manifest'
import BackToTop from '../components/BackToTop';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';

import { rhythm } from '../utils/typography';

module.exports = React.createClass({
  propTypes () {
    return {
      children: React.PropTypes.any
    }
  },
  render () {
    return (
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
          {this.props.children}
        </main>

        <SiteFooter />

      </div>
    )
  },
})
