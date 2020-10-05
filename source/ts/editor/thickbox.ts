/* eslint-disable no-implicit-globals */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-function */
/* eslint-disable no-undef */
Modularity = Modularity || {};
Modularity.Editor = Modularity.Editor || {};

Modularity.Editor.Thickbox = (function ($) {
	/**
	 * Attention: This variable should not be set manually
	 *
	 * Indicates if we are adding a new post or editing old one
	 *
	 * @type {string}
	 */
	const postAction = 'add';

	function Thickbox() {}

	Thickbox.prototype.modulePostCreated = function (postId) {
		Modularity.Prompt.Modal.close();

		const module = Modularity.Editor.Module.isEditingModule();

		const request = {
			action: 'get_post',
			id: postId,
		};

		$.post(
			ajaxurl,
			request,
			function (response) {
				const data = {
					post_id: response.ID,
					title: response.post_title,
				};

				Modularity.Editor.Module.updateModule(module, data);
				Modularity.Editor.Autosave.save('form');
			},
			'json'
		);
	};

	return new Thickbox();
})(jQuery);
