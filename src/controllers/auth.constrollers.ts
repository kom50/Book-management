import { Request, Response } from 'express'
import { Db } from 'mongodb'
import jwt from 'jsonwebtoken'

/**
 * The function isAuth() is used to check if a user is authenticated.
 */
export function isAuth() {

}

/**
 * The login function is used for user authentication.
 */
export async function signin(req: Request, res: Response) {
    const { username, password } = req.body as { username: string, password: string }

    console.log('🚀 ~ file: auth.constrollers.ts:16 ~ signin ~ user:', username, password)
    const db: Db = req.app.get('db')

    try {
        const foundUser = await db.collection('users').findOne({ username, password })
        console.log('🚀 ~ file: auth.constrollers.ts:20 ~ signin ~ user:', foundUser)

        if (!foundUser) {
            res.status(400).json({
                msg: 'invalid username and password'
            })
            return
        }

        const token = jwt.sign(foundUser, req.app.get('SECRET_KEY'), { algorithm: 'HS256' })
        console.log('🚀 ~ file: auth.constrollers.ts:31 ~ signin ~ token:', token)

        res.cookie('token', token, { maxAge: 3600000, httpOnly: true })

        res.status(201).json({
            login: 'done'
            // token
        })
    } catch (err) {
        res.status(500).json({
            err
        })
    }
}

/**
 * The function logout() is used to log out a user.
 */
export function signout(req: Request, res: Response) {

}

export function signup(req: Request, res: Response) {
    const user = req.body
    const db: Db = req.app.get('db')

    db.collection('users').insertOne(user).then(result => {
        console.log(result)

        res.status(201).json({
            done: true,
            ...result
        })
    }).catch(er => {
        console.error('Error:', er)
        res.status(500).json({
            err: er
        })
    })
}
