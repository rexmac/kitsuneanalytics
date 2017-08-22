import React from 'react';
import PropTypes from 'prop-types';

const TextArea = (props) => (
  <textarea
    className="form-control placeholder-shown"
    type={props.type}
    {...props}
  />
);

TextArea.propTypes = {
  type: PropTypes.string
};

TextArea.defaultProps = {
  type: 'text'
};

export default TextArea;
