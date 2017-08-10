# React-rater

Star rater   [![Build Status](https://travis-ci.org/NdYAG/react-rater.svg?branch=master)](https://travis-ci.org/NdYAG/react-rater)

![](http://7d9o0k.com1.z0.glb.clouddn.com/rater.gif)

[Live demo](https://rawgit.com/ndyag/react-rater/master/example/index.html)

## Install

```
npm install react-rater
```

```js
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'

// ...
render() {
  return (<Rater total={5} rating={2} />)
}
```

## API

```html
<Rater total={} rating={} onRate={} interactive={} />
```

All attributes are optional.

* `total`: default 5
* `rating`: default 0
* `onRate`: `function()`. Callback to retrieve rating value.
* `interactive`: default `true`. Create a read-only rater by setting this attribute to `false`.

### Read-only mode

Set `interactive={false}` to create a read-only rater.

In read-only mode, `rating` could contain a fractional part like `3.6`. (Thanks to @devmtnaing)

### Callback

`onRate` is called on mousemove/mouseenter/click/mouseleave.

For mousemove/mouseenter/mouseleave, the structure of argument is:

(`rating` is passed with the React's [SyntheticEvent](https://facebook.github.io/react/docs/events.html))
```
{
  rating: Number
  ...syntheticEvent
}
```

## Styling

### The CSS way

```scss
$react-rater-link: #ccc !default;   // color of star not rated
$react-rater-hover: #666 !default;  // color of star on hover
$react-rater-active: #000 !default; // color of star rated
```

### The JS way

`<Rater />` will repeat its children until counts reach `total`. https://github.com/NdYAG/react-rater/blob/master/src/index.js#L69

In this way you can define your own 'star' component ([src/star.js](https://github.com/NdYAG/react-rater/blob/master/src%2Fstar.js)).

```html
<Rater total={5}>
  <Heart />
</Rater>
```

and style it based on these props:

```
{
  isActive: PropTypes.bool,
  isActiveHalf: PropTypes.bool,
  willBeActive: PropTypes.bool,
  isDisabled: PropTypes.bool
}
```

## Real world example

Valentine's Day:

![Valentine](http://7d9o0k.com1.z0.glb.clouddn.com/valentine.png)

Abilu judge system for Douban Music:

![Abilu judge system for Douban Muisc](http://i.imgur.com/fbrX3mg.png)

## License

BSD.
