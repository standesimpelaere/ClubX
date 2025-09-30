import withPWA from 'next-pwa';

const isProd = process.env.NODE_ENV === 'production';

const withPWAConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: !isProd,
  sw: 'sw.js',
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts',
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 365 * 24 * 60 * 60 // 1 year
        }
      }
    },
    {
      urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts-static',
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 365 * 24 * 60 * 60 // 1 year
        }
      }
    }
  ]
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@sports-platform/ui', '@sports-platform/api'],
  experimental: {
    serverActions: { allowedOrigins: ['localhost'] }
  },
  reactStrictMode: true,
};

export default withPWAConfig(nextConfig);
