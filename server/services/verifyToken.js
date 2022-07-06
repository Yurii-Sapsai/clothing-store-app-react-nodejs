import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {

    const token = req.headers.token;

    if (token) {
        try {
            jwt.verify(token, process.env.JWT_SEC, (err, user) => {
                if (err) {
                    res.status(403).json({
                        message: 'Token is not valid'
                    })
                }
                req.user = user;
            });
            next();

        } catch (error) {
            return res.status(403).json({
                message: 'Token is not valid'
            })
        }
    } else {
        return res.status(403).json({
            message: 'No access'
        })
    }

}

export const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            res.status(403).json('You are not alowed to do that!')
        }
    })
}

export const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next()
        } else {
            res.status(403).json('You are not alowed to do that!')
        }
    })
}