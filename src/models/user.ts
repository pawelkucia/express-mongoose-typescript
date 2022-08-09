//const mongoose = require('mongoose');
import { Schema, model, Model } from 'mongoose';

interface IUser {
    name: string;
    age: number;
    email: string;
}

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
        validate(value: String) {
            if (value === 'Dupa') {
                throw new Error('Forbidden name');
            }
        }
    },
    age: {
        type: Number,
        default: 18,
        min: 18
    },
    email: {
        type: String,
        unique: true, // nie zadziałało
        lowercase: true
    }
});

userSchema.pre('save', function (next: Function) {
    console.log('just before save');
    // this.name += ' add postfix';

    next();
})

const User: Model<IUser> = model<IUser>('User', userSchema)

const createUser = async (userData: Object): Promise<any> => {
    try {
        const user = new User(userData);
        await user.save();
        return user;
    } catch (error) {
        console.error(error);
        return { error: error };
    }
}

const findUser = async (query: Object): Promise<any> => {
    let users: Array<Object> = [];

    try {
        users = await User.find(query);
    } catch (error) {
        console.error(error);
    }

    return users;
}

module.exports = {
    createUser: createUser,
    findUser: findUser
};