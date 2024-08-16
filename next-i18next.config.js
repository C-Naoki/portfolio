/** @type {import('next-i18next').UserConfig} */

const path = require('path')

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ja']
  },
  localePath: path.resolve('./public/locales'),
  fallbackLng: {
    default: ['en'],
    en: ['ja']
  }
}
