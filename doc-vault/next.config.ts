import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  env: {
    AWS_COGNITO_REGION: process.env.AWS_COGNITO_REGION as string,
    AWS_COGNITO_POOL_ID: process.env.AWS_COGNITO_POOL_ID as string,
    AWS_COGNITO_APP_CLIENT_ID: process.env.AWS_COGNITO_APP_CLIENT_ID as string,
  },
};


export default nextConfig;
