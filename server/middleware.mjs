import validate from 'validate.js'
import v from "./validate";
import jwksRsa from "jwks-rsa";
import jwt from "express-jwt"

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
};


// Authentication middleware. When used, the
// access token must exist and be verified against
// the Auth0 JSON Web Key Set
export const driverschoolAuthentication = jwt({
    // Dynamically provide a signing key
    // based on the kid in the header and
    // the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://kso-driverschool.eu.auth0.com/.well-known/jwks.json`
    }),

    // Validate the audience and the issuer.
    audience: 'bfvNZ24qZ59pU9bc3hd0WScNrD6Hd1mE',
    issuer: `https://kso-driverschool.eu.auth0.com/`,
    algorithms: ['RS256']
});