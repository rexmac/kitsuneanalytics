import React from 'react';
import PropTypes from 'prop-types';

const Alert = (props) => (
  <div
    className={`alert ${props.type}`}
    role="alert"
    dangerouslySetInnerHTML={{ __html: `<strong>Oh no!</strong> ${props.message}` }} // eslint-disable-line react/no-danger
  />
);

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string
};

Alert.defaultProps = {
  type: ''
};

export default Alert;
