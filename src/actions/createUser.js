
import bcrypt from "bcrypt";
import {User, Role} from "../model";
import {logger} from "../logger";

export default async (ctx) => {
    const {firstname, lastname, email, password, role} = ctx.params;

    const salt = await bcrypt.genSalt(15)
    const hash = await bcrypt.hash(password, salt)

    const existingUser = await User.findOne({email: email})

    if(existingUser){
        logger.info(`User ${email} already exists, try logging in`)
        return {"success":false, "message":"User already exists, try logging in"}
    }

    const roleModel = await Role.findOne({name:role})

    if(!roleModel){
        logger.info(`Role ${role} doesnt exists`)
        return {"success":false, "message":"Role not found"}
    }

    let user = new User({firstname, lastname, email, password:hash, role: roleModel})

    user = await user.save()

    console.log(user)

    ctx.emit("userCreated", user)

    return {
        success: true,
        data: {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            role: role.name,
            status: user.status
        }
    }
}