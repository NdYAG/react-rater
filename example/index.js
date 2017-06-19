import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import Rater from '../src/'
import LimitedRater from './LimitedRater'

class Face extends Component {
  render() {
    let icons = {
      bad: '🙁',
      normal: '😐',
      good: '😍'
    }
    let { isActive, willBeActive, icon, onMouseEnter, onClick } = this.props
    let faceicon = isActive || willBeActive ? icons[icon] : '😶'
    return <span onMouseEnter={onMouseEnter} onClick={onClick}>{faceicon}</span>
  }
}

Face.propTypes = {
  isActive: PropTypes.bool,
  willBeActive: PropTypes.bool,
  isDisabled: PropTypes.bool,
  icon: PropTypes.string,
  onMouseEnter: PropTypes.func,
  onClick: PropTypes.func
}

class Example extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rating: 0
    }
  }
  handleRate({ rating, type }) {
    this.setState({
      rating: rating
    })
    if (type === 'click') {
      alert('You rated ' + rating)
    }
  }
  rate() {
    this.setState({
      rating: 5
    })
  }
  render() {
    return (
      <div>
        <h1>React Star Rater</h1>
        <dl>
          <dt>Plain tag:</dt>
          <dd>
            <pre>
              <code>
                {'<Rater />'}
              </code>
            </pre>
            <Rater />
          </dd>
          <dt>
            Limit maximum rating by setting <code>limit</code> attribute (See
            example/LimitedRater)
          </dt>
          <dd>
            <pre>
              <code>
                {'<LimitedRater total={5} rating={2} limit={4} />'}
              </code>
            </pre>
            <LimitedRater total={5} rating={2} max={4} min={1} />
          </dd>
          <dt>
            Retrieve rating value by setting a callback on <code>onRate</code>
          </dt>
          <dd>
            <pre>
              <code>
                {'<Rater onRate={this.handleRate.bind(this)} />'}
              </code>
            </pre>
            <Rater
              rating={this.state.rating}
              onRate={this.handleRate.bind(this)}
            />
            <span>{'Rating value: ' + this.state.rating}</span>
            <button onClick={this.rate.bind(this)}>Set rating to 5</button>
          </dd>
          <dt>Read-only</dt>
          <dd>
            <pre>
              <code>
                {'<Rater interactive={false} rating={3} />'}
              </code>
            </pre>
            <Rater interactive={false} rating={3} />
          </dd>
          <dt>Read-only</dt>
          <dd>
            <pre>
              <code>
                {'<Rater interactive={false} rating={3.6} />'}
              </code>
            </pre>
            <Rater interactive={false} rating={3.6} />
          </dd>
          <dt>Customize star</dt>
          <dd>
            <pre>
              <code>
                {`
<Rater total={3}>
  <Face icon="bad" />
  <Face icon="normal" />
  <Face icon="good" />
</Rater>`.trim()}
              </code>
            </pre>
            <Rater total={3} className="face-rater">
              <Face icon="bad" />
              <Face icon="normal" />
              <Face icon="good" />
            </Rater>
          </dd>
        </dl>
      </div>
    )
  }
}

function render() {
  ReactDOM.render(<Example />, document.getElementById('app'))
}

render()
