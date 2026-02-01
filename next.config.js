/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: false,
    sassOptions: {
        silenceDeprecations: ['legacy-js-api'],
    },
}

module.exports = nextConfig
