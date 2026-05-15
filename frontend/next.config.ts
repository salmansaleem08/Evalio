import { loadEnvConfig } from "@next/env";
import type { NextConfig } from "next";
import path from "path";

loadEnvConfig(path.resolve(process.cwd(), ".."));

const nextConfig: NextConfig = {};

export default nextConfig;
