import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import graphql from 'graphql';
import Contact from '../components/pages/home/Contact';
import Hero from '../components/pages/home/Hero';
import Services from '../components/pages/home/Services';
import Team from '../components/pages/home/Team';
import SEO from '../components/SEO/SEO';

class Index extends React.Component {
  componentWillMount() {
  }

  render () {
    return (
      <div>
        <Helmet
          title={this.props.data.site.siteMetadata.rssMetadata.title}
          meta={[
            {"name": "description", "content": "Kitsune Analytics"},
            {"name": "keywords", "content": "analytics, consulting"},
          ]}
        >
          <title>{this.props.data.site.siteMetadata.rssMetadata.title}</title>
          <link rel="canonical" href={`${this.props.data.site.siteMetadata.siteUrl}`} />
        </Helmet>

        <SEO />

        <Hero />

        <Services />

        <Team />

        <Contact />

      </div>
    )
  }
}

Index.propTypes = {
  data: PropTypes.objectOf(PropTypes.object).isRequired
};

export default Index;

export const pageQuery = graphql`
  query SiteMetadataLookup {
    site {
      siteMetadata {
        rssMetadata {
          title
        },
        siteUrl
      }
    }
  }
`;
