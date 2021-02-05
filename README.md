# React-rater

Star rater [![Build Status](https://travis-ci.org/NdYAG/react-rater.svg?branch=master)](https://travis-ci.org/NdYAG/react-rater)

![](https://user-images.githubusercontent.com/1396511/84562331-469ae280-ad86-11ea-9567-9d554b204138.gif)

[Check out our new demo!](https://rawgit.com/ndyag/react-rater/master/example/index.html)

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

Note: If your react version is under 16.8.0 without hooks support, please keep using react-rater@5

## API

```html
<Rater total={} rating={} interactive={} onRate={} onRating={} />
```

All attributes are optional.

- `total`: Number, default 5
- `rating`: Number, default 0
- `interactive`: Boolean, default `true`. Create a read-only rater by setting this attribute to `false`.
- `onRate`: `function({ rating })`. Callback to retrieve rating value. Called after rated.
- `onRating`: `function({ rating })`. Callback to retrieve rating value. Called during rating (mouse moving between stars).
- `onCancelRate`: `function({ rating })`. Called when mouse moves out from rater.

From version 5.0.0, callback is split into `onRate` & `onRating` & `onCancelRate`. `onRate` is called when mouse click, while `onRating` is called when mouse moves between star components and `onCancelRate` is called when mouse leaves rater. Usually you only need `onRate`.

### Read-only mode

Set `interactive={false}` to create a read-only rater.

In read-only mode, `rating` could contain a fractional part like `3.6`. (Thanks to @devmtnaing)

### Callback

`onRate` & `onRating`

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
$react-rater-link: #ccc !default; // color of star not rated
$react-rater-hover: #666 !default; // color of star on hover
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

![Valentine](https://user-images.githubusercontent.com/1396511/84562283-ee63e080-ad85-11ea-877e-0048b3bdbc97.png)

Abilu judge system for Douban Music:

![Abilu judge system for Douban Muisc](http://i.imgur.com/fbrX3mg.png)

## License

BSD.
