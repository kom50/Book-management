import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

/**
 * The function isAuth() is used to check if a user is authenticated.
 */
export function isAuth(req: Request, res: Response, next: NextFunction) {
    try {
        const { token: cookieToken } = req.cookies
        if (req.header('Authorization') !== undefined || cookieToken) {
            const token = req.header('Authorization')?.split(' ')[1] || ''
            const payload = jwt.decode(token || cookieToken, req.app.get('SECRET_KEY'))
            if (!payload) {
                return res.status(403).json({ data: 'Unauthorized' })
            }
            const { exp } = payload as any

            // if expire / modify
            if (Date.now() >= exp * 1000) {
                // console.log('expire')
                // const { _id, name, username } = payload as any
                // const token = jwt.sign({ _id, name, username }, req.app.get('SECRET_KEY'), {
                //     expiresIn: '2m',
                //     algorithm: 'HS256'
                // })
                // res.cookie('token', token, { maxAge: 3600000, httpOnly: true })
            }

            res.locals.userId = (payload as any)._id
            next()
        } else {
            res.status(401).json({ data: 'Unauthorized' })
        }
    } catch (err) {
        console.log(err)
        res.status(401).json({ data: 'Unauthorized' })
    }
}
