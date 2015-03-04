;(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['react'], factory)
    } else if (typeof exports === 'object') {
        module.exports = factory(require('react'))
    } else {
        root.Rater = factory(React)
    }
})(this, function(React) {
    var Star = React.createClass({
        getDefaultProps: function () {
            return {
                isActive: false,
                isDisabled: false
            }
        },
        render: function () {
            var className = this.props.isActive? 'is-active': ''
            className += this.props.isDisabled? ' is-disabled': ''
            return (
                <a className={className}>★</a>
            )
        }
    })
    var Rater = React.createClass({
        getInitialState: function() {
            return {
                lastRating: this.props.rating,
                rating: this.props.rating
            }
        },
        getDefaultProps: function() {
            return {
                total: 5,
                rating: 0
            }
        },
        componentDidMount: function() {
            this.setState({
                rating: this.props.rating
            })
        },
        handleMouseEnter: function () {
            this.setState({
                rating: 0
            })
        },
        handleMouseMove: function(e) {
            var rating = getRatingFromDOMEvent(e, this.props)
              , callback = this.props.onRate
            callback && callback(rating)
        },
        handleMouseLeave: function () {
            var callback = this.props.onRate
              , state = this.state
            if (state.rating === 0) {
                callback && callback(state.lastRating)
                this.setState({
                    rating: state.lastRating
                })
            }
        },
        handleClick: function (e) {
            var rating = getRatingFromDOMEvent(e, this.props)
              , lastRating = Number(this.state.lastRating)
              , callback = this.props.onRate
            if (e.target.getAttribute('class').indexOf('is-disabled') > -1) {
                return
            }
            this.setState({
                lastRating: rating,
                rating: rating
            })
            callback && callback(rating, lastRating)
        },
        render: function () {
            var total = Number(this.props.total)
              , limit = Number(this.props.limit)
              , rating = Number(this.state.rating)
              , nodes
            limit = (this.props.limit === void 0)? total: limit
            nodes = Array(total).join(',').split(',').map(function (_, i) {
                return (
                    <Star
                        isActive={ (i >= total - rating) ? true: false }
                        isDisabled={ (i < total - limit) ? true: false } />
                )
            }.bind(this))
            return (
                <div
                    className="react-rater"
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                    onMouseMove={this.handleMouseMove}
                    onClick={this.handleClick}>{nodes}</div>
            )
        }
    })
    function getRatingFromDOMEvent(e, props) {
        var star = e.target
          , allStars = Array.prototype.slice.call(e.currentTarget.childNodes, 0)
          , index = allStars.indexOf(star)
          , rating = props.total - index
          , limit = Number(props.limit)
        limit = (props.limit === void 0)? props.total: limit
        rating = rating < limit? rating: limit
        return Number(rating)
    }
    return Rater
})
