import React from 'react';
import PropTypes from 'prop-types';

const Bio = ({ name, title, href, imgSrc, imgAlt, desc }) => (
  <div className="bio">
    {href ? (
      <a href={href}>
        <img className="photo" src={imgSrc} alt={imgAlt} />
      </a>
    ) : (
      <img className="photo" src={imgSrc} alt={imgAlt} />
    )}

    <h3 className="name">
      {href ? (
        <a href={href}>{name}</a>
      ) : (
        <span>{name}</span>
      )}
    </h3>

    {title &&
      <h4 className="title">{title}</h4>
    }

    <div className="description">
      {
        desc.split(/\r?\n/).map((text, index) =>
          <p key={index}>{text}</p> // eslint-disable-line react/no-array-index-key
        )
      }
    </div>
  </div>
);

Bio.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  href: PropTypes.string,
  imgSrc: PropTypes.string,
  imgAlt: PropTypes.string,
  desc: PropTypes.string.isRequired
};

Bio.defaultProps = {
  title: '',
  href: '',
  imgSrc: '',
  imgAlt: ''
}

export default Bio;
