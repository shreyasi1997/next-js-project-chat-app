import {z} from "zod"
export const MessageSchema = z.object({
    contents: z.string()
    .min(6,{message:"must be greater than 6 charecter"})
    .max(500,{message:"must be greater than 500 charecter"})
})