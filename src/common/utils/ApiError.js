export default class ApiError extends Error {
    constructor(message) {
        super(message)
        this.success = false
        this.operational = false
        Error.captureStackTrace(this, this.constructor)
    }

    static badRequest(res, message = "invalid request formate") {
        res.status(400).json(new ApiError(message))
    }

    static unAuthorized(res, message = "authentication is required") {
        res.status(401).json(new ApiError(message))
    }

    static forbidden(res, message = "unauthorized access") {
        res.status(403).json(new ApiError(message))
    }

    static notFound(res, message = "resources not found") {
        res.status(405).json(new ApiError(message))
    }
}