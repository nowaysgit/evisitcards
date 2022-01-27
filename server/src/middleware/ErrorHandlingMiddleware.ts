import ApiError from '../exeptions/ApiError';
import express from 'express';

function ErrorMiddleware(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    console.log("ErrorMiddleware")
    console.log(err)
    if(err instanceof ApiError) {
        return res.status(err.status).json({message: err.message, errors: err.errors})
    }
    return res.status(500).json({message: "Неизвестная ошибка, Сообщите администратору!", errors: err})
}

export default ErrorMiddleware