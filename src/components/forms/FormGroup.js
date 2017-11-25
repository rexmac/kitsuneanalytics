import React from 'react';
import PropTypes from 'prop-types';

const FormGroup = (props) => (
  <div className={`form-group ${props.shouldMarkError ? 'error' : ''}`}>
    { props.children }
    <label htmlFor={props.children.props.id}>{props.label}</label>
    <div className="error-message" id={`${props.children.props.id}-error`}>{props.error}</div>
  </div>
);

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
  label: PropTypes.string,
  shouldMarkError: PropTypes.bool
};

FormGroup.defaultProps = {
  error: '',
  label: '',
  shouldMarkError: false
};

export default FormGroup;
