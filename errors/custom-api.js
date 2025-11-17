class CustomApiError extends Error {
    constructor(message) {
        this.message = message
    }
}    


module.exports = CustomApiError