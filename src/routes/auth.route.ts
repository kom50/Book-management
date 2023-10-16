import Router, { NextFunction, Request, Response } from 'express'
import { signup, signin, signout } from '../controllers/auth.constrollers'
import { isAuth } from '../middlewares/auth.middleware'
import { Db, ObjectId } from 'mongodb'

export default Router()
    .use((req: Request, res: Response, next) => {
        next()
    })
    .get('/', isAuth, async (req: Request, res: Response, next: NextFunction) => {
        const db: Db = req.app.get('db')

        const userId = res.locals.userId
        if (!userId) {
            return res.status(200).json({ msg: 'User not logged in' })
        }

        const existingUser = await db.collection('users').findOne({ _id: new ObjectId(userId) })
        if (!existingUser) {
            return res.status(401).json({
                msg: 'User token has been tampered'
            })
        }

        // Also hanlde refresh token
        // res.cookie('token', token, { maxAge: 3600000, httpOnly: true })

        return res.status(200).json({
            user: existingUser
        })
    })
    .post('/signup', signup)
    .post('/signin', signin)
    .post('/signout', signout)
