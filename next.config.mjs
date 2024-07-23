// /** @type {import('next').NextConfig} */
// const nextConfig = {

// };

// export default nextConfig;
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/',
        destination: 'https://car-show-room-umber.vercel.app/',
      },
    ];
  },
};
