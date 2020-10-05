/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable no-implicit-globals */
Modularity = Modularity || {};
Modularity.Editor = Modularity.Editor || {};

Modularity.Editor.Autosave = (function ($) {
	function Autosave() {
		$(function () {
			// this.handleEvents();
		});
	}

	Autosave.prototype.save = function (selector) {
		$('#modularity-options #publishing-action .spinner').css(
			'visibility',
			'visible'
		);
		const request = $(selector).serializeObject();
		request.id = modularity_post_id;
		request.action = 'save_modules';

		$.post(ajaxurl, request, function () {
			$('#modularity-options #publishing-action .spinner').css(
				'visibility',
				'hidden'
			);
		});
	};

	return new Autosave();
})(jQuery);
