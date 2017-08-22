import React from 'react';
import PropTypes from 'prop-types';

const Input = (props) => (
  <input
    className="form-control placeholder-shown"
    type={props.type}
    {...props}
  />
);

Input.propTypes = {
  type: PropTypes.string
};

Input.defaultProps = {
  type: 'text'
};

export default Input;