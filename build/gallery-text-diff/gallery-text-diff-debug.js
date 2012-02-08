YUI.add('gallery-text-diff', function(Y) {

/*
 * Copyright (c) 2012 Alain Horner. All rights reserved.
 *
 * This component helps you to calculate the difference between two strings using the Damerau-Levenshtein algorithm.
 * It is able to tell you how many actions (deletion, insertion, substitution, transposition) would be neccessary to
 * transform one string into the other. In addition to that, it calculates a diff-string, that tells you at what positions
 * of the string, the actions would have to take place. The characters used for the different actions are configurable
 *
 */

'use strict';

/****************************************************************************************/
/************************************ public members ************************************/
/****************************************************************************************/

Y.TextDiff = Y.Base.create('TextDiff', Y.Base, [], {

    /****************************************************************************************/
    /*********************************** private methods ************************************/
    /****************************************************************************************/

    /**
     * Creates a string of variable length, that consists of one kind of character
     *
     * @param {Char} letter     The character the string consists of
     * @param {Number} length   The length of the string
     * @return {String}
     **/
    _constructSingleCharString: function (letter, length) {
        var singleCharString = '',
            i;

        for (i = 0; i < length; i++) {
            singleCharString += letter;
        }

        return singleCharString;
    },

    /****************************************************************************************/
    /************************************ public methods ************************************/
    /****************************************************************************************/

    /**
     * Calculates the diff between two strings
     *
     * @param {String} targetStr    The target string
     * @param {String} compStr      The comparison string
     * @return {Object}             An object with two properties:
     *                              - {String}  diffString  A string describing the difference between the two given strings
     *                              - {Number}  dist        The Damerau-Levenshtein distance which can be interpreted as the amount of differences
     **/
    calculateDiff: function (targetStr, compStr) {
        var instance = this,
            targetArray = null,
            compArray = null,
            diffMatrix = [],
            minObj = null,
            i,
            j;

        // trivial cases
        if (targetStr === compStr) {
            return {
                diffString: this._constructSingleCharString(this.get('complianceChar'), targetStr.length),
                dist: 0
            };
        } else if (compStr.length === 0) {
            return {
                diffString: this._constructSingleCharString(this.get('insertionChar'), targetStr.length),
                dist: targetStr.length
            };
        } else if (targetStr.length === 0) {
            return {
                diffString: this._constructSingleCharString(this.get('deletionChar'), compStr.length),
                dist: compStr.length
            };
        }

        // prepare matrix and comparison-vectors
        targetArray = targetStr.split('');
        compArray = compStr.split('');

        for (i = 0; i <= compStr.length; i++) {
            diffMatrix[i] = [{
                dist: i,
                diff: this._constructSingleCharString(this.get('deletionChar'), i)
            }];
        }

        for (j = 0; j <= targetStr.length; j++) {
            diffMatrix[0][j] = {
                dist: j,
                diff: this._constructSingleCharString(this.get('insertionChar'), j)
            };
        }

        // calculate difference
        Y.Array.each(compArray, function (compChar, i) {
            Y.Array.each(targetArray, function (targetChar, j) {
                if (compArray[i] === targetArray[j]) {

                    // compliance
                    diffMatrix[i + 1][j + 1] = {
                        dist: diffMatrix[i][j].dist,
                        diff: diffMatrix[i][j].diff + instance.get('complianceChar')
                    };

                } else {

                    // deletion
                    minObj = {
                        dist: diffMatrix[i][j + 1].dist + 1,
                        diff: diffMatrix[i][j + 1].diff + instance.get('deletionChar')
                    };

                    // insertion
                    if (diffMatrix[i + 1][j].dist + 1 < minObj.dist) {
                        minObj = {
                            dist: diffMatrix[i + 1][j].dist + 1,
                            diff: diffMatrix[i + 1][j].diff + instance.get('insertionChar')
                        };
                    }

                    // substitution
                    if (diffMatrix[i][j].dist + 1 < minObj.dist) {
                        minObj = {
                            dist: diffMatrix[i][j].dist + 1,
                            diff: diffMatrix[i][j].diff + instance.get('substitutionChar')
                        };
                    }

                    // transposition
                    if (i > 0 && j > 0 && compChar === targetArray[j - 1] && targetChar === compArray[i - 1] && diffMatrix[i - 1][j - 1].dist + 1 < minObj.dist) {
                        minObj = {
                            dist: diffMatrix[i - 1][j - 1].dist + 1,
                            diff: diffMatrix[i - 1][j - 1].diff + instance.get('transpositionChar') + instance.get('transpositionChar')
                        };
                    }

                    diffMatrix[i + 1][j + 1] = minObj;

                }
            });
        });

        return {
            diffString: diffMatrix[compStr.length][targetStr.length].diff,
            dist: diffMatrix[compStr.length][targetStr.length].dist
        };

    }

}, {
    NS: 'text-diff',
    ATTRS: {
        complianceChar: {
            value: '_'
        },
        deletionChar: {
            value: 'd'
        },
        insertionChar: {
            value: 'i'
        },
        substitutionChar: {
            value: 's'
        },
        transpositionChar: {
            value: 't'
        }
    }
});


}, '@VERSION@' ,{requires:['base'], skinnable:false});
