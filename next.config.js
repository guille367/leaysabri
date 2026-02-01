/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone', // For AWS Lambda/Docker deployment
    sassOptions: {
        silenceDeprecations: ['legacy-js-api'],
    },
}

module.exports = nextConfig
