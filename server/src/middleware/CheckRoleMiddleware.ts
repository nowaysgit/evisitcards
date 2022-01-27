import ApiError from "../exeptions/ApiError";
import TokenService from "../services/TokenService";

const jwt = require('jsonwebtoken')

export default function(role) {
    return function (req, res, next) {
        try {
            const authorizationHeader = req.headers.authorization;
            console.log(authorizationHeader)
            if (!authorizationHeader) {
                return next(ApiError.Unauthorized());
            }
            const accessToken = authorizationHeader.split(' ')[1];
            console.log(accessToken)
            if (!accessToken) {
                return next(ApiError.Unauthorized());
            }
            const userData = TokenService.ValidateAccessToken(accessToken)
            userData.then(value => {
                if (!value) {
                    return next(ApiError.Unauthorized());
                }
                // @ts-ignore
                if (value.role !== role) {
                    return next(ApiError.NoneRules());
                }
            });

            // @ts-ignore
            req.user = userData;
            next();
        } catch (e) {
            return next(ApiError.Unauthorized());
        }
    }
}