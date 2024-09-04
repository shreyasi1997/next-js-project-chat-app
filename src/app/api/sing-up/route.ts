import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
    try {
        await dbConnect();

        const { userName, email, password } = await request.json();

        // Check if a verified user exists with the same username
        const existingUserVerifiedByUsername = await UserModel.findOne({
            userName,
            isVerified: true,
        });

        if (existingUserVerifiedByUsername) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Username is already taken and verified.",
                }),
                {
                    status: 400,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        }

        // Check if a user exists with the same email
        const existingUserVerifiedByEmail = await UserModel.findOne({ email });

        if (existingUserVerifiedByEmail) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Email is already taken.",
                }),
                {
                    status: 400,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate verification code and expiration date
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 1);

        // Create a new user
        const newUser = new UserModel({
            userName,
            email,
            password: hashedPassword,
            verifiedCode: verificationCode,
            verificationCodeExp: expirationDate,
            isVerified: false,
            isVerificationCodeActive: true,
            messages: [],
        });

        // Save the new user to the database
        await newUser.save();

        // Send verification email
        const emailResponse = await sendVerificationEmail(userName, email, verificationCode, password);

        if (!emailResponse) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Failed to send verification email.",
                }),
                {
                    status: 500,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        }

        return new Response(
            JSON.stringify({
                success: true,
                message: "User registered successfully. Please check your email for the verification code.",
            }),
            {
                status: 201,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

    } catch (error) {
        console.error("Error registering user:", error);
        return new Response(
            JSON.stringify({
                success: false,
                message: "An error occurred during registration.",
            }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }
}
