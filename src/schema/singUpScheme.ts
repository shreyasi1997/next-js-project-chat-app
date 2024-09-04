import { z } from "zod";
export const userValidationSchema = z
  .string() 
  .min(3, { message: "String must be at least 3 characters long" }) 
  .max(20, { message: "String must not be more than 20 characters long" }) 
  .regex(/^[a-zA-Z0-9_]+$/, { message: "String must contain only alphanumeric characters and underscores" }); 
export const SignupSchema = z.object({
  username: userValidationSchema, 
  email: z
    .string()
    .email({ message: "Invalid email address" }),
    password: z.string().min(3,{message: "password should be 3 charecter"})
    .max(10,{message:"password not greater than 10"})
});
