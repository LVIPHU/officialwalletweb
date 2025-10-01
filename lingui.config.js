/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
    locales: ['ar', 'en', 'es', 'fi', 'fr', 'pt', 'zh-hans', 'zh-hant', 'pseudo'],
    pseudoLocale: 'pseudo',
    sourceLocale: 'en',
    fallbackLocales: {
        default: 'en'
    },
    catalogs: [
        {
            path: 'src/i18n/locales/{locale}/messages',
            include: ['src/']
        }
    ]
}