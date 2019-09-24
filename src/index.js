import React, { Children, useState } from 'react'
import PropTypes from 'prop-types'
import Star from './star'

export { Star }

export default function Rater(props) {
  let {
    total,
    interactive,
    children,
    onRate,
    onRating,
    onCancelRate,
    ...restProps
  } = props
  const [state, setState] = useState({
    rating: props.rating,
    isRating: false
  })
  const { rating, isRating } = state
  let lastRating = rating

  function updateState(vals) {
    setState(prevState => {
      return { ...prevState, ...vals }
    })
  }

  function willRate(rating, e) {
    updateState({
      rating,
      isRating: true
    })
    onRating && onRating({ ...e, rating })
  }

  function rate(rating, e) {
    updateState({
      rating,
      isRating: false
    })
    lastRating = rating
    onRate && onRate({ ...e, rating })
  }

  function cancelRate() {
    updateState({
      rating: lastRating,
      isRating: false
    })
    onCancelRate && onCancelRate({ rating })
  }

  children = Children.toArray(children)
  delete restProps.rating

  const nodes = Array.apply(null, Array(total)).map((_, i) => {
    const starProps = {
      isActive: !isRating && rating - i >= 1,
      willBeActive: isRating && i < rating,
      isActiveHalf: !isRating && (rating - i >= 0.5 && rating - i < 1),
      isDisabled: !interactive
    }
    return (
      <div
        key={`star-${i}`}
        onClick={interactive ? rate.bind(this, i + 1) : null}
        onMouseOver={interactive ? willRate.bind(this, i + 1) : null}
      >
        {children.length ? (
          React.cloneElement(children[i % children.length], starProps)
        ) : (
          <Star {...starProps} />
        )}
      </div>
    )
  })
  if (interactive) {
    return (
      <div
        className="react-rater"
        onMouseOut={cancelRate.bind(this)}
        {...restProps}
      >
        {nodes}
      </div>
    )
  } else {
    return (
      <div className="react-rater" {...restProps}>
        {nodes}
      </div>
    )
  }
}

Rater.propTypes = {
  total: PropTypes.number,
  rating: PropTypes.number,
  interactive: PropTypes.bool,
  children: PropTypes.any,
  onRate: PropTypes.func,
  onRating: PropTypes.func,
  onCancelRate: PropTypes.func
}

Rater.defaultProps = {
  total: 5,
  rating: 0,
  interactive: true
}
