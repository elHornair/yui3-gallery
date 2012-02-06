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
        }

    });

}, '@VERSION@', { requires : [ 'gallery-text-diff', 'test' ] });