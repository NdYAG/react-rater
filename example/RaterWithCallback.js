import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Rater from '../src'

const angry = {
  leftEye: 'M 146.767 170 C 157.469 177.219 168.171 184.438 178.874 191.657 C 179.607 194.254 180 196.995 180 199.828 C 180 216.396 166.569 229.828 150 229.828 C 133.431 229.828 120 216.396 120 199.828 C 120 184.352 131.719 171.613 146.767 170 Z',
  rightEye: 'M 353.2 170 C 368.3 171.6 380 184.4 380 199.9 C 380 216.5 366.6 229.9 350 229.9 C 333.4 229.9 320 216.5 320 199.9 C 320 197 320.4 194.3 321.1 191.7 C 331.8 184.467 342.5 177.233 353.2 170 L 353.2 170',
  mouth: 'M 163 382.352 C 195.874 356.117 229.059 343 262.555 343 C 296.05 343 329.856 356.117 363.973 382.352'
}

const normal = {
  leftEye: 'M 150 170 C 158.3 170 165.8 173.35 171.225 178.775 C 176.65 184.2 180 191.7 180 200 C 180 216.6 166.6 230 150 230 C 133.4 230 120 216.6 120 200 C 120 183.4 133.4 170 150 170 Z',
  rightEye: 'M 350 170 C 366.6 170 380 183.4 380 200 C 380 216.6 366.6 230 350 230 C 333.4 230 320 216.6 320 200 C 320 191.7 323.35 184.2 328.775 178.775 C 334.2 173.35 341.7 170 350 170 L 350 170',
  mouth: 'M 224 378.927 C 241.55 372.439 259.1 365.951 276.651 359.464 C 294.201 352.976 311.751 346.488 329.301 340'
}

const smile = {
  leftEye: normal.leftEye,
  rightEye: normal.rightEye,
  mouth: 'M150,330 C182.874349,356.234375 216.059245,369.351562 249.554688,369.351562 C283.05013,369.351562 316.85612,356.234375 350.972656,330'
}

const faces = {
  angry,
  normal,
  smile
}

const Face = ({ from, to }) => {
  const before = faces[from]
  const after = faces[to]
  return (
    <svg width="263px" height="263px" viewBox="0 0 526 526">
      <g transform="translate(13.000000, 13.000000)">
        <circle id="face" stroke="#000000" fill="none" strokeWidth="25" cx="250" cy="250" r="250"></circle>
        <path id="left-eye" d={before.leftEye} >
          <animate attributeName="d" dur="0.3s" to={after.leftEye} fill="freeze" />
        </path>
        <path id="right-eye" d={before.rightEye}>
          <animate attributeName="d" dur="0.3s" to={after.rightEye} fill="freeze" />
        </path>
        <path id="mouth" d={before.mouth} fill="none" stroke="#000" strokeWidth="25" strokeLinecap="round">
          <animate attributeName="d" dur="0.3s" to={after.mouth} fill="freeze" />
        </path>
      </g>
    </svg>
  )
}

Face.propTypes = {
  from: PropTypes.oneOf(Object.keys(faces)),
  to: PropTypes.oneOf(Object.keys(faces))
}

export default class RaterWithCallback extends Component {
  constructor() {
    super()
    this.state = {
      rating: 2,
      from: 'normal',
      to: 'normal'
    }
  }
  handleRate({ rating }) {
    const { rating: lastRating } = this.state
    if (rating === lastRating) {
      return
    }
    const faces = ['angry', 'normal', 'smile']
    const from = faces[lastRating - 1]
    const to = faces[rating - 1]
    this.setState({ rating, from, to })
  }
  render() {
    return (
      <div>
        <div>
          <Face from={this.state.from} to={this.state.to} key={this.state.to} />
        </div>
        <Rater rating={this.state.rating} total={3} onRate={this.handleRate.bind(this)} />
      </div>
    )
  }
}
