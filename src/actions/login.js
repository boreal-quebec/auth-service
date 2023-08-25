import * as jose from 'jose'

import {authConfig} from "../config/auth.js";
import bcrypt from "bcrypt";
import {logger} from "../logger";
import {User} from "../model/user";

export default async ({params:{email, password, role}}) => {

    const user = await User.findOne({email})

    if(!user){
        logger.info("Login failed: User not found")
        return {
            "status": "Login failed"
        }
    }

    const isValid = await bcrypt
        .compare(password, user.password)
        .catch(err => console.error(err.message))

    if(isValid){
        const secret = new TextEncoder().encode(
            authConfig.secret,
        )

        const alg = 'HS256'

        //const role = await user.getRole();
        const jwt = await new jose.SignJWT({id: user.id, firstname: user.firstname, lastname: user.lastname, email: user.email, role: user.role.name})
            .setProtectedHeader({ alg })
            .setIssuedAt()
            .setIssuer('auth.service')
            .setAudience('game')
            .setExpirationTime('2h')
            .sign(secret)

        return {
            success: true,
            data: {
                user: {
                    id: user.id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    role: user.role.name
                },
                token: jwt
            }
        }
    }

    logger.info("Login failed: Invalid password")

    return {
        "status": "Login failed"
    }
}