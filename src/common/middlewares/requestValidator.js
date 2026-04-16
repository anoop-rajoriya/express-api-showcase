import ApiError from "../utils/ApiError.js"

export default function requestValidator(DTOClass) {
    return async (req, res, next) => {
        const { errors, values } = await DTOClass.validate(req.body)

        if (values === null) {
            ApiError.badRequest(res, errors)
        }

        req.body = values

        next()
    }
}