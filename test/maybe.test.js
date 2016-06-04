var test = require('tape'),
    FolktaleMaybe = require('data.maybe'),
    RamdaMaybe = require('ramda-fantasy/src/Maybe'),
    S = require('sanctuary'),
    SanctuaryMaybe = { Just: S.Just, Nothing: S.Nothing },
    MonadPlus = require('../');

function runTests(Maybe) {
    var MaybePlus = MonadPlus.maybe(Maybe),
        msum = MonadPlus.msum(MaybePlus),
        Just = Maybe.Just,
        Nothing = Maybe.Nothing,
        mzero = MaybePlus.mzero,
        mplus = MaybePlus.mplus;

    function getJust() {
        return Just(Math.random());
    }

    function getAny() {
        return Math.random() > 0.5 ? getJust() : Nothing();
    }

    test('MaybePlus.mzero', function(t) {
        t.ok(mzero().isNothing, 'returns Nothing()');
        t.end();
    });

    test('MaybePlus.mplus', function(t) {
        t.deepEqual(mplus(Just(1), Just(2)), Just(1), 'mplus(a, b) = a');
        t.deepEqual(mplus(Just(1), Nothing()), Just(1), 'mplus(a, Nothing) = a');
        t.deepEqual(mplus(Nothing(), Just(1)), Just(1), 'mplus(Nothing, a) = a');
        t.deepEqual(mplus(Nothing(), Nothing()), Nothing(), 'mplus(Nothing, Nothing) = Nothing');
        t.end();
    });

    test('MaybePlus laws', function(t) {
        // mzero is neutral
        // mplus is associative
        // TODO: quickcheck would be much better for these
        t.deepEqual(mplus(mzero(), Just(1)), Just(1));
        t.deepEqual(mplus(mzero(), Nothing()), Nothing());
        t.deepEqual(mplus(Just(1), mzero()), Just(1));
        t.deepEqual(mplus(Nothing(), mzero()), Nothing());

        var m = getAny(),
            n = getAny(),
            o = getAny();
        t.deepEqual(
            mplus(m, mplus(n, o)),
            mplus(mplus(m, n), o)
        );

        t.end();
    });

    test('msum :: Maybe', function(t) {
        t.deepEqual(msum([]), Nothing(), 'returns Nothing() for empty list');
        t.deepEqual(msum([Just(1), Nothing(), Just(2)]), Just(1), 'returns first Just');
        t.deepEqual(msum([Nothing(), Nothing()]), Nothing(), 'returns Nothing() when no Just');
        t.end();
    });
}

runTests(FolktaleMaybe);
runTests(RamdaMaybe);
runTests(SanctuaryMaybe);
