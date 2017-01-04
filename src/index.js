import React, { Component, PropTypes } from 'react'
import Star from './star'

export { Star } from './star'

export default class Rater extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rating: props.rating,
      lastRating: props.rating,
      isRating: false
    }
  }
  callback(args) {
    let { onRate: callback } = this.props
    callback && callback(args)
  }
  willRate(rating) {
    this.setState({
      rating,
      isRating: true
    })
    this.callback({ rating })
  }
  onRate(rating) {
    this.setState({
      rating,
      lastRating: rating
    })
    this.callback({ rating })
  }
  onCancelRate() {
    let { lastRating: rating } = this.state
    this.setState({
      rating,
      isRating: false
    })
    this.callback({ rating })
  }
  render() {
    let { total, interactive, children } = this.props
    let { rating, isRating } = this.state
    children = Array.prototype.concat(children).filter(Boolean)
    let nodes = Array.apply(null, Array(total)).map((_, i) => {
      let starProps = {
        key: `star-${i}`,
        isActive: !isRating && rating - i >= 1,
        willBeActive: isRating && i < rating,
        isActiveHalf: !isRating && (rating - i >= 0.5 && rating - i < 1),
        isDisabled: !interactive,
        onClick: this.onRate.bind(this, i + 1),
        onMouseEnter: this.willRate.bind(this, i + 1)
      }
      if (children.length) {
        return React.cloneElement(children[i % children.length], starProps)
      } else {
        return (<Star {...starProps} />)
      }
    })
    if (interactive) {
      return (
        <div className="react-rater" onMouseLeave={this.onCancelRate.bind(this)}>
          {nodes}
        </div>
      )
    } else {
      return (
        <div className="react-rater">{nodes}</div>
      )
    }
  }
}

Rater.propTypes = {
  total: PropTypes.number,
  rating: PropTypes.number,
  interactive: PropTypes.bool,
  children: PropTypes.any,
  onRate: PropTypes.func
}

Rater.defaultProps = {
  total: 5,
  rating: 0,
  interactive: true
}
