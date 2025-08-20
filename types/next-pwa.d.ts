declare module "next-pwa" {
  import type { NextConfig } from "next";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type PWAOptions = Record<string, any>;
  export default function withPWA(options?: PWAOptions): (config: NextConfig) => NextConfig;
}
