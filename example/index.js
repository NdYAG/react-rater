import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Rater from '../src/'

class RegularExample extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rating: 0
    }
  }
  handleRate(rating, lastRating) {
    this.setState({
      rating
    })
    // lastRating is not undefined,
    // which means user have rated
    if (lastRating !== void 0) {
      alert('You rated ' + rating)
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
        </dl>
      </div>
    )
  }
}

function render() {
  ReactDOM.render(
    <div>
      <RegularExample />
    </div>
  , document.getElementById('app'))
}

render()
