var I = function(a) { return a; };

/**
 * Configure a MaybePlus constructor given a Maybe implementation.
 *
 * @param {Maybe} Maybe The Maybe constructor to configure MaybePlus for.
 * @return {MaybePlus}
 */
module.exports = function(Maybe) {

    /**
     * MaybePlus constructor function. Not intended to be instantiated
     * directly.
     *
     * @class
     */
    function MaybePlus() {}

    /**
     * Returns the monadic value for no results (i.e., Nothing).
     *
     * @summary _ → Nothing
     */
    MaybePlus.mzero = function() {
        return Maybe.Nothing();
    };

    /**
     * Combines two Maybe values, returning the first Just.
     *
     * @summary Maybe a → Maybe a → Maybe a
     */
    MaybePlus.mplus = function(a, b) {
        return a.isJust ? a.map(I)
            : b.isJust ? b.map(I)
            : Maybe.Nothing();
    };

    return MaybePlus;
};
