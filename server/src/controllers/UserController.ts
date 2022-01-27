import express from 'express';
import ApiError from "../exeptions/ApiError";
import uuid from 'uuid';
import path from 'path';
import models, {User, UserInfo, UserInfoInstance} from '../models/models';
import {UpdateOrCreate} from "../db";
import UserService from "../services/UserService";
import {validationResult} from "express-validator";

class UserController {

    async Registration(req, res, next) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()){
                return next(ApiError.BadRequest('Ошибка при валидации!', errors.array()));
            }
            const {email, password, password2} = req.body;

            const userData = await UserService.Registration(email, password, password2);
            // @ts-ignore
            res.cookie('refreshToken', userData.RefreshToken, {maxAge: 30 * 24 * 60 * 1000, httpOnly: true})
            return res.json(userData);

        } catch (e) {
            return next(e)
        }
    }

    async Login(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()){
                return next(ApiError.BadRequest('Ошибка при валидации!', errors.array()));
            }
            const {email, password} = req.body;

            const userData = await UserService.Login(email, password);
            res.cookie('refreshToken', userData.RefreshToken, {maxAge: 30 * 24 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (e) {
            return next(e)
        }
    }

    async Logout(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const {refreshToken} = req.cookies;
            const token = await UserService.Logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.status(200).json({message: 'Вы больше не авторизованны'});
        } catch (e) {
            return next(e)
        }
    }

    async Activate(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const activateLink = req.params.link;
            await UserService.Activate(activateLink);
            return res.redirect(process.env.CLIENT_URL)
        } catch (e) {
            return next(e)
        }

    }

    async Refresh(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const {refreshToken} = req.cookies;

            const userData = await UserService.Refresh(refreshToken);
            res.cookie('refreshToken', userData.RefreshToken, {maxAge: 30 * 24 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (e) {
            return next(e);
        }
    }

    async GetById(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const {id} = req.params
            if(isNaN(parseInt(id, 10))) {
                 return next(ApiError.BadRequest('Неверный id пользователя'));
            }
            const userInfo = await models.UserInfo.findOne(
                {
                    where: {userId: id},
                    include: [
                        {
                            as:"user_services",
                            model: models.UserService,
                            include: [
                                {
                                    as:"service",
                                    model: models.Service,
                                }
                            ]
                        }
                    ]
                }
            )
            if(!userInfo){
                return next(ApiError.BadRequest('Пользователя не существует'));
            }
            return res.json(userInfo);
        } catch (e) {
            return next(e);
        }
    }

    async GetByLink(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const {link} = req.params;
            const userInfo = await models.UserInfo.findOne(
                {
                    where: {profileLink: link},
                    include: [
                        {
                            as:"user_services",
                            model: models.UserService,
                            include: [
                                {
                                    as:"service",
                                    model: models.Service,
                                }
                            ]
                        }
                    ]
                }
            )
            if(!userInfo){
                return next(ApiError.BadRequest('Пользователя не существует'));
            }
            return res.json(userInfo);
        } catch (e) {
            return next(e);
        }
    }

    async GetAuthProfile(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            // @ts-ignore
            console.log("user " + req.user);
            // @ts-ignore
            if (!req.user || typeof req.user === 'undefined' || req.user === null) {
                return next(ApiError.Unauthorized());
            }
            // @ts-ignore
            const id = req.user.id;
            console.log("id " + id);
            if(isNaN(parseInt(id, 10))) {
                 return next(ApiError.BadRequest('Неверный id пользователя'));
            }
            const userInfo = await models.UserInfo.findOne(
                {
                    where: {userId: id},
                    include: [
                        {
                            as:"user_services",
                            model: models.UserService,
                            include: [
                                {
                                    as:"service",
                                    model: models.Service,
                                }
                            ]
                        }
                    ]
                }
            )
            if(!userInfo){
                return next(ApiError.BadRequest('Пользователя не существует'));
            }
            return res.json(userInfo);
        } catch (e) {
            return next(e);
        }
    }

    async Update(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const {id, profileLink, name, description, emoji, user_services} = req.body.user;
            console.log(req.body);
            // @ts-ignore
            if(req.files)
            {
                // @ts-ignore
                const {img} = req.files;
                const fileName: string = uuid.v4() + '.jpg';
                img.mv(path.resolve(__dirname, '..', 'static', 'user_image', fileName));
            }

            let updatedUserInfo = await UserInfo.update(
                {
                    name: name,
                    description: description,
                    emoji: emoji,
                    profileLink: profileLink,
                    image: req.body.image
                },
                {returning: true, where: {userId: id}})

            console.log(user_services);
            if (user_services) {
                await user_services.forEach(service =>
                    // @ts-ignore
                    UpdateOrCreate(models.UserService, {id: service.id, userInfoId: id},
                        {
                            url: service.url,
                            type: service.type,
                            serviceId: service.serviceId,
                            userInfoId: id
                    })
                )
            }
            res.json();
        }
        catch (e) {
             return next(e);
        }
    }
}

export default new UserController();