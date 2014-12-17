var React = require('react')
  , Rater = require('../')

var App = React.createClass({
    handleRate: function(rating, lastRating) {
        alert('You rated ' + rating)
    },
    render: function() {
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
                                {'<Rater total={5} rating={0} onRate={this.handleRate} />'}
                            </code>
                        </pre>
                        <Rater total={5} rating={0} onRate={this.handleRate} />
                    </dd>
                </dl>
                <p>Take a view of the <a href="https://github.com/NdYAG/react-rater/blob/master/example%2Findex.jsx" target="_blank">source code</a> of this example</p>
            </div>
        )
    }
})

React.render(<App />, document.getElementById('app'))
