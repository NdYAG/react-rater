import React, { Component } from 'react'

export default class Star extends Component {
  render() {
    let className = this.props.isActive? 'is-active': ''
    className += this.props.isDisabled? ' is-disabled': ''
    return (
        <a className={className}>★</a>
    )
  }
}

Star.defaultProps = {
  isActive: false,
  isDisabled: false
}
