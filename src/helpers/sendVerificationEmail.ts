import { resend } from "@/lib/resend";
import VerificationEmail from "../../email/VerificationEmail";
import { ApiResponse } from "@/types/apiResponse";

export async function sendVerificationEmail(
    userName: string,
    email: string,
    password: string,
    verificationCode: string
): Promise<ApiResponse>{
    try{
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Mystry messages| Verification Code',
            react: VerificationEmail({ username:userName, otp:verificationCode}),
          });
        return{success:true ,message:"verification send successfully"}
    }
    catch(emailerror){
       console.error("Error sending verification Error",emailerror);
       return{success:false ,message:"failed to send verification error"} 
    }
}