import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Rater, { Star } from '../src'

class LimitedRater extends Component {
  render() {
    let { total, min, max } = this.props
    let { rating } = this.props
    let minStars = Array.apply(null, Array(min)).map((_, i) => {
      return <Star isActive={true} isDisabled={true} key={`min-${i}`} />
    })
    let maxStars = Array.apply(null, Array(total - max)).map((_, i) => {
      return <Star isActive={false} isDisabled={true} key={`max${i}`} />
    })
    return (
      <div className="react-rater">
        <div style={{ display: 'inline-block' }}>
          {minStars}
        </div>
        <Rater rating={rating - min} total={max - min} />
        <div style={{ display: 'inline-block' }}>
          {maxStars}
        </div>
      </div>
    )
  }
}

LimitedRater.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  rating: PropTypes.number,
  total: PropTypes.number
}

export default LimitedRater
