import {Errors} from "moleculer"

import * as jose from 'jose'

import {authConfig} from "../config/auth.js";
import {User} from "../model/user";

export default async ({params:{token}}) => {

    const secret = new TextEncoder().encode(
        authConfig.secret,
    )

    let tokenInfo = null
    try{
        tokenInfo = await jose.jwtVerify(token, secret, {algorithms: ['HS256']})
        const user = await User.findOne({username: tokenInfo.payload.username})
        return {
            id: user.id,
            username: user.username
        }
    } catch (e) {
        throw new Errors.ValidationError("Invalid token", 400, "INVALID_TOKEN", { service: "auth-service" });
    }
}