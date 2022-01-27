import sequelize from "../db";
import {Model, DataTypes} from "sequelize";

interface UserInstance extends Model {
    id: number,
    phone_number: string,
    email: string,
    password: string,
    activate: boolean,
    activate_link: string,
    role: string
}

export const User = sequelize.define<UserInstance>('user', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    phone_number: {type:DataTypes.STRING},
    email: {type:DataTypes.STRING, unique: true},
    password: {type:DataTypes.STRING},
    activate: {type:DataTypes.BOOLEAN},
    activate_link: {type:DataTypes.STRING},
    role: {type:DataTypes.STRING, defaultValue: 'USER'}
})

export interface UserInfoInstance extends Model {
    id: number,
    name: string,
    description: string,
    emoji: any,
    userInfoId: number,
    userId: number
}

export const UserInfo = sequelize.define<UserInfoInstance>('user_info', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    profileLink: {type:DataTypes.STRING},
    name: {type:DataTypes.STRING},
    description: {type:DataTypes.STRING},
    emoji: {type:DataTypes.ENUM('&#128512', '&#128521', '&#128578'), defaultValue: '&#128512'}
}, {timestamps: false})

export enum Type { Contact = "contact", App = "app" }

interface UserServiceInstance extends Model {
    id: number,
    url: string,
    type: Type,
    userInfoId: number,
    serviceId: number
}

export const UserService = sequelize.define<UserServiceInstance>('user_service', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    url: {type:DataTypes.STRING},
    type: {type:DataTypes.ENUM('contact', 'app')},
    serviceId: {type:DataTypes.INTEGER}
}, {timestamps: false})

export enum Mask { At = "at", PhoneNumber = "phonenumber", Link = "link" }
export enum LinksImage { Vk = 'vkontakte-ico.svg', Telegram = 'telegram-ico.svg', Whatsapp = 'whatsapp-ico.svg',
    Instagram = 'instagram-ico.svg',
    Tiktok = 'tiktok-ico.svg',
    Discord = 'discord-ico.svg',
    Steam = 'steam-ico.svg'
}
export enum Category { Basic = "basic", Messenger = "messenger", SocialNetwork = "socialnetwork",
    Requisite = "requisite", Media = "media", Music = "music" }

interface ServiceInstance extends Model {
    id: number,
    name: string,
    url: string,
    mask: Mask,
    img: LinksImage
    category: Category
}

export const Service = sequelize.define<ServiceInstance>('service', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type:DataTypes.STRING},
    url: {type:DataTypes.STRING},
    mask: {type:DataTypes.ENUM('at', 'phonenumber', 'link')},
    img: {type:DataTypes.ENUM('vkontakte-ico.svg', 'telegram-ico.svg', 'whatsapp-ico.svg', 'instagram-ico.svg',
            'tiktok-ico.svg',
            'discord-ico.svg',
            'steam-ico.svg')},
    category: {type:DataTypes.ENUM('basic', 'messenger', 'socialnetwork', 'requisite',
            'media',
            'music')}
}, {timestamps: false})

interface TokenInstance extends Model {
    id: number,
    refreshToken: string
    userId: number
}

export const Token = sequelize.define<TokenInstance>('token', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    refreshToken: {type:DataTypes.STRING}
})

interface ServiceUserServiceInstance extends Model {
    serviceId: number
    userServiceId: string
}

const ServiceUserService = sequelize.define<ServiceUserServiceInstance>('service_user_service',
    {}, { timestamps: false });

User.hasOne(UserInfo, {as: 'user_info'})
UserInfo.belongsTo(User)

UserInfo.hasMany(UserService, {as: 'user_services'})
UserService.belongsTo(UserInfo)

UserService.belongsTo(Service, {as: 'service'} );
Service.belongsToMany(UserService, {as: 'user_services', through: ServiceUserService});

User.hasOne(Token)
Token.belongsTo(User)

export default {User, UserInfo, UserService, Service, Token};