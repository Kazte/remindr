/** @type {{experimental: {serverActions: {bodySizeLimit: string}}, env: {NEXTAUTH_SECRET: string}}} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  env: {
    NEXTAUTH_SECRET: '4440fb0b1ac25e85930203f7ab091ec8'
  }
};

module.exports = nextConfig;
