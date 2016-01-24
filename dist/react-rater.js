(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define("ReactRater", ["React"], factory);
	else if(typeof exports === 'object')
		exports["ReactRater"] = factory(require("React"));
	else
		root["ReactRater"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Star = undefined;

	var _star = __webpack_require__(1);

	Object.defineProperty(exports, 'Star', {
	  enumerable: true,
	  get: function get() {
	    return _star.Star;
	  }
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _star2 = _interopRequireDefault(_star);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Rater = function (_Component) {
	  _inherits(Rater, _Component);

	  function Rater(props) {
	    _classCallCheck(this, Rater);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Rater).call(this, props));

	    _this.state = {
	      lastRating: props.rating,
	      rating: props.rating
	    };
	    return _this;
	  }

	  _createClass(Rater, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.setState({
	        rating: this.props.rating
	      });
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      this.setState({
	        rating: nextProps.rating
	      });
	    }
	  }, {
	    key: 'handleMouseEnter',
	    value: function handleMouseEnter() {
	      this.setState({
	        rating: 0
	      });
	    }
	  }, {
	    key: 'handleMouseMove',
	    value: function handleMouseMove(e) {
	      var rating = getRatingFromDOMEvent(e, this.props),
	          callback = this.props.onRate;rating > 0 && callback && callback(rating);
	    }
	  }, {
	    key: 'handleMouseLeave',
	    value: function handleMouseLeave() {
	      var callback = this.props.onRate,
	          state = this.state;
	      callback && callback(state.lastRating);
	      this.setState({
	        rating: state.lastRating
	      });
	    }
	  }, {
	    key: 'handleClick',
	    value: function handleClick(e) {
	      var rating = getRatingFromDOMEvent(e, this.props),
	          lastRating = Number(this.state.lastRating),
	          callback = this.props.onRate;
	      if (rating < 0 || e.target.getAttribute('class').indexOf('is-disabled') > -1) {
	        return;
	      }
	      this.setState({
	        rating: rating,
	        lastRating: rating
	      });
	      callback && callback(rating, lastRating);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var total = Number(this.props.total),
	          limit = Number(this.props.limit),
	          rating = Number(this.state.rating),
	          children = Array.prototype.concat(this.props.children).filter(Boolean),
	          nodes = undefined;
	      limit = this.props.limit === void 0 ? total : limit;
	      nodes = Array(total).join(',').split(',').map(function (_, i) {
	        var starProps = {
	          isActive: i >= total - rating ? true : false,
	          isDisabled: i < total - limit ? true : false,
	          key: 'star-' + i
	        };
	        if (children.length) {
	          return _react2.default.cloneElement(children[i % children.length], starProps);
	        } else {
	          return _react2.default.createElement(_star2.default, starProps);
	        }
	      });
	      return _react2.default.createElement(
	        'div',
	        { className: 'react-rater',
	          onMouseEnter: this.handleMouseEnter.bind(this),
	          onMouseLeave: this.handleMouseLeave.bind(this),
	          onMouseMove: this.handleMouseMove.bind(this),
	          onClick: this.handleClick.bind(this) },
	        nodes
	      );
	    }
	  }]);

	  return Rater;
	}(_react.Component);

	exports.default = Rater;

	Rater.defaultProps = {
	  total: 5,
	  rating: 0
	};

	function getRatingFromDOMEvent(e, props) {
	  var star = e.target,
	      allStars = Array.apply(null, e.currentTarget.childNodes),
	      index = allStars.indexOf(star),
	      rating = props.total - index,
	      limit = Number(props.limit);
	  if (index < 0) {
	    return -1;
	  }
	  limit = props.limit === void 0 ? props.total : limit;
	  rating = rating < limit ? rating : limit;
	  return Number(rating);
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Star = function (_Component) {
	  _inherits(Star, _Component);

	  function Star() {
	    _classCallCheck(this, Star);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Star).apply(this, arguments));
	  }

	  _createClass(Star, [{
	    key: 'render',
	    value: function render() {
	      var className = this.props.isActive ? 'is-active' : '';
	      className += this.props.isDisabled ? ' is-disabled' : '';
	      return _react2.default.createElement(
	        'a',
	        { className: className },
	        '★'
	      );
	    }
	  }]);

	  return Star;
	}(_react.Component);

	exports.default = Star;

	Star.defaultProps = {
	  isActive: false,
	  isDisabled: false
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }
/******/ ])
});
;