/* eslint-disable no-empty-function */
/* eslint-disable no-extra-bind */
/* eslint-disable no-undef */
/* eslint-disable no-implicit-globals */
Modularity = Modularity || {};
Modularity.Helpers = Modularity.Helpers || {};

Modularity.Helpers = (function ($) {
	function Helpers() {
		$(function () {}.bind(this));
	}

	Helpers.prototype.uuid = function () {
		return Math.random().toString(36).substr(2, 9);
	};

	return new Helpers();
})(jQuery);
