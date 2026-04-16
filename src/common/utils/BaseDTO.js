import joi from "joi"

export default class BaseDTO {
    _schema = joi.object()

    constructor() { }

    async validate(body) {
        try {
            const values = this._schema.validateAsync(body, {
                stripUnknown: true
            })

            return { errors: null, values }
        } catch (error) {
            const errors = error.detail
                ? error.detail.map(d => d.message).joi("\n")
                : error.message

            return { values: null, errors }
        }
    }
}