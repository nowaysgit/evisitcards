import express from 'express';
import {Service} from '../models/models';

class ServiceController {

    static async Create(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const {name} = req.body
            const serv = await Service.create({name})
            return res.json(serv)
        } catch (e) {
            return next(e)
        }
    }

    static async GetAll(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const serv = await Service.findAll()
            return res.json(serv)
        } catch (e) {
            return next(e)
        }
    }


    static async GetById(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const serv = await Service.findAll({where: {id: req.body.id}})
            return res.json(serv)
        } catch (e) {
            return next(e)
        }
    }
}

export default ServiceController;