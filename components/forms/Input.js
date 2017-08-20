import React from 'react'

const Input = (props) =>
  <input className="form-control placeholder-shown"
         type={props.type || 'text'}
         {...props}
  />

export default Input