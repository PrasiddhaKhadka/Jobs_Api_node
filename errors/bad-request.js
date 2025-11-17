const CustomApiError = require("./custom-api")

class BadRequest extends CustomApiError {
    constructor(message) {
        super(message)
        this.statusCode = 400
    }
}

module.exports = BadRequest