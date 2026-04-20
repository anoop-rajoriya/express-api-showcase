import ApiError from "../../common/utils/ApiError"
import {accessToken} from '../../common/utils/token.utils.js'
import {User} from "./model.js"

export const authenticateUser = ()=>{
    return async (req, res, next)=>{
        const authorization = req.get("Authorization")

        if(!authorization || !authorization.startsWith("Bearer")){
            throw ApiError.unAuthorized("Authentication required")
        }

        const decoded = accessToken.verify(authorization.split(" ")[1])

        const user = await User.findById(decoded.userId)
        
        if(!user){
            throw ApiError.notFound("User not found")
        }

        req.user = user
        next()
    }
}

export const authorizeUser = (roles)=>{
    return async (req, res, next)=>{
        if(!roles.includes(req.user.role)){
            throw ApiError.forbidden("Resources access denied")
        }

        next()
    }
}