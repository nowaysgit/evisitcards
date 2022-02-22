import {Token, User, UserInfo} from '../models/models';
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { v4 as uuid } from 'uuid';
import EmailService from '../services/EmailService';
import TokenService from '../services/TokenService';
import sharp from 'sharp';
import ApiError from "../exeptions/ApiError";
const process = require('process');
const path = require('path');
import { Op } from 'sequelize'

class UserService {
    async Registration(email: string, password: string, password2: string) {
        const candidate = await User.findOne({where: {email: email}})

        if (candidate) {
            throw ApiError.BadRequest('Пользователь с такой почтой уже существует!');
        }

        let hashPassword: string = await bcrypt.hash(password, 3);
        let activationLink: string = uuid();

        const user = await User.create({
            email: email,
            activate: false,
            activate_link: activationLink,
            password: hashPassword,
            passwordLastUpdate: new Date().toISOString()
        });
        const userInfo = await UserInfo.create({
            name: '',
            description: '',
            userId: user.id
        });
        await EmailService.SendActivationEmail(email,`${process.env.API_URL}/api/user/activate/${activationLink}`);

        await this.ClearPeople();

        return //TokenService.MakeNewToken(user);
    }

    async ClearPeople() {
        const candidates = await User.findAll({where: {activate: false, createdAt: {
            [Op.lt]: new Date(Date.now() - 86400000)
        }}})
        if(!candidates) return;
        candidates.map(async candidate => {
            const info = await UserInfo.findOne({where: {userId: candidate.id}});
            if(info) {
                await info.destroy();
                await candidate.destroy();
            }
        })
    }

    async Login(email: string, password: string) {
        const user = await User.findOne({where: {email: email}});
        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким email не найден', [{value: '', msg: 'Пользователь с таким email не найден', param: 'email', location: 'body'}]);
        }
        const isPassEqual = await bcrypt.compare(password, user.password);

        if (!isPassEqual)
        {
            throw ApiError.BadRequest('Введен неверный пароль', [{value: '', msg: 'Введен неверный пароль', param: 'password', location: 'body'}]);
        }

        return TokenService.MakeNewToken(user);
    }

    async Logout(refreshToken: string) {
        const token = await Token.findOne({where: {refreshToken: refreshToken}});
        if (!token) {
            throw ApiError.BadRequest('Токен не найден!');
        }
        return await TokenService.Remove(refreshToken);
    }

    async Refresh(refreshToken: string) {
        if (!refreshToken) {
            throw ApiError.Unauthorized();
        }
        const userData = await TokenService.ValidateRefreshToken(refreshToken);
        const tokenData = await TokenService.Find(refreshToken);
        if (!userData || !tokenData) {
            throw ApiError.Unauthorized();
        }

        // @ts-ignore
        const user = await User.findOne({where: {id: userData.id}});

        return TokenService.MakeNewToken(user);
    }

    async Activate(link: string) {
        const user = await User.findOne({where: {activate_link: link}});
        if (!user) {
            throw ApiError.BadRequest('Некорректная ссылка на активацию!');
        }
        user.activate = true;
        await user.save();
    }

    async UpdatePassword(id: number, password: string) {
        let hashPassword: string = await bcrypt.hash(password, 3);

        await User.update({
            password: hashPassword,
            passwordLastUpdate: new Date().toISOString()
        }, {returning: true, where: {id: id}});
        const user = await User.findOne({where: {id: id}});

        return TokenService.MakeNewToken(user);
    }

    async UpdateEmail(id: number, email: string) {
        await User.update({
            email: email
        }, {returning: true, where: {id: id}});
        const user = await User.findOne({where: {id: id}});

        return TokenService.MakeNewToken(user);
    }

    async UpdateAvatar(id: number, avatar: any) {
        const user = await UserInfo.findOne({where: {userId: id}});
        let avatarName: string = uuid();
        avatarName = avatarName + ".jpeg"
        if(user.avatar != null) {
            avatarName = user.avatar;
        }
        const dir = process.argv[2];

        const output_path = path.join(dir, "..", "..", "..", "client", "public", "user_images");

        const resized = await sharp(avatar.buffer).resize(500, 500)
            .toFormat("jpeg", {mozjpeg: true})
            .toFile(path.join(output_path, avatarName));

        if(user.avatar == null) {
            await UserInfo.update({
                avatar: avatarName
            }, {returning: true, where: {userId: id}});
        }
    }

}

export default new UserService();