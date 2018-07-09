import React, { Component } from 'react'
import Rater from '../src/index.js'
import PropTypes from 'prop-types'
import './EmojiRater.scss'

const Smile = ({ willBeActive, isActive }) => {
  const color = isActive? '#8BC34A': willBeActive? '#AED581': '#E3E3E3'
  return (
    <svg width="52px" height="52px" viewBox="0 0 526 526">
      <g fill="none" transform="translate(13.000000, 13.000000)">
        <circle
          id="Face"
          stroke={color}
          strokeWidth="25"
          cx="250"
          cy="250"
          r="250"
        />
        <circle id="Eye" fill={color} cx="150" cy="200" r="30" />
        <circle id="Eye" fill={color} cx="350" cy="200" r="30" />
        <path
          d="M150,330 C182.874349,356.234375 216.059245,369.351562 249.554688,369.351562 C283.05013,369.351562 316.85612,356.234375 350.972656,330"
          id="Mouth"
          stroke={color}
          strokeWidth="25"
          strokeLinecap="round"
        />
      </g>
    </svg>
  )
}

const Normal = ({ willBeActive, isActive }) => {
  const color = isActive? '#FFC107': willBeActive? '#FFD54F': '#E3E3E3'
  return (
    <svg width="52px" height="52px" viewBox="0 0 526 526">
      <g fill="none" transform="translate(13.000000, 13.000000)">
        <circle
          id="Face"
          stroke={color}
          strokeWidth="25"
          cx="250"
          cy="250"
          r="250"
        />
        <circle id="Eye" fill={color} cx="150" cy="200" r="30" />
        <circle id="Eye" fill={color} cx="350" cy="200" r="30" />
        <path
          d="M211,365.926862 L316.301059,327"
          id="Path-2"
          stroke={color}
          strokeWidth="25"
          strokeLinecap="round"
        />
      </g>
    </svg>
  )
}

const Angry = ({ willBeActive, isActive }) => {
  const color = isActive? '#F4511E': willBeActive? '#FF8A65': '#E3E3E3'
  return (
    <svg width="52px" height="52px" viewBox="0 0 526 526">
      <g fill="none" transform="translate(13.000000, 13.000000)">
        <circle
          id="Face"
          stroke={color}
          strokeWidth="25"
          cx="250"
          cy="250"
          r="250"
        />
        <path
          d="M146.766617,170 L178.873712,191.656509 C179.607424,194.254283 180,196.995188 180,199.827784 C180,216.396326 166.568542,229.827784 150,229.827784 C133.431458,229.827784 120,216.396326 120,199.827784 C120,184.351657 131.718691,171.612577 146.766617,170 Z"
          id="Combined-Shape"
          fill={color}
        />
        <path
          d="M346.766617,170 L378.873712,191.656509 C379.607424,194.254283 380,196.995188 380,199.827784 C380,216.396326 366.568542,229.827784 350,229.827784 C333.431458,229.827784 320,216.396326 320,199.827784 C320,184.351657 331.718691,171.612577 346.766617,170 Z"
          id="Combined-Shape"
          fill={color}
          transform="translate(350.000000, 199.913892) scale(-1, 1) translate(-350.000000, -199.913892) "
        />
        <path
          d="M150,330 C182.874349,356.234375 216.059245,369.351562 249.554688,369.351562 C283.05013,369.351562 316.85612,356.234375 350.972656,330"
          id="Mouth"
          stroke={color}
          strokeWidth="25"
          strokeLinecap="round"
          transform="translate(250.486328, 349.675781) scale(1, -1) translate(-250.486328, -349.675781) "
        />
      </g>
    </svg>
  )
}

Smile.propTypes = Normal.propTypes = Angry.propTypes = {
  willBeActive: PropTypes.bool,
  isActive: PropTypes.bool
}

export default class EmojiRater extends Component {
  render() {
    return (
      <div className="emoji-rater">
        <Rater total={3}>
          <Angry />
          <Normal />
          <Smile />
        </Rater>
      </div>
    )
  }
}
