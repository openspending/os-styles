'use strict';

var merge = require('lodash.merge');
var themes = {
  default: require('./themes/default'),
};

/**
 * @constructor
 * @param {object} [customThemes] - Object where each key represent one custom
 * theme.
 */
function OSStyles(customThemes) {
  return {
    _themes: themes,
    _customThemes: customThemes || {},

    /**
     * Returns the complete requested theme.
     *
     * To complete a theme, we merge it with a hierarchy of other themes. For
     * example, say we want the theme named "OKI". This function will merge, in
     * this order:
     *
     * 1. OSStyles' "default" theme
     * 2. OSStyles' "OKI" theme (if it exists)
     * 3. customThemes' default theme (if it exists)
     * 4. customThemes' "OKI" theme (if it exists)
     *
     * This allows a different base theme to be implemented in OSStyles itself,
     * and overloaded by each project that uses it.
     *
     * Also note that we return the default theme if the "OKI" theme couldn't be
     * found, or if this was called without a themeName.
     *
     * @param {string} [themeName=default]
     * @return {object} The theme
     */
    getTheme: function getTheme(themeName) {
      var themes = this._themes;
      var customThemes = this._customThemes;

      if (themeName !== undefined
          && !themes.hasOwnProperty(themeName)
          && !customThemes.hasOwnProperty(themeName)) {
        console.error('Unknown theme "' + themeName + '". Using default.');
        themeName = undefined;
      }

      return merge(
        {},
        themes.default,
        themes[themeName] || {},
        customThemes.default || {},
        customThemes[themeName] || {}
      );
    },
  };
};

module.exports = OSStyles;
