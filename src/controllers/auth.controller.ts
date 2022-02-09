import { Request, Response } from 'express';

import User from '../models/user.model';
import { generateJWT } from '../helpers/jwt.helper';

export const signup = async( req: Request, res: Response) => {
    try {
        
        const user = new User( req.body );
        await user.save();

        const newToken = await generateJWT( user.id );

        return res.status(201).json({
            ok: true,
            message: 'User created.',
            token: newToken,
        });

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export const signin = async( req: Request, res: Response) => {
    try {

        const { email } = req.body;

        const userDB : any = await User.findOne({ email, available: true });
        const newToken = await generateJWT( userDB.id );

        return res.status(201).json({
            ok: true,
            message: 'User authenticated.',
            token: newToken,
        });


    } catch (error) {
        return res.sendStatus(500);
    }
}

export const revalidate = async( req: Request | any, res: Response) => {
    try {
        
        const uid: string = req.uid;

        const token = await generateJWT( uid );
        const user = await User.findById( uid );

        return res.status(201).json({
            ok: true,
            message: 'User revalidated.',
            token,
            user,
        });

    } catch (error) {
        return res.sendStatus(500);
    }
}