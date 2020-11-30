import React from 'react';
import PropTypes from 'prop-types';

const Spoint = () => {
  return <div>hello world</div>;
};

const { string } = PropTypes;

Spoint.propTypes = {
  name: string.isRequired,
};

export default Spoint;
