import fs from 'fs';
import { Request, Response, NextFunction } from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { PUB_KEY_JSONWEBTOKEN } from '../keys/jwt.keys';
import User from '../models/user.model';

export const validateEmailExistence = async ( 
    req: Request, 
    res: Response, 
    next: NextFunction ) => { 

    try {
        
        const { email } = req.body;

        const user = await User.findOne({ email, available: true });

        if( user ) {
            return res.status(400).json({
                ok: false,
                msg: `A user already exist with this email.`
            });
        }   

        next();

    } catch (error) {
        res.sendStatus(500);
    }

}

export const validateEmailNotExistence = async ( 
    req: Request, 
    res: Response, 
    next: NextFunction ) => { 

    try {
        
        const { email } = req.body;

        const userDB = await User.findOne({ email });

        if( !userDB ) {
            return res.status(401).json({
                ok: false,
                message: 'Invalid email or password.',
            });    
        }
  

        next();

    } catch (error) {
        res.sendStatus(500);
    }

}

export const validateUserPassword = async ( 
    req: Request, 
    res: Response, 
    next: NextFunction ) => { 

    try {
        
        const { email, password } = req.body;

        const user : any = await User.findOne({ email, available: true });
        const validPassword = bcryptjs.compareSync( password, user.password );

        if( !user || !validPassword ) {
            return res.status(401).json({
                ok: false,
                msg: `Invalid email or password.`
            });
        }

        next();

    } catch (error) {
        res.sendStatus(500);
    }

}

export const encryptUserPassword = async ( 
    req: Request, 
    res: Response, 
    next: NextFunction ) => { 

    try {
        
        const { password } = req.body;
        const salt = bcryptjs.genSaltSync();

        req.body.password = bcryptjs.hashSync( password, salt );

        next();

    } catch (error) {
        res.sendStatus(500);
    }

}

export const validateJWT = async ( 
    req: any,
    res: Response, 
    next: NextFunction ) => { 
    try {
        
        const token = req.header('x-token');

        if(!token) {
            return res.status(401).json({
                ok: false,
                msg: 'Token not found.',
            });
        }

        const publicKey  = PUB_KEY_JSONWEBTOKEN;
        const { uid, name } : any = jwt.verify(
            token,
            publicKey
        );

        req.uid = uid;
        req.name = name;

        next();

    } catch (error) {
        res.sendStatus(500);
    }
}


