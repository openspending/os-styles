'use strict';

const assert = require('assert');
const OSStyles = require('../src');

describe('OSStyles', function() {
  describe('Themes', function() {
    it('Should return the default theme if called without params', function() {
      const osStyles = new OSStyles();
      const theme = osStyles.getTheme();
      assert.deepEqual(theme, osStyles._themes.default);
    });

    it('Should return the default theme if the theme asked does not exist', function() {
      const osStyles = new OSStyles();
      const theme = osStyles.getTheme('UNKNOWN_THEME');
      assert.deepEqual(theme, osStyles._themes.default);
    });

    it('Should return the requested theme', function() {
      const osStyles = new OSStyles();
      osStyles._themes.foobar = {
        foo: 'bar',
      };

      const theme = osStyles.getTheme('foobar');
      delete osStyles._themes.foobar;

      assert.equal(theme.foo, 'bar');
    });

    describe('Merging strategy', function() {
      it('Should merge the requested theme with both default customThemes and osStyles themes, and with the osStyles theme with the same name', function() {
        const customThemes = {
          default: {
            a: 1,
          },
          foobar: {
            b: 2,
          },
        };
        const osStyles = new OSStyles(customThemes);

        osStyles._themes.default.c = 3;
        osStyles._themes.foobar = {
          d: 4,
        };

        // Need to copy the OSStyles themes because we'll remove the attributes
        // we just added before asserting on them. We need to remove them before to avoid
        // leaving garbage data if the assertion fails.
        const osStylesThemes = {
          default: Object.assign({}, osStyles.getTheme()),
          foobar: Object.assign({}, osStyles._themes.foobar),
        };
        const theme = osStyles.getTheme('foobar');
        delete osStyles._themes.default.c;
        delete osStyles._themes.foobar;

        assert.deepEqual(theme, Object.assign(
          {},
          osStylesThemes.default,
          osStylesThemes.foobar,
          customThemes.default,
          customThemes.foobar
        ));
      });

      it('Should use osStyles.default if theme does not exist and there is no custom theme', function() {
        const expectedValue = ['bar'];
        const osStyles = new OSStyles();

        osStyles._themes.default.foo = expectedValue;
        const theme = osStyles.getTheme('foobar');
        delete osStyles._themes.default.foo;

        assert.deepEqual(theme.foo, expectedValue);
      });

      it('Should use osStyles[themeName] if it exists and no custom theme has the property', function() {
        const expectedValue = ['bar'];
        const osStyles = new OSStyles();

        osStyles._themes.default.foo = 'WRONG';
        osStyles._themes.foobar = {
          foo: expectedValue,
        };
        const theme = osStyles.getTheme('foobar');
        delete osStyles._themes.default.foo;
        delete osStyles._themes.foobar;

        assert.deepEqual(theme.foo, expectedValue);
      });

      it('Should use customThemes.default if it exists and the requested theme does not', function() {
        const expectedValue = ['bar'];
        const customThemes = {
          default: {
            foo: expectedValue,
          },
        };
        const osStyles = new OSStyles(customThemes);

        osStyles._themes.default.foo = 'WRONG';
        osStyles._themes.foobar = {
          foo: 'WRONG',
        };
        const theme = osStyles.getTheme('foobar');
        delete osStyles._themes.default.foo;
        delete osStyles._themes.foobar;

        assert.deepEqual(theme.foo, expectedValue);
      });

      it('Should use customThemes[themeName] if it exists', function() {
        const expectedValue = ['bar'];
        const customThemes = {
          default: {
            foo: 'WRONG',
          },
          foobar: {
            foo: expectedValue,
          },
        };
        const osStyles = new OSStyles(customThemes);

        osStyles._themes.default.foo = 'WRONG';
        osStyles._themes.foobar = {
          foo: 'WRONG',
        };
        const theme = osStyles.getTheme('foobar');
        delete osStyles._themes.default.foo;
        delete osStyles._themes.foobar;

        assert.deepEqual(theme.foo, expectedValue);
      });
    });
  });
});
