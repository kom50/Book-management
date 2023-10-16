import { Request, Response } from 'express'
import { Db } from 'mongodb'
import jwt from 'jsonwebtoken'

/**
 * The login function is used for user authentication.
 */
export async function signin(req: Request, res: Response) {
    const { username, password } = req.body as { username: string, password: string }
    const db: Db = req.app.get('db')
    const errorMsg = 'Invalid email and/or password'

    try {
        const existingUser = await db.collection('users').findOne({ username, password })
        if (!existingUser) {
            return res.status(401).json({
                msg: errorMsg
            })
        }

        const token = jwt.sign(existingUser, req.app.get('SECRET_KEY'), {
            expiresIn: '2m',
            algorithm: 'HS256'
        })
        res.cookie('token', token, { maxAge: 3600000, httpOnly: true })

        res.status(201).json({
            existingUser,
            token
        })
    } catch (err) {
        console.log(err)
        res.status(401).json({
            err,
            smg: 'Unable to login user'
        })
    }
}

/**
 * The function logout() is used to log out a user.
 */
export function signout(req: Request, res: Response) {

}

export async function signup(req: Request, res: Response) {
    const user = req.body
    const db: Db = req.app.get('db')

    const existingUser = await db.collection('users').findOne({ email: user.email })
    if (existingUser) {
        return res.status(409).json({
            msg: 'Email is already taken'
        })
    }

    db.collection('users').insertOne(user).then(user => {
        console.log('user', user)

        res.status(200).json({
            ...user
        })
    }).catch(er => {
        console.error('Error:', er)
        res.status(500).json({
            msg: 'Unable to register user: ' + er,
            err: er
        })
    })
}
