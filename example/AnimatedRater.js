import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Rater from '../src'
import { StaggeredMotion, spring, presets } from 'react-motion'
import './AnimatedRater.scss'

const Star = ({ willBeActive, isActive, style }) => {
  const fill = isActive ? '#fc6' : willBeActive ? '#ffdd99' : '#e3e3e3'
  return (
    <svg viewBox="0 0 19.481 19.481" width="36" height="36" style={style}>
      <path
        fill={fill}
        d="m10.201,.758l2.478,5.865 6.344,.545c0.44,0.038 0.619,0.587 0.285,0.876l-4.812,4.169 1.442,6.202c0.1,0.431-0.367,0.77-0.745,0.541l-5.452-3.288-5.452,3.288c-0.379,0.228-0.845-0.111-0.745-0.541l1.442-6.202-4.813-4.17c-0.334-0.289-0.156-0.838 0.285-0.876l6.344-.545 2.478-5.864c0.172-0.408 0.749-0.408 0.921,0z"
      />
    </svg>
  )
}

Star.propTypes = {
  isActive: PropTypes.bool,
  willBeActive: PropTypes.bool,
  style: PropTypes.any
}

export default class AnimatedRater extends Component {
  constructor() {
    super()
    this.state = {
      shouldStart: false,
      rating: 0,
      defaultStyles: [{ x: 0 }, { x: 0 }, { x: 0 }, { x: 0 }, { x: 0 }]
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        shouldStart: true
      })
    }, 0)
  }
  handleRate({ rating }) {
    const defaultStyles = [
      { x: 0 },
      { x: 0 },
      { x: 0 },
      { x: 0 },
      { x: 0 }
    ].map((style, i) => {
      if (rating < i + 1) {
        return { x: 1 }
      }
      return style
    })
    this.setState({
      rating,
      defaultStyles
    })
  }
  getStyle(prevInterpolatedStyles) {
    const { shouldStart, rating } = this.state
    if (!shouldStart) {
      return prevInterpolatedStyles.map(() => {
        return { x: 0 }
      })
    } else {
      if (rating) {
        return prevInterpolatedStyles.map((_, i) => {
          if (i + 1 > rating) {
            return { x: 1 }
          }
          return i === 0
            ? { x: spring(1, presets.gentle) }
            : { x: spring(prevInterpolatedStyles[i - 1].x, presets.gentle) }
        })
      } else {
        return prevInterpolatedStyles.map((_, i) => {
          return i === 0
            ? { x: spring(1, presets.wobbly) }
            : { x: spring(prevInterpolatedStyles[i - 1].x, presets.wobbly) }
        })
      }
    }
  }
  render() {
    return (
      <div className="animated-rater">
        <StaggeredMotion
          defaultStyles={this.state.defaultStyles}
          styles={this.getStyle.bind(this)}
          key={this.state.defaultStyles.filter(style => style.x === 1).length}
        >
          {interpolatingStyles => (
            <Rater
              total={5}
              rating={this.state.rating}
              onRate={this.handleRate.bind(this)}
            >
              {interpolatingStyles.map((style, i) => (
                <Star style={{ transform: `scale(${style.x})` }} key={i} />
              ))}
            </Rater>
          )}
        </StaggeredMotion>
      </div>
    )
  }
}
