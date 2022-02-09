
import { Router } from 'express';
import { check } from 'express-validator';

import { validateFields } from '../middlewares/fields-validator.middleware';

import {
    signup,
    signin,
    revalidate,
} from '../controllers/auth.controller';

import { 
    validateUserPassword,
    encryptUserPassword,
    validateEmailExistence,
    validateEmailNotExistence,
    validateJWT,
} from '../middlewares/auth.middleware';

const router = Router();

router.post('/signup', [
    check('name', `The name is required.`).isString().not().isEmpty(),
    check('email', `The email is required.`).isEmail(),
    validateEmailExistence,
    check('password', `The password is required.`).not().isEmpty(),
    encryptUserPassword,
    validateFields
], signup);

router.post('/', [
    check('email', `The email is required.`).isEmail(),
    validateEmailNotExistence,
    check('password', `The password is required.`).not().isEmpty(),
    validateUserPassword,
    validateFields
], signin);

router.get('/revalidate', [
    validateJWT,
], revalidate);

export default router;
