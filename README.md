# React-rater

Star rater

![](http://7d9o0k.com1.z0.glb.clouddn.com/rater.gif)

[Live demo](https://rawgit.com/ndyag/react-rater/master/example/index.html)

## install

```
npm install react-rater
```

```js
import Rater from 'react-rater'

// ...
render() {
  return (<Rater total={5} rating={2} />)
}
```

## API

```html
<Rater total={} rating={} limit={} onRate={} />
```

All attributes are optional.

* `total`: default 5
* `rating`: default 0
* `limit`: default value is same as `total`.
* `onRate`: `function(e)`. Callback to retrieve rating value.
* `interactive`: default `true`. Create a read-only rater by setting this attribute to `false`.

Notice:
`onRate` is called on mousemove/mouseenter/click/mouseleave.

For mousemove/mouseenter/mouseleave, the structure of argument `e` is:
```
{
  rating: Number // the rating value,
  originalEvent: Event
}
```

For click, the structure of `e` is:
```
{
  rating: Number // the rating value,
  lastRating: Number // the last rating value,
  originalEvent: Event
}
```
In some scenarios, you may want to delete the rating if user rate a same value.
```javascript
onRate(e) {
  if (e.originalEvent.type === 'click' && e.rating === e.lastRating) {
    // set prop of Rater to 0
  }
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

In this way you can define your own 'star' component (remember to check out [src/star.js](https://github.com/NdYAG/react-rater/blob/master/src%2Fstar.js)).

```
<Rater total={5}>
  <Heart />
</Rater>
```

## Real world example

Valentine's Day:

![Valentine](http://7d9o0k.com1.z0.glb.clouddn.com/valentine.png)

Abilu judge system for Douban Music:

![Abilu judge system for Douban Muisc](http://i.imgur.com/fbrX3mg.png)

## License

BSD.
