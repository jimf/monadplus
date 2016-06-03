/**
 * Create msum function given a MonadPlus constructor.
 *
 * @param {MonadPlus} MonadPlus MonadPlus constructor function
 * @return {function}
 */
module.exports = function(MonadPlus) {

    /**
     * msum for a list of Maybe. Reduces the list to the first Just found, or
     * Nothing in the absense of any Just values.
     *
     * @summary [Maybe a] → Maybe a
     */
    return function(xs) {
        return xs.reduce(MonadPlus.mplus, MonadPlus.mzero());
    };
};
