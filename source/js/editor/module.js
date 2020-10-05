/* eslint-disable no-alert */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable no-implicit-globals */
/* eslint-disable no-undef */
export default (function ($) {
	const initCompleted = false;

	/**
	 * Object to create Thickbox querystring from
	 *
	 * @type {Object}
	 */
	const thickboxOptions = {
		is_thickbox: true,
	};

	let editingModule = false;

	function Module() {
		$(
			function () {
				if (
					typeof pagenow !== 'undefined' &&
					pagenow === 'admin_page_modularity-editor'
				) {
					this.handleEvents();
					this.loadModules(modularity_post_id);
				}
			}.bind(this)
		);
	}

	/**
	 * Loads saved modules and adds them to the page
	 *
	 * @param  {number} postId The post id to load modules from
	 * @return {void}
	 */
	Module.prototype.loadModules = function (postId) {
		const request = {
			action: 'get_post_modules',
			id: postId,
		};

		$.post(
			ajaxurl,
			request,
			function (response) {
				$.each(
					response,
					function (sidebar, modules) {
						const sidebarElement = $(
							'.modularity-sidebar-area[data-area-id="' + sidebar + '"]'
						);

						$.each(
							modules.modules,
							function (key, data) {
								if (data.hidden === 'true') {
									data.hidden = true;
								}

								const incompability =
									typeof data.sidebar_incompability !== 'undefined' &&
									!$.isEmptyObject(data.sidebar_incompability)
										? JSON.stringify(data.sidebar_incompability)
										: '';
								this.addModule(
									sidebarElement,
									data.post_type,
									data.post_type_name,
									data.post_title,
									data.ID,
									data.hidden,
									data.columnWidth,
									data.isDeprecated,
									incompability
								);
							}.bind(this)
						);

						sidebarElement.removeClass('modularity-spinner');
					}.bind(this)
				);

				this.initCompleted = true;
				$('.modularity-sidebar-area').removeClass('modularity-spinner');
			}.bind(this),
			'json'
		);
	};

	/**
	 * Check editing module
	 *
	 * @return {boolean|string} Returns boolean or string
	 */
	Module.prototype.isEditingModule = function () {
		return editingModule;
	};

	/**
	 * Generates a thickbox url to open a thickbox in correct mode
	 *
	 * @param  {string} action Should be "add" or "edit"
	 * @param  {Object} data   Should contain additional data (for now supports "postId" and "postType")
	 * @return {string}        Thickbox url
	 */
	Module.prototype.getThickBoxUrl = function (action, data) {
		let base = '';
		const querystring = {};

		switch (action) {
			case 'add':
				base = 'post-new.php';
				break;

			case 'edit':
				base = 'post.php';
				break;
		}

		if (typeof data.postId === 'number') {
			querystring.post = data.postId;
			querystring.action = 'edit';
		}

		if (typeof data.postType === 'string') {
			querystring.post_type = data.postType;
		}

		return (
			admin_url +
			base +
			'?' +
			$.param(querystring) +
			'&' +
			$.param(thickboxOptions)
		);
	};

	Module.prototype.getImportUrl = function (data) {
		const base = 'edit.php';
		const querystring = {};

		querystring.post_type = data.postType;

		return (
			admin_url +
			base +
			'?' +
			$.param(querystring) +
			'&' +
			$.param(thickboxOptions)
		);
	};

	/**
	 * Adds a module "row" to the target placeholder
	 *
	 * @param {Object} target   The target selector
	 * @param {string} moduleId   The module id slug
	 * @param {string} moduleName The module name
	 * @param {string} moduleTitle Title
	 * @param {number} postId Id
	 * @param {boolean} hidden Is Hidden
	 * @param {number} columnWidth Column Width
	 * @param {boolean} isDeprecated Is Deprecated
	 * @param {boolean} incompability Is Incompatible?
	 * @return {void}
	 */
	Module.prototype.addModule = function (
		target,
		moduleId,
		moduleName,
		moduleTitle,
		postId,
		hidden,
		columnWidth,
		isDeprecated,
		incompability
	) {
		moduleTitle = typeof moduleTitle !== 'undefined' ? ': ' + moduleTitle : '';
		postId = typeof postId !== 'undefined' ? postId : '';
		columnWidth = typeof columnWidth !== 'undefined' ? columnWidth : '';
		deprecated =
			isDeprecated === true
				? `<span class="modularity-deprecated" style="color:#ff0000;">(${modularityAdminLanguage.deprecated})</span>`
				: '';
		incompability = typeof incompability !== 'undefined' ? incompability : '';

		// Get thickbox url
		let thickboxUrl = this.getThickBoxUrl('add', {
			postType: moduleId,
		});

		// Set thickbox action
		Modularity.Editor.Thickbox.postAction = 'add';

		if (postId) {
			thickboxUrl = this.getThickBoxUrl('edit', {
				postId,
			});

			Modularity.Editor.Thickbox.postAction = 'edit';
		}

		// Get import url
		const importUrl = this.getImportUrl({
			postType: moduleId,
		});

		// Check/uncheck hidden checkbox
		let isHidden = '';
		if (hidden === true) {
			isHidden = 'checked';
		}

		const sidebarId = $(target).data('area-id');
		const itemRowId = Modularity.Helpers.uuid();

		const html = `<li id="post-${postId}" data-module-id="${moduleId}" data-module-stored-width="${columnWidth}" data-sidebar-incompability='${incompability}'>                <span class="modularity-line-wrapper">                    <span class="modularity-sortable-handle"></span>                    <span class="modularity-module-name">                        ${moduleName}                        ${deprecated}                        <span class="modularity-module-title">${moduleTitle}</span>                        <label class="modularity-module-hide">                            <input type="checkbox" name="modularity_modules[${sidebarId}][${itemRowId}][hidden]" value="hidden" ${isHidden} />                            ${modularityAdminLanguage.langhide}                        </label>                    </span>                    <span class="modularity-module-columns">                        <label>${modularityAdminLanguage.width}:</label>                        <select name="modularity_modules[${sidebarId}][${itemRowId}][columnWidth]">                            ${modularityAdminLanguage.widthOptions}                        </select>                    </span>                    <span class="modularity-module-actions">                        <a href="${thickboxUrl}" data-modularity-modal class="modularity-js-thickbox-open"><span>${modularityAdminLanguage.langedit}</span></a>                        <a href="${importUrl}" class="modularity-js-thickbox-import"><span>${modularityAdminLanguage.langimport}</span></a>                        <a href="#remove" class="modularity-module-remove"><span>${modularityAdminLanguage.langremove}</span></a>                    </span>                    <input type="hidden" name="modularity_modules[${sidebarId}][${itemRowId}][postid]" class="modularity-js-module-id" value="${postId}" required>                </span>            </li>`;

		// Store
		$(target).append(html);

		// Update width selector
		$('.modularity-sidebar-area > li').each(function (index, item) {
			$('.modularity-module-columns select', $(item)).val(
				$(item).attr('data-module-stored-width')
			);
		});

		// Refresh
		$('.modularity-js-sortable').sortable('refresh');
	};

	/**
	 * Updates a module "row" after editing the module post
	 *
	 * @param  {HTMLElement} module    Module dom element
	 * @param  {Object} data   The data
	 * @return {void}
	 */
	Module.prototype.updateModule = function (module, data) {
		// Href
		module.find('a.modularity-js-thickbox-open').attr(
			'href',
			this.getThickBoxUrl('edit', {
				postId: data.post_id,
			})
		);

		// Post id input
		module.find('input.modularity-js-module-id').val(data.post_id).change();

		// Post title
		module.find('.modularity-module-title').text(': ' + data.title);
	};

	/**
	 * Removes a module "row" from the placeholder
	 *
	 * @param  {HTMLElement} module The (to be removed) module's dom element
	 * @return {void}
	 */
	Module.prototype.removeModule = function (module) {
		if (confirm(modularityAdminLanguage.actionRemove)) {
			module.remove();
		}
	};

	/**
	 * Handle events
	 *
	 * @return {void}
	 */
	Module.prototype.handleEvents = function () {
		// Trash icon
		$(document).on(
			'click',
			'.modularity-module-remove',
			function (e) {
				e.preventDefault();
				const target = $(e.target).closest('li');
				this.removeModule(target);
			}.bind(this)
		);

		// Import
		$(document).on('click', '.modularity-js-thickbox-import', function (e) {
			e.preventDefault();

			const el = $(e.target).closest('a');
			editingModule = $(e.target).closest('li');

			Modularity.Editor.Thickbox.postAction = 'import';
			Modularity.Prompt.Modal.open($(e.target).closest('a').attr('href'));
		});

		// Edit
		$(document).on('click', '.modularity-js-thickbox-open', function (e) {
			e.preventDefault();

			const el = $(e.target).closest('a');
			if (el.attr('href').indexOf('post.php') > -1) {
				Modularity.Editor.Thickbox.postAction = 'edit';
			}

			editingModule = $(e.target).closest('li');

			Modularity.Prompt.Modal.open($(e.target).closest('a').attr('href'));
		});
	};

	return new Module();
})(jQuery);
