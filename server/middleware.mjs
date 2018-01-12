import validate from 'validate.js'
import v from "./validate";

v.setupValidationMessages(validate);


export const validatePost = function (validationConstraints) {
    return function (req, res, next) {
        let validationError = validate(req.body, validationConstraints);
        if (typeof validationError === "undefined") {
            next()
        } else {
            res.status(400).json(validationError)
        }
    }
}
