import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  // Services moved from its own page into a home page section.
  async redirects() {
    return [{ source: '/services', destination: '/#services', permanent: true }];
  },
};

export default nextConfig;
