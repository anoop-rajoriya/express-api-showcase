import joi from "joi";
import BaseDTO from "../../common/utils/BaseDTO"

export class RegisterDTO extends BaseDTO {
    _schema = joi.object({
        firstName: joi.string().min(3).max(30).required(),
        lastName: joi.string().min(3).max(30).default(undefined),
        email: joi.string().email().required(),
        password: joi.string().min(4).max(22).required()
    })
}

export class LoginDTO extends BaseDTO {
    _schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(4).max(22).required()
    })
}

export class EmailVerifyDTO extends BaseDTO {
    _schema = joi.object({
        userId: joi.string().required(),
        code: joi.string().min(6).max(12).required()
    })
}

export class RefreshTokenDTO extends BaseDTO {
    _schema = joi.object({
        refreshToken: joi.string().required()
    })
}