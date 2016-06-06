# MonadPlus

Partial port of Haskell's
[MonadPlus](https://en.wikibooks.org/wiki/Haskell/MonadPlus) library to
JavaScript.

[![npm Version][npm-badge]][npm]
[![Build Status][build-badge]][build-status]
[![Test Coverage][coverage-badge]][coverage-result]
[![Dependency Status][dep-badge]][dep-status]

## Installation

Install using npm:

    $ npm install monadplus

## Usage

__monadplus__ is intended to be used in combination with
[Fantasyland-compatible](https://github.com/fantasyland/fantasy-land)
libraries that provide the `Maybe` type. Such libraries include, but are
not limited to, [data.maybe][], [ramda-fantasy][], and [sanctuary][].

```js
var Maybe = require('data.maybe'),
    Just = Maybe.Just,
    Nothing = Maybe.Nothing,
    MonadPlus = require('monadplus'),
    MaybePlus = MonadPlus.maybe(Maybe), // configure with Maybe of choice
    msum = MonadPlus.msum(MaybePlus);   // use with configured MaybePlus

MaybePlus.mzero(); //=> Nothing
MaybePlus.mplus(Just(1), Nothing()); //=> Just(1)
MaybePlus.mplus(Nothing(), Just(1)); //=> Just(1)
MaybePlus.mplus(Nothing(), Nothing()); //=> Nothing
msum([Nothing(), Just(1), Just(2)]); //=> Just(1)
msum([Nothing(), Nothing(), Nothing()]); //=> Nothing
```

## API

### Top-level

#### `maybe :: Maybe → MaybePlus`

A top-level export, `maybe` receives a `Maybe` implementation and returns a
`MaybePlus` constructor that is configured to work with the particular `Maybe`
implementation given. Generally this is only called once.

#### `msum :: MaybePlus → Function`

A top-level export, `msum` receives a configured `MaybePlus` constructor and
returns an `msum` implementation that will work with that type. Generally this
is only called once.



`MaybePlus` contains two static methods: `mzero` and `mplus`. `mzero` returns
the "neutral value" for the `Maybe` type, i.e., `Nothing`, while `mplus` is a
binary function that accepts two `Maybe` values and returns the first `Just`,
or `Nothing` in the case that neither argument is a `Just`.

`msum`, when given a list of `Maybe` values, will return the first `Just` in
the list, or `Nothing` in the event that the list is empty or contains no
`Just` values.

## License

MIT

[build-badge]: https://img.shields.io/travis/jimf/monadplus/master.svg
[build-status]: https://travis-ci.org/jimf/monadplus
[npm-badge]: https://img.shields.io/npm/v/monadplus.svg
[npm]: https://www.npmjs.org/package/monadplus
[coverage-badge]: https://img.shields.io/coveralls/jimf/monadplus.svg
[coverage-result]: https://coveralls.io/r/jimf/monadplus
[dep-badge]: https://img.shields.io/david/jimf/monadplus.svg
[dep-status]: https://david-dm.org/jimf/monadplus
[data.maybe]: https://github.com/folktale/data.maybe
[ramda-fantasy]: https://github.com/ramda/ramda-fantasy
[sanctuary]: https://github.com/sanctuary-js/sanctuary
