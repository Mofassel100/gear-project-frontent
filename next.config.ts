/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  //   async rewrites(){
  // return [
  //   {
  //     source: "/api/auth/:path*",
  //     destination: process.env.NEXT_PUBLIC_BACKEND_API_URL * "/api/auth/:path*",
  //   },
  //   {
  //     source: "/api/:path*",
  //     destination: process.env.NEXT_PUBLIC_BACKEND_API_URL * "/api/:path*",
  //   },
  // ];
  //   },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
