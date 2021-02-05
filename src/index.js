import React, { Children, useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Star from './star'

export { Star }

export default function Rater(props) {
  const {
    total,
    interactive,
    children,
    rating: defaultRating,
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
  const lastRating = useRef(rating)
  const childElements = Children.toArray(children)

  function updateState(vals) {
    setState(prevState => ({ ...prevState, ...vals }))
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
    lastRating.current = rating
    onRate && onRate({ ...e, rating })
  }

  function cancelRate() {
    updateState({
      rating: lastRating.current,
      isRating: false
    })
    onCancelRate && onCancelRate({ rating })
  }

  useEffect(() => {
    updateState({
      rating: defaultRating
    })
  }, [defaultRating])

  const nodes = Array.from(Array(total), (_, i) => {
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
        {childElements.length ? (
          React.cloneElement(childElements[i % childElements.length], starProps)
        ) : (
          <Star {...starProps} />
        )}
      </div>
    )
  })
  return (
    <div
      className="react-rater"
      {...(interactive ? {onMouseOut: cancelRate} : {})}
      {...restProps}
    >
      {nodes}
    </div>
  )
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
