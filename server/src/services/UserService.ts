import {Token, User, UserInfo} from '../models/models';
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { v4 as uuid } from 'uuid';
import EmailService from '../services/EmailService';
import TokenService, {Tokens} from '../services/TokenService';
import UserDto from '../dtos/UserDto';
import userDto from "../dtos/UserDto";
import ApiError from "../exeptions/ApiError";

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
        });
        const userInfo = await UserInfo.create({
            name: '',
            description: '',
            userId: user.id
        });
        await EmailService.SendActivationEmail(email,`${process.env.API_URL}/api/user/activate/${activationLink}`);

        return TokenService.MakeNewToken(user);
    }

    async Login(email: string, password: string) {
        const user = await User.findOne({where: {email: email}});
        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким email не найден!');
        }
        const isPassEqual = await bcrypt.compare(password, user.password);

        if (!isPassEqual)
        {
            throw ApiError.BadRequest('Введен неверный пароль!');
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
            throw ApiError.BadRequest('Некоррекная ссылка на активацию!');
        }
        user.activate = true;
        await user.save();
    }

}

export default new UserService();