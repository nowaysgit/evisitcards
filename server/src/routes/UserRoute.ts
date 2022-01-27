import express from 'express';
import controller from '../controllers/UserController'
import {body} from "express-validator";
import AuthMiddleware from "../middleware/AuthMiddleware";

const router = express.Router();

router.post('/registration',
    body('email').trim().notEmpty().withMessage('Заполните email!').isEmail().withMessage('Введен неверный email'),
    body('password2').notEmpty().withMessage('Заполните поле пароль'),
    body('password').notEmpty().withMessage('Заполните поле пароль').isLength({min: 5, max: 36}).withMessage('Длина пароля должна быть не меньше 5 и не больше 36 символов'),
    controller.Registration)
router.post('/login',
    body('email').trim().notEmpty().withMessage('Заполните email!').isEmail().withMessage('Введен неверный email'),
    body('password').notEmpty().withMessage('Заполните поле пароль'),
    controller.Login)
router.post('/logout', AuthMiddleware, controller.Logout)
router.post('/update', AuthMiddleware, controller.Update)
router.get('/activate/:link', controller.Activate)
router.get('/refresh', controller.Refresh)
router.get('/auth-profile', AuthMiddleware, controller.GetAuthProfile)
router.get('/getbyid/:id', controller.GetById)
router.get('/getbylink/:link', controller.GetByLink)

export default router