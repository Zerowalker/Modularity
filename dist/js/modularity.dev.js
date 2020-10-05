// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"OMxo":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* eslint-disable no-implicit-globals */

/* eslint-disable no-unused-vars */

/* eslint-disable no-undef */
var _default = function ($) {
  var isOpen = false;

  function Modal() {
    this.handleEvents();
  }

  Modal.prototype.open = function (url) {
    $('body').addClass('modularity-modal-open').append("\n            <div id=\"modularity-modal\">\n                <div class=\"modularity-modal-wrapper\">\n                    <button class=\"modularity-modal-close\" data-modularity-modal-action=\"close\">&times;\n\t\t\t\t\t            ".concat(modularityAdminLanguage.close, "\n\t\t\t\t\t          </button>\n                    <div class=\"modularity-modal-spinner-container\" id=\"modularity-iframe-loader\"><span class=\"modularity-modal-spinner\"></span></div>\n                    <iframe class=\"modularity-modal-iframe\" src=\"").concat(url, "\" frameborder=\"0\" onload=\"document.getElementById('modularity-iframe-loader').style.display='none';\" allowtransparency></iframe>\n                </div>\n            </div>\n        "));
    isOpen = true;
  };

  Modal.prototype.close = function () {
    $('body').removeClass('modularity-modal-open');
    $('#modularity-modal').remove();
    isOpen = false;
  };

  Modal.prototype.handleEvents = function () {
    $(document).on('click', '[data-modularity-modal-action="close"]', function (e) {
      e.preventDefault();
      this.close();
    }.bind(this));
  };

  return new Modal();
}(jQuery);

exports.default = _default;
},{}],"zveI":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* eslint-disable no-implicit-globals */

/* eslint-disable no-undef */
var _default = function ($) {
  var editingWidget = false;

  function Widget() {
    $(function () {
      /* Import */
      $(document).on('click', '.modularity-js-thickbox-widget-import-widget', function (e) {
        e.preventDefault();
        editingWidget = $(e.target).parents('.widget-inside');
        var importUrl = Modularity.Editor.Module.getImportUrl({
          postType: $(e.target).parents('.widget-inside').find('.modularity-widget-module-type select').val()
        });
        Modularity.Editor.Module.editingModule = $(e.target).closest('.widget-inside');
        Modularity.Editor.Thickbox.postAction = 'import-widget';
        Modularity.Prompt.Modal.open(importUrl);
      });
      /* Edit */

      $(document).on('click', '.modularity-js-thickbox-open-widget', function (e) {
        e.preventDefault();
        var el = $(e.target).closest('a');

        if (el.attr('href').indexOf('post.php') > -1) {
          Modularity.Editor.Thickbox.postAction = 'edit';
        }

        editingModule = $(e.target).closest('li');
        Modularity.Prompt.Modal.open($(e.target).closest('a').attr('href'));
      });
    });
  }

  Widget.prototype.isEditingWidget = function () {
    return editingWidget;
  };

  Widget.prototype.updateWidget = function (widget, data) {
    $(widget).find('.modularity-widget-module-id-span').html(data.post_id);
    $(widget).find('.modularity-widget-module-id').val(data.post_id);
    $(widget).find('.modularity-widget-module-edit').attr('href', 'post.php?post=' + data.post_id + '&action=edit&is_thickbox=true').removeClass('hidden');
    $(widget).find('.modularity-widget-module-title-span').html(data.title);
    $(widget).find('.modularity-widget-module-title').val(data.title);
  };

  return new Widget();
}(jQuery);

exports.default = _default;
},{}],"MqUa":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* eslint-disable no-empty-function */

/* eslint-disable no-extra-bind */

/* eslint-disable no-undef */

/* eslint-disable no-implicit-globals */
var _default = function ($) {
  function Helpers() {
    $(function () {}.bind(this));
  }

  Helpers.prototype.uuid = function () {
    return Math.random().toString(36).substr(2, 9);
  };

  return new Helpers();
}(jQuery);

exports.default = _default;
},{}],"wUyu":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function ($) {
  var hasErrors = false;
  var errorClass = 'validation-error';

  function Validate() {
    this.handleEvents();
  }
  /**
   * Run validation methods
   *
   * @return {void}
   */


  Validate.prototype.run = function () {
    hasErrors = false;
    this.checkRequired();
  };
  /**
   * Check required fileds is not empty
   *
   * @return {void}
   */


  Validate.prototype.checkRequired = function () {
    var required = $('[required]');
    required.removeClass(errorClass);
    required.each(function (index, element) {
      if ($(element).val().length === 0) {
        $(element).parents('li').addClass(errorClass);
        $(element).one('change', function (e) {
          $(e.target).parents('li').removeClass(errorClass);
        });
        hasErrors = true;
      }
    });
  };
  /**
   * Handle events
   *
   * @return {void}
   */


  Validate.prototype.handleEvents = function () {
    $(document).on('click', '#modularity-mb-editor-publish #publish', function () {
      this.run();

      if (hasErrors) {
        $('#modularity-mb-editor-publish .spinner').css('visibility', 'hidden');
        return false;
      }

      return true;
    }.bind(this));
  };

  return new Validate();
}(jQuery);

exports.default = _default;
},{}],"ETAS":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function ($) {
  /**
   * Attention: This variable should not be set manually
   *
   * Indicates if we are adding a new post or editing old one
   *
   * @type {string}
   */
  var postAction = 'add';

  function Thickbox() {}

  Thickbox.prototype.modulePostCreated = function (postId) {
    Modularity.Prompt.Modal.close();
    var module = Modularity.Editor.Module.isEditingModule();
    var request = {
      action: 'get_post',
      id: postId
    };
    $.post(ajaxurl, request, function (response) {
      var data = {
        post_id: response.ID,
        title: response.post_title
      };
      Modularity.Editor.Module.updateModule(module, data);
      Modularity.Editor.Autosave.save('form');
    }, 'json');
  };

  return new Thickbox();
}(jQuery);

exports.default = _default;
},{}],"u8w0":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* eslint-disable no-alert */

/* eslint-disable camelcase */

/* eslint-disable no-unused-vars */

/* eslint-disable no-implicit-globals */

/* eslint-disable no-undef */
var _default = function ($) {
  var initCompleted = false;
  /**
   * Object to create Thickbox querystring from
   *
   * @type {Object}
   */

  var thickboxOptions = {
    is_thickbox: true
  };
  var editingModule = false;

  function Module() {
    $(function () {
      if (typeof pagenow !== 'undefined' && pagenow === 'admin_page_modularity-editor') {
        this.handleEvents();
        this.loadModules(modularity_post_id);
      }
    }.bind(this));
  }
  /**
   * Loads saved modules and adds them to the page
   *
   * @param  {number} postId The post id to load modules from
   * @return {void}
   */


  Module.prototype.loadModules = function (postId) {
    var request = {
      action: 'get_post_modules',
      id: postId
    };
    $.post(ajaxurl, request, function (response) {
      $.each(response, function (sidebar, modules) {
        var sidebarElement = $('.modularity-sidebar-area[data-area-id="' + sidebar + '"]');
        $.each(modules.modules, function (key, data) {
          if (data.hidden === 'true') {
            data.hidden = true;
          }

          var incompability = typeof data.sidebar_incompability !== 'undefined' && !$.isEmptyObject(data.sidebar_incompability) ? JSON.stringify(data.sidebar_incompability) : '';
          this.addModule(sidebarElement, data.post_type, data.post_type_name, data.post_title, data.ID, data.hidden, data.columnWidth, data.isDeprecated, incompability);
        }.bind(this));
        sidebarElement.removeClass('modularity-spinner');
      }.bind(this));
      this.initCompleted = true;
      $('.modularity-sidebar-area').removeClass('modularity-spinner');
    }.bind(this), 'json');
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
    var base = '';
    var querystring = {};

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

    return admin_url + base + '?' + $.param(querystring) + '&' + $.param(thickboxOptions);
  };

  Module.prototype.getImportUrl = function (data) {
    var base = 'edit.php';
    var querystring = {};
    querystring.post_type = data.postType;
    return admin_url + base + '?' + $.param(querystring) + '&' + $.param(thickboxOptions);
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


  Module.prototype.addModule = function (target, moduleId, moduleName, moduleTitle, postId, hidden, columnWidth, isDeprecated, incompability) {
    moduleTitle = typeof moduleTitle !== 'undefined' ? ': ' + moduleTitle : '';
    postId = typeof postId !== 'undefined' ? postId : '';
    columnWidth = typeof columnWidth !== 'undefined' ? columnWidth : '';
    deprecated = isDeprecated === true ? "<span class=\"modularity-deprecated\" style=\"color:#ff0000;\">(".concat(modularityAdminLanguage.deprecated, ")</span>") : '';
    incompability = typeof incompability !== 'undefined' ? incompability : ''; // Get thickbox url

    var thickboxUrl = this.getThickBoxUrl('add', {
      postType: moduleId
    }); // Set thickbox action

    Modularity.Editor.Thickbox.postAction = 'add';

    if (postId) {
      thickboxUrl = this.getThickBoxUrl('edit', {
        postId: postId
      });
      Modularity.Editor.Thickbox.postAction = 'edit';
    } // Get import url


    var importUrl = this.getImportUrl({
      postType: moduleId
    }); // Check/uncheck hidden checkbox

    var isHidden = '';

    if (hidden === true) {
      isHidden = 'checked';
    }

    var sidebarId = $(target).data('area-id');
    var itemRowId = Modularity.Helpers.uuid();
    var html = "<li id=\"post-".concat(postId, "\" data-module-id=\"").concat(moduleId, "\" data-module-stored-width=\"").concat(columnWidth, "\" data-sidebar-incompability='").concat(incompability, "'>                <span class=\"modularity-line-wrapper\">                    <span class=\"modularity-sortable-handle\"></span>                    <span class=\"modularity-module-name\">                        ").concat(moduleName, "                        ").concat(deprecated, "                        <span class=\"modularity-module-title\">").concat(moduleTitle, "</span>                        <label class=\"modularity-module-hide\">                            <input type=\"checkbox\" name=\"modularity_modules[").concat(sidebarId, "][").concat(itemRowId, "][hidden]\" value=\"hidden\" ").concat(isHidden, " />                            ").concat(modularityAdminLanguage.langhide, "                        </label>                    </span>                    <span class=\"modularity-module-columns\">                        <label>").concat(modularityAdminLanguage.width, ":</label>                        <select name=\"modularity_modules[").concat(sidebarId, "][").concat(itemRowId, "][columnWidth]\">                            ").concat(modularityAdminLanguage.widthOptions, "                        </select>                    </span>                    <span class=\"modularity-module-actions\">                        <a href=\"").concat(thickboxUrl, "\" data-modularity-modal class=\"modularity-js-thickbox-open\"><span>").concat(modularityAdminLanguage.langedit, "</span></a>                        <a href=\"").concat(importUrl, "\" class=\"modularity-js-thickbox-import\"><span>").concat(modularityAdminLanguage.langimport, "</span></a>                        <a href=\"#remove\" class=\"modularity-module-remove\"><span>").concat(modularityAdminLanguage.langremove, "</span></a>                    </span>                    <input type=\"hidden\" name=\"modularity_modules[").concat(sidebarId, "][").concat(itemRowId, "][postid]\" class=\"modularity-js-module-id\" value=\"").concat(postId, "\" required>                </span>            </li>"); // Store

    $(target).append(html); // Update width selector

    $('.modularity-sidebar-area > li').each(function (index, item) {
      $('.modularity-module-columns select', $(item)).val($(item).attr('data-module-stored-width'));
    }); // Refresh

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
    module.find('a.modularity-js-thickbox-open').attr('href', this.getThickBoxUrl('edit', {
      postId: data.post_id
    })); // Post id input

    module.find('input.modularity-js-module-id').val(data.post_id).change(); // Post title

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
    $(document).on('click', '.modularity-module-remove', function (e) {
      e.preventDefault();
      var target = $(e.target).closest('li');
      this.removeModule(target);
    }.bind(this)); // Import

    $(document).on('click', '.modularity-js-thickbox-import', function (e) {
      e.preventDefault();
      var el = $(e.target).closest('a');
      editingModule = $(e.target).closest('li');
      Modularity.Editor.Thickbox.postAction = 'import';
      Modularity.Prompt.Modal.open($(e.target).closest('a').attr('href'));
    }); // Edit

    $(document).on('click', '.modularity-js-thickbox-open', function (e) {
      e.preventDefault();
      var el = $(e.target).closest('a');

      if (el.attr('href').indexOf('post.php') > -1) {
        Modularity.Editor.Thickbox.postAction = 'edit';
      }

      editingModule = $(e.target).closest('li');
      Modularity.Prompt.Modal.open($(e.target).closest('a').attr('href'));
    });
  };

  return new Module();
}(jQuery);

exports.default = _default;
},{}],"pSCb":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* eslint-disable no-console */

/* eslint-disable no-unused-vars */

/* eslint-disable no-implicit-globals */

/* eslint-disable no-undef */
var _default = function ($) {
  var sortableIn;

  function DragAndDrop() {
    $(function () {
      if (typeof pagenow !== 'undefined' && pagenow === 'admin_page_modularity-editor') {
        this.init();
      }
    }.bind(this));
  }
  /**
   * Initialize
   *
   * @return {void}
   */


  DragAndDrop.prototype.init = function () {
    this.setupDraggable();
    this.setupDroppable();
    this.setupSortable();
  };

  DragAndDrop.prototype.setupSortable = function () {
    $('.modularity-js-sortable').sortable({
      handle: '.modularity-sortable-handle',
      connectWith: '.modularity-js-sortable',
      placeholder: 'ui-sortable-placeholder',
      start: function start(e, ui) {
        try {
          var validTargetAreas = jQuery(ui.item).attr('data-sidebar-incompability');
          validTargetAreas = JSON.parse(validTargetAreas);

          if (validTargetAreas && _typeof(validTargetAreas) === 'object') {
            jQuery('.modularity-sidebar-area').each(function (index, sidebar) {
              if (!validTargetAreas.includes(jQuery(this).attr('data-area-id'))) {
                jQuery(this).parent().parent().removeClass('modularity-incompatible-area');
              } else {
                jQuery(this).parent().parent().addClass('modularity-incompatible-area');
              }
            });
          }
        } catch (error) {
          console.log('Incompability information not defined - ' + error);
        }
      },
      stop: function stop(e, ui) {
        var sidebarId = ui.item.parents('ul').data('area-id');
        ui.item.find('input[name^="modularity_modules"]').each(function (index, element) {
          var newName = $(this).attr('name').replace(/\[(.*?)\]/i, '[' + sidebarId + ']');
          $(this).attr('name', newName);
        });
        jQuery('[id^=modularity-mb-]').removeClass('modularity-incompatible-area');
      }
    }).bind(this);
  };
  /**
   * Setup draggable functionallity
   *
   * @return {void}
   */


  DragAndDrop.prototype.setupDraggable = function () {
    $('.modularity-js-draggable').draggable({
      appendTo: 'body',
      containment: 'document',
      scroll: false,
      helper: 'clone',
      revert: 'invalid',
      revertDuration: 200,
      start: function start(event, ui) {
        try {
          var validTargetAreas = jQuery(this).attr('data-sidebar-incompability');
          validTargetAreas = JSON.parse(validTargetAreas);

          if (validTargetAreas && _typeof(validTargetAreas) === 'object') {
            jQuery('.modularity-sidebar-area').each(function (index, sidebar) {
              if (!validTargetAreas.includes(jQuery(this).attr('data-area-id'))) {
                jQuery(this).parent().parent().removeClass('modularity-incompatible-area');
              } else {
                jQuery(this).parent().parent().addClass('modularity-incompatible-area');
              }
            });
          }
        } catch (error) {
          console.log('Incompability information not defined - ' + error);
        }
      },
      stop: function stop(event, ui) {
        jQuery('[id^=modularity-mb-]').removeClass('modularity-incompatible-area');
      }
    });
  };
  /**
   * Setup droppable functionallity
   *
   * @return {void}
   */


  DragAndDrop.prototype.setupDroppable = function () {
    $('.modularity-js-droppable').droppable({
      accept: '.modularity-js-draggable',
      hoverClass: 'modularity-state-droppable',
      drop: function (e, ui) {
        this.appendModule(e, ui);
      }.bind(this)
    }).bind(this);
  };
  /**
   * Appends a module to the target when dropped
   *
   * @param  {Object} e  Event
   * @param  {Object} ui UI
   * @return {void}
   */


  DragAndDrop.prototype.appendModule = function (e, ui) {
    var module = ui.draggable;
    var moduleName = module.find('.modularity-module-name').text();
    var moduleId = module.data('module-id');
    var incompability = module.attr('data-sidebar-incompability');
    Modularity.Editor.Module.addModule(e.target, moduleId, moduleName, undefined, undefined, undefined, undefined, undefined, incompability);
  };

  return new DragAndDrop();
}(jQuery);

exports.default = _default;
},{}],"jhPw":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* eslint-disable camelcase */

/* eslint-disable no-undef */

/* eslint-disable no-implicit-globals */
var _default = function ($) {
  function Autosave() {
    $(function () {// this.handleEvents();
    });
  }

  Autosave.prototype.save = function (selector) {
    $('#modularity-options #publishing-action .spinner').css('visibility', 'visible');
    var request = $(selector).serializeObject();
    request.id = modularity_post_id;
    request.action = 'save_modules';
    $.post(ajaxurl, request, function () {
      $('#modularity-options #publishing-action .spinner').css('visibility', 'hidden');
    });
  };

  return new Autosave();
}(jQuery);

exports.default = _default;
},{}],"KQZp":[function(require,module,exports) {
"use strict";

var _modal = _interopRequireDefault(require("./prompt/modal"));

var _widget = _interopRequireDefault(require("./helpers/widget"));

var _helpers = _interopRequireDefault(require("./helpers/helpers"));

var _validate = _interopRequireDefault(require("./editor/validate"));

var _thickbox = _interopRequireDefault(require("./editor/thickbox"));

var _module = _interopRequireDefault(require("./editor/module"));

var _dragAndDrop = _interopRequireDefault(require("./editor/dragAndDrop"));

var _autosave = _interopRequireDefault(require("./editor/autosave"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable sort-imports */

/* eslint-disable no-use-before-define */

/* eslint-disable no-var */

/* eslint-disable no-undef */
var Modularity = Modularity || {};
Modularity.Prompt = {
  Modal: _modal.default
};
Modularity.Helpers = _helpers.default;
Modularity.Helpers.Widget = _widget.default;
Modularity.Editor = {
  Validate: _validate.default,
  Thickbox: _thickbox.default,
  Module: _module.default,
  DragAndDrop: _dragAndDrop.default,
  Autosave: _autosave.default
};

(function ($) {
  $('input[type="checkbox"].sidebar-area-activator').on('click', function (e) {
    var isChecked = $(this).is(':checked');
    var value = $(this).attr('value');
    alert(1);

    if (e.shiftKey) {
      if (!isChecked) {
        $('input.sidebar-area-activator[type="checkbox"][value="' + value + '"]').attr('checked', false);
      } else {
        $('input.sidebar-area-activator[type="checkbox"][value="' + value + '"]').attr('checked', true);
      }
    }
  });
})(jQuery);

(function ($) {
  // Show spinner when clicking save on Modularity options page
  $('#modularity-options #publish').on('click', function () {
    $(this).siblings('.spinner').css('visibility', 'visible');
  }); // Remove the first menu item in the Modularity submenu (admin menu)

  $('a.wp-first-item[href="admin.php?page=modularity"]').parent('li').remove(); // Trigger autosave when switching tabs

  $('#modularity-tabs a').on('click', function () {
    if (wp.autosave) {
      $(window).unbind();
      wp.autosave.server.triggerSave();
      $(document).ajaxComplete(function () {
        return true;
      });
    }

    return true;
  });
})(jQuery);
/* Auto scrolling content */


jQuery(document).ready(function ($) {
  if ($('#modularity-mb-modules').length) {
    var offset = $('#modularity-mb-modules').offset();
    $(document).scroll(function () {
      if ($(window).scrollTop() + 50 > offset.top && !$('#modularity-mb-modules').hasClass('is-fixed')) {
        $('#modularity-mb-modules').addClass('is-fixed');
      } else if ($(window).scrollTop() + 50 < offset.top && $('#modularity-mb-modules').hasClass('is-fixed')) {
        $('#modularity-mb-modules').removeClass('is-fixed');
      }
    });
  }

  $('.modularity-edit-module a').on('click', function (e) {
    e.preventDefault();
    Modularity.Editor.Thickbox.postAction = 'edit-inline-not-saved';
    Modularity.Prompt.Modal.open($(e.target).closest('a').attr('href'));
  });
});
/* Post filters is visible in backend if posttype is set to post or page */

jQuery(document).ready(function ($) {
  $('.frontend-filter').hide();

  if ($('#modularity-latest-post-type select').val() === 'post' || $('#modularity-latest-post-type select').val() === 'page') {
    $('.frontend-filter').show();
  }

  $('body').on('change', '#modularity-latest-post-type select', function () {
    if ($('#modularity-latest-post-type select').val() === 'post' || $('#modularity-latest-post-type select').val() === 'page') {
      $('.frontend-filter').show();
    } else {
      $('.frontend-filter').hide();
    }
  }).trigger('change');
});
},{"./prompt/modal":"OMxo","./helpers/widget":"zveI","./helpers/helpers":"MqUa","./editor/validate":"wUyu","./editor/thickbox":"ETAS","./editor/module":"u8w0","./editor/dragAndDrop":"pSCb","./editor/autosave":"jhPw"}]},{},["KQZp"], null)
//# sourceMappingURL=/modularity.dev.js.map