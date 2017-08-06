import React from 'react'

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
  name: React.PropTypes.string,
  title: React.PropTypes.string,
  href: React.PropTypes.string,
  imgSrc: React.PropTypes.string,
  imgAlt: React.PropTypes.string,
  desc: React.PropTypes.string
};

export default Bio