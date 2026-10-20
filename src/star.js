import React from 'react'
import PropTypes from 'prop-types'

const Star = (props) => {
  const { isActive, willBeActive, isDisabled, fillRatio, ...starProps } = props
  const className = [
    isDisabled && 'is-disabled',
    isActive && 'is-active',
    willBeActive && 'will-be-active'
  ]
    .filter(Boolean)
    .join(' ')

  const hasPartialFill = !willBeActive && fillRatio > 0 && fillRatio < 1

  return (
    <div className={`react-rater-star ${className}`} {...starProps}>
      ★
      {hasPartialFill && (
        <span
          className="react-rater-star__fill"
          style={{ width: `${Math.round(fillRatio * 100)}%` }}
          aria-hidden="true"
        >
          ★
        </span>
      )}
    </div>
  )
}

Star.defaultProps = {
  willBeActive: false,
  isActive: false,
  isDisabled: false,
  fillRatio: 0
}

Star.propTypes = {
  isActive: PropTypes.bool,
  willBeActive: PropTypes.bool,
  isDisabled: PropTypes.bool,
  fillRatio: PropTypes.number
}

export default Star
