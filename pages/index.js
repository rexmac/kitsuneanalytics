import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import Helmet from 'react-helmet'
import { config } from 'config'

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
        <section id="hero">
          <div className="branding">
            <img className="logo" src={prefixLink('/img/kitsune_logo_white.svg')} width="191" height="180" alt="Kitsune Analytics logo" />
            <h1><strong>Kitsune</strong><br />Analytics</h1>
          </div>
          <div className="box">
            <h2>
              Bespoke data and analytic solutions
            </h2>
            <p>Kitsune Analytics developed from a shared desire to create more transparent links between science, society, and
            industry at large. As all former or current academics, the experts at Kitsue Analytics share a passion for developing
            projects that bring tangible results, inform change, and generate a greater understanding of the products and
            services that we use every day.</p>
            <p>At Kitsune Analytics, all of our analysts hold a research-based PhD from various scientific fields. As such, we can
            uniquely provide you with the confidence that your project is being taken care of by industry experts with a passion
            for data-driven problem solving and a professionalism that is unparalleled by typical industry standards.</p>
          </div>
        </section>

        <section id="services">
        </section>

        <section id="meet-the-team">
        </section>

        <section id="contact">
        </section>
      </div>
    )
  }
}
