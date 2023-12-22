import { ENDPOINT, ENV } from "@env";
import { z } from "zod";

const envSchema = z.object({
  ENDPOINT: z.string().url(),
  ENV: z.enum(["development", "production", "test"]),
});

const parsedEnv = envSchema.safeParse({ ENDPOINT, ENV });

if (!parsedEnv.success) {
  throw new Error("Invalid environment variables", {
    cause: parsedEnv.error.flatten().fieldErrors,
  });
}

export const env = parsedEnv.data;
