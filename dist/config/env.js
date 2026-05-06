import { z } from "zod";
import "dotenv/config";
const envSchema = z.object({
    PORT: z.string().default("5000"),
    DATABASE_URL: z.string().min(1),
    JWT_SECRET: z.string().min(1),
    JWT_REFRESH_SECRET: z.string().min(1),
    SMTP_HOST: z.string().default("smtp.ethereal.email"),
    SMTP_PORT: z.string().default("587"),
    SMTP_USER: z.string().optional(),
    SMTP_PASS: z.string().optional(),
});
const _env = envSchema.safeParse(process.env);
if (!_env.success) {
    console.error("Invalid environment variables:", _env.error.format());
    process.exit(1);
}
export const env = _env.data;
//# sourceMappingURL=env.js.map