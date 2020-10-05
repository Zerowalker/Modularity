/* eslint-disable no-use-before-define */
/* eslint-disable no-var */
/* eslint-disable no-undef */
var Modularity: any = Modularity || {};

(function ($) {
  $('input[type="checkbox"].sidebar-area-activator').on('click', function (e) {
    const isChecked = $(this).is(':checked');
    const value = $(this).attr('value');

    if (e.shiftKey) {
      if (!isChecked) {
        $(
          `input.sidebar-area-activator[type="checkbox"][value="${value}"]`
        ).attr('checked', false);
      } else {
        $(
          `input.sidebar-area-activator[type="checkbox"][value="${value}"]`
        ).attr('checked', true);
      }
    }
  });
})(jQuery);

(function ($) {
  // Show spinner when clicking save on Modularity options page
  $('#modularity-options #publish').on('click', function () {
    $(this).siblings('.spinner').css('visibility', 'visible');
  });

  // Remove the first menu item in the Modularity submenu (admin menu)
  $('a.wp-first-item[href="admin.php?page=modularity"]').parent('li').remove();

  // Trigger autosave when switching tabs
  $('#modularity-tabs a').on('click', function () {
    if (wp.autosave) {
      $(window).unbind();

      wp.autosave.server.triggerSave();

      $(document).ajaxComplete(() => true);
    }

    return true;
  });
})(jQuery);

/* Auto scrolling content */
jQuery(function ($) {
  if ($('#modularity-mb-modules').length) {
    const offset = $('#modularity-mb-modules').offset();
    $(document).scroll(function () {
      if (
        $(window).scrollTop() + 50 > offset.top &&
        !$('#modularity-mb-modules').hasClass('is-fixed')
      ) {
        $('#modularity-mb-modules').addClass('is-fixed');
      } else if (
        $(window).scrollTop() + 50 < offset.top &&
        $('#modularity-mb-modules').hasClass('is-fixed')
      ) {
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

  if (
    $('#modularity-latest-post-type select').val() === 'post' ||
    $('#modularity-latest-post-type select').val() === 'page'
  ) {
    $('.frontend-filter').show();
  }
  $('body')
    .on('change', '#modularity-latest-post-type select', function () {
      if (
        $('#modularity-latest-post-type select').val() === 'post' ||
        $('#modularity-latest-post-type select').val() === 'page'
      ) {
        $('.frontend-filter').show();
      } else {
        $('.frontend-filter').hide();
      }
    })
    .trigger('change');
});