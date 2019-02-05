import React from 'react';
import getDirection from 'direction';
import PropTypes from 'prop-types';

export default function DirectionProvider({text, children}) {
  const dir = getDirection(text);
  return <span className={dir === 'rtl' ? 'rtl-text' : ''}>{children}</span>
}

DirectionProvider.propTypes = {
  text: PropTypes.string,
  children: PropTypes.node.isRequired
}