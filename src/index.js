import React, { Component } from 'react'
import Star from './star'

export { Star } from './star'

export default class Rater extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lastRating: props.rating,
      rating: props.rating
    }
  }
  componentDidMount() {
    this.setState({
      rating: this.props.rating
    })
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      rating: nextProps.rating
    })
  }
  handleMouseEnter() {
    this.setState({
      rating: 0
    })
  }
  handleMouseMove(e) {
    let rating = getRatingFromDOMEvent(e, this.props)
      , callback = this.props.onRate
    ;(rating > 0) && callback && callback(rating)
  }
  handleMouseLeave() {
    let callback = this.props.onRate
      , state = this.state
    callback && callback(state.lastRating)
    this.setState({
      rating: state.lastRating
    })
  }
  handleClick(e) {
    let rating = getRatingFromDOMEvent(e, this.props)
      , lastRating = Number(this.state.lastRating)
      , callback = this.props.onRate
    if (rating < 0 || e.target.getAttribute('class').indexOf('is-disabled') > -1) {
      return
    }
    this.setState({
      rating,
      lastRating: rating
    })
    callback && callback(rating, lastRating)
  }
  render() {
    let total = Number(this.props.total)
      , limit = Number(this.props.limit)
      , rating = Number(this.state.rating)
      , children = Array.prototype.concat(this.props.children).filter(Boolean)
      , nodes
    limit = (this.props.limit === void 0)? total: limit
    nodes = Array(total).join(',').split(',').map((_, i) => {
      let starProps = {
        isActive: (i >= total - rating) ? true: false,
        isDisabled: (i < total - limit) ? true: false,
        key: `star-${i}`
      }
      if (children.length) {
        return React.cloneElement(children[i % children.length], starProps)
      } else {
        return (<Star {...starProps} />)
      }
    })
    return (
      <div className="react-rater"
           onMouseEnter={this.handleMouseEnter.bind(this)}
           onMouseLeave={this.handleMouseLeave.bind(this)}
           onMouseMove={this.handleMouseMove.bind(this)}
           onClick={this.handleClick.bind(this)}>{nodes}</div>
    )
  }
}

Rater.defaultProps = {
  total: 5,
  rating: 0
}

function getRatingFromDOMEvent(e, props) {
  let star = e.target
    , allStars = Array.apply(null, e.currentTarget.childNodes)
    , index = allStars.indexOf(star)
    , rating = props.total - index
    , limit = Number(props.limit)
  if (index < 0) {
    return -1
  }
  limit = (props.limit === void 0)? props.total: limit
  rating = rating < limit? rating: limit
  return Number(rating)
}
