import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import Helmet from 'react-helmet'
import { config } from 'config'
import Team from '../components/Team'
import Hero from '../components/Hero'
import Services from '../components/Services'
import Contact from "../components/Contact";

export default class Index extends React.Component {
  render () {
    return (
      <div>
        <Helmet
          title={config.siteTitle}
          meta={[
            {"name": "description", "content": "Sample"},
            {"name": "keywords", "content": "sample, something"},
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
