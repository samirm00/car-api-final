import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

import validateEmail from '../utils/validateEmail.js';
import validatePassword from '../utils/validatePassword.js';
import matchPasswords from '../utils/matchPasswords.js';
import hashPassword from '../utils/hashPassword.js';

const userControllers = {
    getRegister: (req, res) => {
        res.status(200).render('form', {
            action: '/register',
            text: 'Register',
            token: req.cookies.token
        });
    },
    getLogin: (req, res) => {
        res.status(200).render('form', {
            action: '/login',
            text: 'Login',
            token: req.cookies.token
        });
    },
    postRegister: (req, res) => {
        const { email, password, rePassword } = req.body;

        // check if email exist
        const emailExist = User.getUserByIdEmail(email);
        if (!emailExist) {
            const isValidEmail = validateEmail(email);
            const isValidPassword = validatePassword(password);
            const isMatch = matchPasswords(password, rePassword);

            if (isValidEmail && isValidPassword && isMatch) {
                const passwordHashed = hashPassword(password);
                console.log(passwordHashed);
                const newUser = new User(email, passwordHashed);
                newUser.addUser();
                res.status(302).redirect('/login');
            } else {
                res.status(400).render('message', {
                    title: 'Check your info',
                    message:
                        'please make sure your email and password are correct'
                });
            }
        } else {
            res.status(400).render('message', {
                title: 'Email already exists',
                message: 'This email already exists, please log in'
            });
        }
    },
    postLogin: (req, res) => {
        const { email, password } = req.body;
        // check if email exist
        const emailExist = User.getUserByIdEmail(email);
        if (emailExist) {
            bcrypt.compare(password, emailExist.password, (err, isValid) => {
                if (isValid) {
                    const token = jwt.sign(
                        { user: emailExist },
                        process.env.TOKEN_ACCESS_SECRET
                    );

                    res.cookie('id', emailExist.id, { httpOnly: true });
                    res.cookie('token', token, { httpOnly: true });
                    res.status(302).redirect('/');
                } else {
                    res.status(400).render('message', {
                        title: 'Not Valid account',
                        message: 'Email or password is not correct'
                    });
                }
            });
        } else {
            res.status(400).render('message', {
                title: 'Not Valid account',
                message: 'Email or password is not correct'
            });
        }
    },
    getLogout: (req, res) => {
        res.clearCookie('token');
        res.clearCookie('id');
        res.status(200).redirect('/');
    }
};

export default userControllers;
