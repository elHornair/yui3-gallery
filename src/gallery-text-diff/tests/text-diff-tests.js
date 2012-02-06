/*jslint white: true, onevar: true, undef: true, newcap: true, regexp: true, plusplus: true, bitwise: true, maxerr: 50, indent: 4, browser: true, nomen: true */
/*global window, navigator, YUI */
YUI.add('text-diff-tests', function(Y) {

    'use strict';

    Y.namespace('TextDiff').Tests = new Y.Test.Case({
		name : 'TextDiff Tests',

		setUp : function() {
            this.textDiffComponent = new Y.TextDiff();
        },

        tearDown : function() {
            this.textDiffComponent.destroy();
            this.textDiffComponent = null;
        },

        'test trivial cases' : function() {
            var diffObj = this.textDiffComponent.calculateDiff('test', 'test');

            Y.Assert.areEqual(diffObj.diffString, '____');
            Y.Assert.areEqual(diffObj.dist, 0);

            diffObj = this.textDiffComponent.calculateDiff('', '');

            Y.Assert.areEqual(diffObj.diffString, '');
            Y.Assert.areEqual(diffObj.dist, 0);

            diffObj = this.textDiffComponent.calculateDiff('test', '');

            Y.Assert.areEqual(diffObj.diffString, 'iiii');
            Y.Assert.areEqual(diffObj.dist, 4);

            diffObj = this.textDiffComponent.calculateDiff('', 'tes');

            Y.Assert.areEqual(diffObj.diffString, 'ddd');
            Y.Assert.areEqual(diffObj.dist, 3);
        },

        'test simple substitutions, insertions and deletions' : function() {
            var diffObj = this.textDiffComponent.calculateDiff('kitten', 'sitting');

            Y.Assert.areEqual(diffObj.diffString, 's___s_d');
            Y.Assert.areEqual(diffObj.dist, 3);

            diffObj = this.textDiffComponent.calculateDiff('kitten', 'sitti');

            Y.Assert.areEqual(diffObj.diffString, 's___is');
            Y.Assert.areEqual(diffObj.dist, 3);
        },

        'test complex substitutions, insertions and deletions' : function() {
            var diffObj = this.textDiffComponent.calculateDiff('n f', 'f');

            Y.Assert.areEqual(diffObj.diffString, 'ii_');
            Y.Assert.areEqual(diffObj.dist, 2);

            diffObj = this.textDiffComponent.calculateDiff('the quick brown fox jumps', 'thee quikk browfox jumpks');

            Y.Assert.areEqual(diffObj.diffString, '__d_____s______ii________d_');
            Y.Assert.areEqual(diffObj.dist, 5);

            diffObj = this.textDiffComponent.calculateDiff('the quick brown fox jumps', 'thee quikk brownfx jumpks');

            Y.Assert.areEqual(diffObj.diffString, '__d_____s_______i_i______d_');
            Y.Assert.areEqual(diffObj.dist, 5);
        },

        'test transpositions' : function() {
            var diffObj = this.textDiffComponent.calculateDiff('test', 'etst');

            Y.Assert.areEqual(diffObj.diffString, 'tt__');
            Y.Assert.areEqual(diffObj.dist, 1);

            diffObj = this.textDiffComponent.calculateDiff('kitten', 'ntiten');

            Y.Assert.areEqual(diffObj.diffString, 'stt___');
            Y.Assert.areEqual(diffObj.dist, 2);

            diffObj = this.textDiffComponent.calculateDiff('kitten', 'wiktten');

            Y.Assert.areEqual(diffObj.diffString, 'dtt____');
            Y.Assert.areEqual(diffObj.dist, 2);
        },

        'test configuration options' : function() {
            var configuredTextDiffComponent = new Y.TextDiff({
                substitutionChar: 'x',
                insertionChar: 'y',
                complianceChar: 'z',
                deletionChar: 'u',
                transpositionChar: 'v'
            });

            Y.Assert.areEqual(configuredTextDiffComponent.calculateDiff('kitten are sitting', 'iktten kre ittingk').diffString, 'vvzzzzzxzzzyzzzzzzu');

            configuredTextDiffComponent.destroy();
            configuredTextDiffComponent = null;
        }

    });

}, '@VERSION@', { requires : [ 'gallery-text-diff', 'test' ] });