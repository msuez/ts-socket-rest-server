import { Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    online?: boolean;
    available?: boolean;
}