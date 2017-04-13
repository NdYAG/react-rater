import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Star extends Component {
  render() {
    let nameMap = {
      isDisabled: 'is-disabled',
      isActive: 'is-active',
      isActiveHalf: 'is-active-half',
      willBeActive: 'will-be-active'
    }
    let className = Object.keys(nameMap)
          .filter((prop) => this.props[prop])
          .map((prop) => nameMap[prop])
          .join(' ')
    let { onClick, onMouseEnter, isDisabled } = this.props
    if (isDisabled) {
      return (
        <a className={className}>★</a>
      )
    }
    return (
        <a className={className} onClick={onClick} onMouseEnter={onMouseEnter}>★</a>
    )
  }
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
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
}
