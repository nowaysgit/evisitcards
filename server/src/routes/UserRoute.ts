import express from 'express';
import controller from '../controllers/UserController'
import {body} from "express-validator";
import AuthMiddleware from "../middleware/AuthMiddleware";
const multer = require('multer');
const upload = multer();

const router = express.Router();

router.post('/registration',
    body('email').trim().notEmpty().withMessage('Заполните поле эл. почта').isEmail().withMessage('Неверный формат эл. почты'),
    body('password2').notEmpty().withMessage('Заполните поле пароль 2'),
    body('password').notEmpty().withMessage('Заполните поле пароль').isLength({min: 5, max: 36}).withMessage('Длина пароля должна быть не менее 6 символов и не более 36 символов')
        .custom((value,{req, path}) => {
            if (value !== req.body.password2) {
                throw new Error("Passwords don't match");
            } else {
                return value;
            }
        }).withMessage('Пароли не совпадают'),
    controller.Registration)
router.post('/login',
    body('email').trim().notEmpty().withMessage('Заполните поле эл. почта').isEmail().withMessage('Неверный формат эл. почты'),
    body('password').notEmpty().withMessage('Заполните поле пароль'),
    controller.Login)
router.post('/logout', AuthMiddleware, controller.Logout)
router.post('/update', AuthMiddleware, controller.Update)
router.post('/updatepassword', AuthMiddleware,
    body('password').notEmpty().withMessage('Заполните поле пароль').isLength({min: 5, max: 36}).withMessage('Длина пароля должна быть не менее 6 символов и не более 36 символов'),
    controller.UpdatePassword)
router.post('/updateemail', AuthMiddleware,
    body('email').trim().notEmpty().withMessage('Заполните поле эл. почта').isEmail().withMessage('Неверный формат эл. почты'),
    controller.UpdateEmail)
router.post('/updateavatar', AuthMiddleware, upload.fields([{ name: 'file', maxCount: 1 }, { name: 'id', maxCount: 1 }]), controller.UpdateAvatar)
router.get('/activate/:link', controller.Activate)
router.get('/refresh', controller.Refresh)
router.get('/auth-profile', AuthMiddleware, controller.GetAuthProfile)
router.get('/getbyid/:id', controller.GetById)
router.get('/getbylink/:link', controller.GetByLink)

export default router