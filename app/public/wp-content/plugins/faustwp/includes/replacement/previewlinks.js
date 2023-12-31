/**
 * XXX: Please remove this once this issue is resolved: https://github.com/WordPress/gutenberg/issues/13998
 */

window.addEventListener('DOMContentLoaded', function () {
  jQuery(document).ready(function () {
    // Get the correct preview link via wp_localize_script
    const previewLink = window._faustwp_preview_link
      ? window._faustwp_preview_link._preview_link
      : undefined;

    /**
     * Check to make sure there is a preview link before continuing, as there may not be a preview link
     * for every instance the block editor is enqueued (e.g. /wp-admin/widgets.php)
     */
    if (!previewLink) {
      return;
    }

    const intervalId = setInterval(function () {
      const previewButton = jQuery(
        'button[class~="block-editor-post-preview__button-toggle"]',
      );

      if (!previewButton.length) {
        return;
      }

      clearInterval(intervalId);
      previewButton.first().one('click', function () {
        setTimeout(function () {
          const links = jQuery('a[target*="wp-preview"]');

          if (!links.length) {
            return;
          }

          links.each((i, link) => {
            link.href = previewLink;

            var copy = link.cloneNode(true);
            copy.addEventListener('click', function () {
              previewButton[0].click();

              wp.data.dispatch('core/editor').autosave();
            });

            link.parentElement.insertBefore(copy, link);
            link.style.display = 'none';
          });
        }, 100);
      });
    }, 100);
  });
});
