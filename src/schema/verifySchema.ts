import {z} from "zod"
export const VerifySchema = z.object({
    code: z.string()
    .length(6,{message:"not greater that or less than 6 digit"})
})