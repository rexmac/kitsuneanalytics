import React from 'react'
import Helmet from 'react-helmet'
import { config } from 'config'
import Contact from '../components/pages/home/Contact';
import Hero from '../components/pages/home/Hero'
import Services from '../components/pages/home/Services'
import Team from '../components/pages/home/Team'
import { configureAnchors } from 'react-scrollable-anchor'

export default class Index extends React.Component {
  componentWillMount() {
    configureAnchors({ offset: 1 });
  }

  render () {
    return (
      <div>
        <Helmet
          title={config.siteTitle}
          meta={[
            {"name": "description", "content": "Kitsune Analytics"},
            {"name": "keywords", "content": "analytics, consulting"},
          ]}
        />

        <Hero />

        <Services />

        <Team />

        <Contact />

      </div>
    )
  }
}
