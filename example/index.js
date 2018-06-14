import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader'
import Rater from '../src'
import AnimatedRater from './AnimatedRater'
import EmojiRater from './EmojiRater'
import RaterWithCallback from './RaterWithCallback'
import './index.scss'

class App extends Component {
  render() {
    return (
      <main>
        <section className="AnimatedRater">
          <AnimatedRater />
        </section>
        <section className="PlainRater">
          <h3>1. Interactive</h3>
          <Rater rating={4} total={5} />
          <code>{'<Rater rating={4} total={5} />'}</code>
        </section>
        <section className="PlainRater">
          <h3>2. Static</h3>
          <Rater rating={2} total={5} interactive={false} />
          <code>{'<Rater rating={2} total={5} interactive={false} />'}</code>
        </section>
        <section className="RaterWithCallback">
          <h3>3. Callback</h3>
          <RaterWithCallback />
          <code>{'<Rater onRate={({rating}) => {}}/>'}</code>
        </section>
        <section className="EmojiRater">
          <h3>4. Customize</h3>
          <EmojiRater />
          <pre>
            <code>
              {`<Rater total={3} />
  <Angry />
  <Normal />
  <Smile />
</Rater>`}
            </code>
          </pre>
        </section>
      </main>
    )
  }
}

const Example = hot(module)(App)

function render() {
  ReactDOM.render(<Example />, document.getElementById('app'))
}

render()
