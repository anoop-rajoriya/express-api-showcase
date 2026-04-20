export default class ApiError extends Error {
    constructor(message, status) {
        super(message)
        this.status = status
        this.success = false
        this.operational = false
        Error.captureStackTrace(this, this.constructor)
    }

    static badRequest(message = "Invalid request formate") {
        return new ApiError(message, 400)
    }

    static unAuthorized(res, message = "Authentication is required") {
        return new ApiError(message, 401)
    }

    static forbidden(res, message = "Unauthorized access") {
        return new ApiError(message, 403)
    }

    static notFound(res, message = "Resources not found") {
        return new ApiError(message, 405)
    }

    static internalError(res, message = "Server internal error") {
        return new ApiError(message, 500)
    }
}