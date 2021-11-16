/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  env: {
    FORTMATIC_API_KEY: process.env.FORTMATIC_API_KEY,
    MAGIC_API_KEY: process.env.MAGIC_API_KEY,
    PORTIS_DAPP_ID: process.env.PORTIS_DAPP_ID,
    RPC_URL_1: process.env.RPC_URL_1,
    RPC_URL_3: process.env.RPC_URL_3,
    RPC_URL_4: process.env.RPC_URL_4,
  },
};
