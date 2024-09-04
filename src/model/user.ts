import mongoose, { Schema, Document } from "mongoose";

// Message Interface and Schema
export interface Message extends Document {
    contents: string;
    createContent: Date;
}

const MessageSchema: Schema<Message> = new Schema({
    contents: {
        type: String,
        required: true
    },
    createContent: {
        type: Date,
        required: true
    }
});

// User Interface and Schema
export interface User extends Document {
    userName: string;
    email: string;
    password: string;
    verificationCode: string;
    verificationCodeExp: Date;
    isVerified: boolean
    isVerificationCodeActive: boolean;
    message: Message[];
}

const UserSchema: Schema<User> = new Schema({
    userName: {
        type: String,
        required: [true, "User Name is required"],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'] // Email validation regex
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true,
        unique: true,
        match: [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character'
        ] // Password validation regex
    },
    verificationCode: {
        type: String,
        required: [true, "Verification code is required"],
        trim: true,
        unique: true
    },
    verificationCodeExp: {
        type: Date,
        required: true
    },
    isVerificationCodeActive: {
        type: Boolean,
        required: true
    },
    isVerified:{
        type: Boolean,
        required: true
    },
    message: [MessageSchema] 
});
const UserModel= (mongoose.models.User as mongoose.Model<User>)||(mongoose.model<User>("User",UserSchema))

export default UserModel;
