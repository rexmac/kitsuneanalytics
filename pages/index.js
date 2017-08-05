import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import Helmet from 'react-helmet'
import { config } from 'config'
import Bios from '../components/Bios'
import Hero from '../components/Hero'
import Services from '../components/Services'

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

        <Bios />

        <section id="contact">
        </section>
      </div>
    )
  }
}
