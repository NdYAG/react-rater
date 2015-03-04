# React-rater

Star rater

[Live demo](https://rawgit.com/ndyag/react-rater/master/example/index.html)

## install

Bower:

```sh
bower install react-rater
```

For bower usage,

```html
<link rel="stylesheet" href="path/to/react-react.css">

<script src="path/to/react.js"></script>
<script src="path/to/react-rater/index.js"></script>
```

NPM:

```
npm install react-rater
```


## API

```html
<Rater total={} rating={} limit={} onRate={} />
```

All attributes are optional.

* `total`: default 5
* `rating`: default 0
* `limit`: default same as `total`. Sets the maximum rating value available.
* `onRate`: `function(rating, lastRating)`. Callback to retrieve rating value.

## Styling

```scss
$react-rater-link: #ccc !default;   // color of star not rated
$react-rater-hover: #666 !default;  // color of star on hover
$react-rater-active: #000 !default; // color of star rated
```

## Real world example

Abilu judge system for Douban Music:

![Abilu judge system for Douban Muisc](http://i.imgur.com/fbrX3mg.png)

## License

BSD.
