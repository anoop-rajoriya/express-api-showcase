export default class ApiResposne {
    constructor() { }

    static ok(res, message = "Request successful", data = null) {
        res.status(200).json({ message, data })
    }

    static created(res, message = "New resources created", data = null) {
        res.status(201).json({ message, data })
    }

    static noContent(res) {
        res.status(204).send()
    }
}