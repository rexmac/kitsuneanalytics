import React from 'react'

const Bio = ({ name, title, href, imgSrc, imgAlt, desc }) =>
  <div className='bio'>
    <h3>
      {href ? (
        <a href={href}>{name}</a>
      ) : (
        <span>{name}</span>
      )}
    </h3>

    {title &&
      <h4>{title}</h4>
    }

    {href ? (
      <a href={href}><img src={imgSrc} alt={imgAlt} /></a>
    ) : (
      <img src={imgSrc} alt={imgAlt} />
    )}
    <p>{desc}</p>
  </div>

Bio.propTypes = {
  name: React.PropTypes.string,
  title: React.PropTypes.string,
  href: React.PropTypes.string,
  imgSrc: React.PropTypes.string,
  imgAlt: React.PropTypes.string,
  desc: React.PropTypes.string
};

export default Bio