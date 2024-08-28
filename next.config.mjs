/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["cdn.weatherapi.com"]

    },
    devIndicators: {
        autoPrerender: false,
    },
};
export default nextConfig;

// file name next.config.mjs
