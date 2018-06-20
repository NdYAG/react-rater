import React from 'react'
import PropTypes from 'prop-types'

const Star = (props) => {
  const nameMap = {
    isDisabled: 'is-disabled',
    isActive: 'is-active',
    isActiveHalf: 'is-active-half',
    willBeActive: 'will-be-active'
  }
  const className = Object.keys(nameMap)
        .filter(prop => props[prop])
        .map(prop => nameMap[prop])
        .join(' ')
  return <div className={`react-rater-star ${className}`} {...props}>★</div>
}

Star.defaultProps = {
  willBeActive: false,
  isActive: false,
  isActiveHalf: false,
  isDisabled: false
}

Star.propTypes = {
  isActive: PropTypes.bool,
  isActiveHalf: PropTypes.bool,
  willBeActive: PropTypes.bool,
  isDisabled: PropTypes.bool
}

export default Star
