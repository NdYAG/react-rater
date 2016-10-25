import React, { Component, PropTypes } from 'react'

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
    return (
        <a className={className}>★</a>
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
  isDisabled: PropTypes.bool
}