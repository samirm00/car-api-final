import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, process.env.TOKEN_ACCESS_SECRET, (err, data) => {
            if (err) {
                res.status(403).render('message', {
                    title: 'Forbidden',
                    message: 'Please login'
                });
            }
            req.body.user = data;
            next();
        });
    } else {
        res.status(302).redirect('/login');
    }
};

export default verifyToken;
