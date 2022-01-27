import jwt from 'jsonwebtoken';
import {Token} from '../models/models';
import UserDto from "../dtos/UserDto";

export class Tokens {
    AccessToken;
    RefreshToken;

    constructor(accessToken, refreshToken) {
        this.AccessToken = accessToken
        this.RefreshToken = refreshToken
    }
}

class TokenService {

    async MakeNewToken(user) {
        const userDto: UserDto = new UserDto(user);
        const tokens: Tokens = await this.GenerateTokens({...userDto});
        await this.SaveToken(userDto.id, tokens.RefreshToken);
        return {...tokens, user: userDto};
    }

    async GenerateTokens(payload) {
        const accessToken: string = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'});
        const refreshToken: string = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'});
        return new Tokens (accessToken, refreshToken);
    }

    async ValidateAccessToken(token: string): Promise<object|null> {
        try {
            const result = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return result;
        }
        catch (e) {
            return null as null;
        }
    }

    async ValidateRefreshToken(token: string): Promise<object|null> {
        try {
            const result = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return result;
        }
        catch (e) {
            return null as null;
        }
    }

    async SaveToken(userId: string , refreshToken: string ) {
        const tokenData = await Token.findOne({where: {userId: userId}});
        if (tokenData) {
            // @ts-ignore
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        return await Token.create({
            userId: userId,
            refreshToken: refreshToken
        })
    }

    async Remove(refreshToken: string ) {
        const result = await Token.destroy({where: {refreshToken: refreshToken}});
        console.log(result);
        return result;
    }

    async Find(refreshToken: string ) {
        const tokenData = await Token.findOne({where: {refreshToken: refreshToken}});
        return tokenData;
    }
}

export default new TokenService();