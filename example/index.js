import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import Rater from '../src/'

class Face extends Component {
  render() {
    let icons = {
      bad: '🙁',
      normal: '😐',
      good: '😍'
    }
    if (this.props.isActive || this.props.willBeActive) {
      return (<span>{icons[this.props.icon]}</span>)
    } else {
      return (<span>😶</span>)
    }
  }
}

Face.propTypes = {
  isActive: PropTypes.bool,
  willBeActive: PropTypes.bool,
  isDisabled: PropTypes.bool,
  icon: PropTypes.string
}

class Example extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rating: 0
    }
  }
  handleRate(e) {
    this.setState({
      rating: e.rating
    })
    // lastRating is not undefined,
    // which means user have rated
    if (e.lastRating !== void 0) {
      alert('You rated ' + e.rating)
    }
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
          <dt>Limit maximum rating by setting <code>limit</code> attribute</dt>
          <dd>
            <pre>
              <code>
                {'<Rater total={5} rating={2} limit={4} />'}
              </code>
            </pre>
            <Rater total={5} rating={2} limit={4} />
          </dd>
          <dt>Retrieve rating value by setting a callback on <code>onRate</code></dt>
          <dd>
            <pre>
              <code>
                {'<Rater onRate={this.handleRate.bind(this)} />'}
              </code>
            </pre>
            <Rater rating={this.state.rating} onRate={this.handleRate.bind(this)} />
            <span>{ 'Rating value: ' + this.state.rating}</span>
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
