import { z } from "zod";
import { ENDPOINT } from "@env";

const envSchema = z.object({
  ENDPOINT: z.string().url(),
});

const parsedEnv = envSchema.safeParse({ ENDPOINT });

if (!parsedEnv.success) {
  console.error(
    "Invalid environment variables",
    parsedEnv.error.flatten().fieldErrors,
  );
  throw new Error("Invalid environment variables");
}

export const env = parsedEnv.data;
