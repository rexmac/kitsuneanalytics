import React from 'react'

const Loader = (props) =>
  <div className={`loader ${props.loading ? 'loading' : ''}`}>
    <div className="spinner"/>
  </div>

export default Loader