import express from 'express';
import models, {UserInfo, UserService} from '../models/models';

class UserServiceController {

    static async Create(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const {userInfoId, url, serviceId} = req.body
            const serv = await UserService.create({userInfoId: userInfoId, url: url, serviceId: serviceId})
            return res.json(serv)
        } catch (e) {
            return next(e)
        }
    }

    static async Update(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const {id, url} = req.body
            await UserService.update(
                {
                    url: url
                },
                {returning: false, where: {id: id}})
            return res.status(200)
        } catch (e) {
            return next(e)
        }
    }

    static async Delete(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const {id} = req.body;
            await UserService.destroy({where: {id: id}});
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

export default UserServiceController;