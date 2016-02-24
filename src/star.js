import React, { Component } from 'react'

export default class Star extends Component {
  render() {
    let nameMap = {
      isDisabled: 'is-disabled',
      isActive: 'is-active',
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
  isDisabled: false
}