import express from 'express';
import models, {UserService} from '../models/models';

class UserAppController {

    static async Create(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const {app} = req.body
            const serv = await UserService.create({
                userInfoId: req.user.id,
                url: app.url,
                serviceId: app.service.id
            })
            const userApp = await models.UserService.findOne({
                where: {id: serv.id},
                include: [
                    {
                        as:"service",
                        model: models.Service,
                    }
                ]})
            return res.status(200).json({status: true, user_service: userApp})
        } catch (e) {
            return next(e)
        }
    }

    static async Update(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const {app} = req.body;
            console.log(app);
            await UserService.update(
                {
                    url: app.url
                },
                {returning: false, where: {id: app.id}})
            return res.status(200);
        } catch (e) {
            return next(e);
        }
    }

    static async Delete(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const {id} = req.body;
            await UserService.destroy({where: {id: id}, restartIdentity: true, cascade: false});
            return res.json(200);
        } catch (e) {
            return next(e)
        }
    }

    static async GetAll(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const serv = await UserService.findAll({where: {userInfoId: req.body.userInfoId}})
            return res.json(serv)
        } catch (e) {
            return next(e)
        }
    }


    static async GetById(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const serv = await UserService.findAll({where: {id: req.body.id}})
            return res.json(serv)
        } catch (e) {
            return next(e)
        }
    }
}

export default UserAppController;