import React from 'react';

const Alert = (props) =>
  <div className={`alert ${props.type}`}
       role="alert"
       dangerouslySetInnerHTML={{ __html: `<strong>Oh no!</strong> ${props.message}` }} />;

export default Alert;