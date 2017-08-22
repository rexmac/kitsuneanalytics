import React from 'react'
import PropTypes from 'prop-types';

const Bio = ({ name, title, href, imgSrc, imgAlt, desc }) =>
  <div className="bio">
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

    {/*
    {href ? (
      <a href={href}><img className="photo" src={imgSrc} alt={imgAlt} /></a>
    ) : (
      <img className="photo" src={imgSrc} alt={imgAlt} />
    )}*/}
    <div className="description">
      {
        desc.split(/\r?\n/).map((text, index) => {
          return <p key={index}>{text}</p>;
        })
      }
    </div>
  </div>

Bio.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  href: PropTypes.string,
  imgSrc: PropTypes.string,
  imgAlt: PropTypes.string,
  desc: PropTypes.string
};

export default Bio