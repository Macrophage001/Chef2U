const tryCatch = (callback, onError = (err) => console.error(err)) => {
    return (...args) => {
        try {
            return callback(...args)
        } catch (e) {
            return onError(e)
        }
    }
}

module.exports = { tryCatch };