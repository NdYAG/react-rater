import React, { Component, PropTypes } from 'react'
import Star from './star'

export { Star } from './star'

export default class Rater extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lastRating: props.rating,
      rating: props.rating,
      isRating: false
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      rating: nextProps.rating
    })
  }
  handleMouseEnter(e) {
    let { rating } = getRatingFromDOMEvent(e, this.props)
      , callback = this.props.onRate
    if (rating > 0) {
      this.setState({
        rating: 0,
        isRating: true
      })
      callback && callback({
        originalEvent: e,
        rating
      })
    }
  }
  handleMouseMove(e) {
    let { rating } = getRatingFromDOMEvent(e, this.props)
      , callback = this.props.onRate
    if (rating > 0) {
      this.setState({
        rating: rating,
        isRating: true
      })
      callback && callback({
        originalEvent: e,
        rating
      })
    }
  }
  handleMouseLeave(e) {
    let callback = this.props.onRate
      , state = this.state
    this.setState({
      rating: state.lastRating,
      isRating: false
    })
    callback && callback({
      originalEvent: e,
      rating: state.lastRating
    })
  }
  handleClick(e) {
    let { index, rating } = getRatingFromDOMEvent(e, this.props)
      , lastRating = Number(this.state.lastRating)
      , callback = this.props.onRate
    if (rating < 0 || this.refs[`star-${index}`].props.isDisabled) {
      return
    }
    this.setState({
      rating,
      lastRating: rating
    })
    callback && callback({
      originalEvent: e,
      rating,
      lastRating
    })
  }
  render() {
    let { total, limit, rating, interactive, fraction, children, ...rest } = this.props
    total = Number(total)
    limit = Number(limit)
    rating = Number(this.state.rating)
    children = Array.prototype.concat(children).filter(Boolean)
    limit = (this.props.limit === void 0)? total: limit
    delete rest.onRate
    let nodes = Array(total).join(',').split(',').map((_, i) => {
      let starProps = {
        isActive: (!this.state.isRating && rating-i >= 1) ? true: false,
        isActiveHalf: fraction ? (!this.state.isRating && (rating-i >= 0.5 && rating-i < 1)) ? true : false : false,
        willBeActive: (this.state.isRating && i < rating)? true: false,
        isDisabled: (i < limit) ? false: true,
        key: `star-${i}`,
        ref: `star-${i}`
      }
      if (children.length) {
        return React.cloneElement(children[i % children.length], starProps)
      } else {
        return (<Star {...starProps} />)
      }
    })
    if (interactive) {
      return (
        <div className="react-rater"
             onMouseEnter={this.handleMouseEnter.bind(this)}
             onMouseLeave={this.handleMouseLeave.bind(this)}
             onMouseMove={this.handleMouseMove.bind(this)}
             onClick={this.handleClick.bind(this)}
             {...rest}>{nodes}</div>
      )
    } else {
      return (
        <div className="react-rater is-disabled" {...rest}>{nodes}</div>
      )
    }
  }
}

Rater.defaultProps = {
  total: 5,
  rating: 0,
  interactive: true,
  fraction: false
}

Rater.propTypes = {
  total: PropTypes.number,
  rating: PropTypes.number,
  limit: PropTypes.number,
  interactive: PropTypes.bool,
  fraction: PropTypes.bool,
  onRate: PropTypes.func,
  children: PropTypes.any
}

function getRatingFromDOMEvent(e, props) {
  let allStars = Array.apply(null, e.currentTarget.childNodes)
    , star = findStarDOMNode(e.target, allStars, e.currentTarget)
    , index = allStars.indexOf(star)
    , rating = index + 1
    , limit = Number(props.limit)
  if (index < 0) {
    return {
      index,
      rating: -1
    }
  }
  limit = (props.limit === void 0)? props.total: limit
  rating = rating < limit? rating: limit
  return {
    index,
    rating: Number(rating)
  }
}

function findStarDOMNode(node, stars, container) {
  while(node !== container && stars.indexOf(node) === -1) {
    node = node.parentNode
  }
  return node
}