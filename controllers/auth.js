module.exports = {
    registerGet(req, res) {
        res.render('register', {title: 'Register'});
    },
    async registerPost(req, res) {

        if (req.body.username == '' || req.body.password == '') {
            res.redirect('/register');
        }
        if (req.body.password != req.body.repeatPassword) {
            res.redirect('/register');
        }
        try {
            await req.auth.register(req.body.username, req.body.password);
            res.redirect('/')
        } catch (error) {
            console.error(error.message);
            res.redirect('/register');
        }

    },
    loginGet(req, res) {
        res.render('login', {title: 'Login'});
    },
    async loginPost(req, res) {

        try {
            if (await req.auth.login(req.body.username, req.body.password)) {
                res.redirect('/');
            } else {
                throw new Error('Incorrect username or password');
            }
        } catch (error) {
            console.log(error.message);
            res.redirect('/login');
        }
        
    },
    logout(req, res) {
        req.auth.logout();
        res.redirect('/')
    }
}