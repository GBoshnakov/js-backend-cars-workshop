const { Router } = require('express');
const { body, validationResult } = require('express-validator')
const { mapError } = require('../services/util');

const router = Router();

router.get('/register', registerGet);

router.post('/register',
    body('username').trim(),
    body('password').trim(),
    body('repeatPassword').trim(),
    body('username')
        .isLength({ min: 5 }).withMessage('Username must be more than 5 characters long')
        .isAlphanumeric().withMessage('Username may contain letters and digits only'),
    body('password')
        .isLength({ min: 8 }).withMessage('Password must be more than 8 characters long')
        .isAlphanumeric().withMessage('Password may contain letters and digits only'),
    body('repeatPassword')
        .custom((value, { req }) => value == req.body.password)
        .withMessage('Password don\'t match'), registerPost);

router.get('/login', loginGet);

router.post('/login',
    body('username').trim(), loginPost);

router.get('/logout', logout);


function registerGet(req, res) {
    res.render('register', { title: 'Register' });
}

async function registerPost(req, res) {
    const { errors } = validationResult(req);

    try {
        if (errors.length > 1) {
            throw errors;
        }
        await req.auth.register(req.body.username, req.body.password);
        res.redirect('/')
    } catch (error) {
        res.render('register', { title: 'Register', errors: mapError(error) });
    }


}

function loginGet(req, res) {
    res.render('login', { title: 'Login' });
}

async function loginPost(req, res) {

    try {
        if (await req.auth.login(req.body.username, req.body.password)) {
            res.redirect('/');
        } else {
            throw new Error('Incorrect username or password');
        }
    } catch (error) {
        res.render('login', { title: 'Login', errors: mapError(error) });
    }

}

function logout(req, res) {
    req.auth.logout();
    res.redirect('/')
}

module.exports = router;