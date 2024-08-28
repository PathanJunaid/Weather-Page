/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'cdn.weatherapi.com',
            // Optional: specify a path pattern if needed
            // pathname: '**',
          },
        ],
      },
    devIndicators: {
        autoPrerender: false,
    },
};
export default nextConfig;

// file name next.config.mjs
