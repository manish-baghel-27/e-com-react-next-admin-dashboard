/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        // BACKEND_URL:'https://everlywell-node-api.onrender.com'
        BACKEND_URL: 'http://localhost:8000'
    },
    reactStrictMode:false,
};

export default nextConfig;
