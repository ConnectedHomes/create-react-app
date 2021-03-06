'use strict';

const fs = require('fs');
const path = require('path');
const paths = require('./paths');

const DEFAULT_LOCALE = 'en-gb';
const LOCALE_DIR = paths.appIntl;

const ignoreFiles = ['base', 'README'];

// By looking at our `i18n` we can get an idea of which languages and locales we need to be
// concerned with. As we add translations for different languages we'll automatically have
// the right data to help with whitelisting those languages/locales in npm modules.

if (!LOCALE_DIR) {
  module.exports = {
    locales: [],
    languages: [],
  };

  return;
}

const locales = [
  DEFAULT_LOCALE,
  ...fs
    .readdirSync(LOCALE_DIR)
    .map(f => path.basename(f, path.extname(f))) // fr-ca.json -> fr-ca
    .filter(locale => !ignoreFiles.includes(locale)),
];

module.exports = {
  locales,
  languages: locales.map(l => l.replace(/(-.*)$/, '')), // en-gb -> en
};
