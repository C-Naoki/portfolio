/** @type {import('next-i18next').UserConfig} */

const path = require('path')

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ja']
  },
  fallbackLng: {
    default: ['en'],
    en: ['ja']
  },
  localePath: path.resolve('./public/locales'),
  keySeparator: '.',
  reloadOnPrerender: true
}
