/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    output: 'export', // Enable static export 
    reactStrictMode: false,
    images: { unoptimized: true } ,
    eslint: {
        ignoreDuringBuilds: true,
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/auth/login',
                permanent: true,
            },
        ]
    },
}


