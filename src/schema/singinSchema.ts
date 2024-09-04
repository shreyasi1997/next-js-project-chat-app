import {z} from "zod"
export const SingUpSchema = z.object({
    identfy: z.string(),
    password: z.string()
})