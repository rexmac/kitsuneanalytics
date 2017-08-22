import React from 'react';
import PropTypes from 'prop-types';

const Loader = (props) => (
  <div className={`loader ${props.loading ? 'loading' : ''}`}>
    <div className="spinner" />
  </div>
);

Loader.propTypes = {
  loading: PropTypes.bool
};

Loader.defaultProps = {
  loading: false
};

export default Loader;
