import React from 'react'

const FormGroup = (props) =>
  <div className={`form-group ${props.shouldMarkError ? 'error' : ''}`}>
    { props.children }
    <label htmlFor={ props.children.props.id }>{ props.label }</label>
    <div className="error-message" id={`${props.children.props.id}-error`}>{ props.error }</div>
  </div>

export default FormGroup