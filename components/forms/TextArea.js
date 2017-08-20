import React from 'react'

const TextArea = (props) =>
  <textarea className="form-control placeholder-shown"
            type={props.type || 'text'}
            {...props}
  />

export default TextArea