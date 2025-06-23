import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const envConfig = createEnv({
  client: {
    NEXT_PUBLIC_SERVER_URL: z.string().min(1),
    NEXT_PUBLIC_JWT_EXPIRED_IN: z.string().min(1).default("24h"),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    NEXT_PUBLIC_JWT_EXPIRED_IN: process.env.NEXT_PUBLIC_JWT_EXPIRED_IN,
  },
});

export { envConfig };
