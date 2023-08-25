
import {Errors} from 'moleculer';
import {User} from "../model/user";

export default async ({params:{id}}) => {
    const user = await User.findById(id)

    if(!user){
        throw new Errors.MoleculerError("User not found", 404, "USER_NOT_FOUND")
    }

    return user
}