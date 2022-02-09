
import { Schema, model, Model } from 'mongoose';

import {
    IUser
} from '../interfaces/user.interface';

const UserSchema : Schema = new Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    online: {
        type: Boolean,
        default: false,
    },

    available: {
        type: Boolean,
        default: true,
    }

});

UserSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

const User : Model<IUser> = model<IUser>('User', UserSchema);

export default User;