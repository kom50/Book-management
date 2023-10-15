import Router, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { signup, signin, signout } from '../controllers/auth.constrollers'

export default Router()
    .use((req: Request, res: Response, next) => {
        console.log(req.app.locals)
        next()
    })
    .get('/', (req: Request, res: Response) => {
        try {
            const { token } = req.cookies
            const decoded = jwt.verify(token, req.app.get('SECRET_KEY'))

            if (!decoded) {
                return res.status(401).send({ msg: 'You are not logged in', isAuth: false })
            }

            // Also hanlde refresh token

            // res.cookie('token', token, { maxAge: 3600000, httpOnly: true })
            return res.status(200).send({ isAuth: true, msg: '' })
        } catch (err: any) {
            res.status(401).send({ msg: err.message })
        }
    })
    .post('/signup', signup)
    .post('/signin', signin)
    .post('/signout', signout)
