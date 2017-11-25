/* eslint-disable react/no-danger */
import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types';

// const BUILD_TIME = new Date().getTime();

const Html = (props) => {
  const head = Helmet.rewind();

  let css;
  if (process.env.NODE_ENV === 'production') {
    // eslint-disable-next-line global-require, import/no-webpack-loader-syntax, import/no-unresolved
    css = <style dangerouslySetInnerHTML={{ __html: require('!raw!../public/styles.css') }} />
  }

  return (
    <html lang="en">
      <head>
        {props.headComponents}

        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {css}
      </head>
      <body>
        <div className="overlay" />

        <div id="___gatsby" dangerouslySetInnerHTML={{ __html: props.body }} />

        <svg height="0" style={{ display: 'block' }} xmlns="http://www.w3.org/2000/svg">
          <filter id="drop-shadow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2.2" />
            <feOffset dx="1" dy="1" result="offsetblur" />
            <feFlood floodColor="rgba(0,0,0,0.25)" />
            <feComposite in2="offsetblur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </svg>

        {props.postBodyComponents}
      </body>
    </html>
  )
};

Html.propTypes = {
  headComponents: PropTypes.node.isRequired,
  body: PropTypes.node.isRequired,
  postBodyComponents: PropTypes.node.isRequired
};

export default Html;
