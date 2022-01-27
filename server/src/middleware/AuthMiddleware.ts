import ApiError from '../exeptions/ApiError';
import express from 'express';
import TokenService from "../services/TokenService";
import jwt from "jsonwebtoken";
import UserDto from "../dtos/UserDto";

async function AuthMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
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
        await userData.then(value => {
            if (!value) {
                return next(ApiError.Unauthorized());
            }
            // @ts-ignore
            req.user = {email: value.email, id: value.id, isActivated: null, role: value.role};
        });

        next();
    } catch (e) {
        return next(ApiError.Unauthorized());
    }
}

export default AuthMiddleware