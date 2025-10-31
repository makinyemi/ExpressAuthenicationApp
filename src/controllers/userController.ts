import type { Request, Response } from 'express'
import { users, type User } from '../models/user.ts'
import bcrypt from 'bcrypt'
import { config } from '../config/config.ts'
import jwt from 'jsonwebtoken'
import { refreshTokens } from '../models/token.ts'

export const signup = async (req: Request, res: Response) => {
    const { username, email, password } = req.body

    // Validate username and password

    // Check if username already exist
    const found = users.find((user) => user.username === username)

    if (found) {
        return res.status(400).json({ message: 'Username already exists' })
    }

    // After validating input, generate a salt and hash the password and save user
    bcrypt.genSalt(Number(config.SALT_ROUNDS), (err, salt) => {
        if (err) {
            return res.status(500).json({ message: 'Internal Server Error' })
        }
        bcrypt.hash(password, salt, (err, encryptedPassword) => {
            if (err) {
                return res
                    .status(500)
                    .json({ message: 'Internal Server Error' })
            }
            const newUser: User = {
                username: username as string,
                email: email as string,
                password: encryptedPassword,
            }
            users.push(newUser)
            console.log(users)
        })
    })

    // Return 201 success account created
    return res.status(201).json({ message: 'User created!' })
}

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body

    // Check if the username actually exist
    const index = users.findIndex((user) => user.username === username)

    if (index === -1) {
        console.error(`Username does not exist: ${username}`)
        return res.status(404).json({ message: 'Username does not exist' })
    }
    const user = { ...users[index] }

    // Check if password matches database
    const match = await bcrypt.compare(password, user!.password!)

    if (!match) {
        console.error('Incorrect password')
        return res
            .status(404)
            .json({ message: 'Incorrect username/password combination' })
    }

    // Its a match, delete passowrd from user object and create access and refresh token

    delete user!.password

    const accessToken = jwt.sign(user!, config.ACCESS_SECRET_KEY!, {
        expiresIn: '1h',
        algorithm: 'HS256',
    })

    const refreshToken = jwt.sign(
        user!.username!,
        config.REFRESH_SECRET_KEY!,
        {
            algorithm: 'HS256',
        }
    )

    const now = new Date()

    // Store refreshToken in database
    refreshTokens.push({
        username: user!.username!,
        token: refreshToken,
        expiry: new Date(now.getTime() + Number(config.SEVEN_DAYS!)),
    })

    // Set refreshToken in cookies
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: config.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: Number(config.SEVEN_DAYS!),
    })

    return res.status(200).json({ accessToken })
}

export const refresh = (req: Request, res: Response) => {
    const { refreshToken: oldRefreshToken } = req.cookies

    // Validate users refresh token
    if (oldRefreshToken) {
        const payload = jwt.verify(oldRefreshToken, config.REFRESH_SECRET_KEY!)

        const foundUser = users.find((user) => user.username === payload)

        if (!foundUser) {
            return res.status(401).json({ message: 'Token not valid' })
        }

        // Check the expiry of user token against their stored token?? 
        const storedToken = refreshTokens.find((token) => token.username === foundUser.username)
        const now = new Date();

        if (storedToken?.expiry! < now) {
            // Token expired we should remove token and return error no valid token
            res.clearCookie("refreshToken");
            return res.status(401).json({"errorMessage": "Token expired"})
        }

        const user = { ...foundUser }

        delete user.password

        const accessToken = jwt.sign(user, config.ACCESS_SECRET_KEY!, {
            expiresIn: '1h',
            algorithm: 'HS256',
        })

        return res.status(200).json({ accessToken })
    }

    return res.status(401).json({ message: 'No token found' })
}

export const logout = (req: Request, res: Response) => {
    const { refreshToken } = req.cookies

    // If refreshToken exist clear and return success
    if (refreshToken) {
        console.log(refreshToken)
        res.clearCookie('refreshToken')
        return res.sendStatus(204)
    }

    return res.status(404).json({ message: 'Error attempting to log out ' })
}
