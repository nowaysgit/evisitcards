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

interface UserServiceInstance extends Model {
    id: number,
    url: string,
    userInfoId: number,
    serviceId: number
}

export const UserService = sequelize.define<UserServiceInstance>('user_service', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    url: {type:DataTypes.STRING},
    serviceId: {type:DataTypes.INTEGER}
}, {timestamps: false})

export enum Mask { At = "at", PhoneNumber = "phonenumber", Link = "link" }
export enum LinksImage {
    Telephone = 'phone-ico.svg',
    Mail = 'mail-ico.svg',
    Site = 'site-ico.svg',
    Telegram = 'telegram-ico.svg',
    WhatsApp = 'whatsapp-ico.svg',
    Viber = 'viber-ico.svg',
    Discord = 'discord-ico.svg',
    Instagram = 'instagram-ico.svg',
    Vk = 'vkontakte-ico.svg',
    Ok = 'odnoklassniki-ico.svg',
    Tiktok = 'tiktok-ico.svg',
    Twitter = 'twitter-ico.svg',
    Facebook = 'facebook-ico.svg',
    Snapchat = 'snapchat-ico.svg',
    Sberbank = 'sberbank-ico.svg',
    Tinkoff = 'tinkoff-ico.svg',
    Umoney = 'umoney-ico.svg',
    Behance = 'behance-ico.svg',
    Dribbble = 'dribbble-ico.svg',
    Twitch = 'twitch-ico.svg',
    YouTube = 'youtube-ico.svg',
    YandexMusic = 'yandexmusic-ico.svg',
    Spotify = 'spotify-ico.svg',
    AppleMusic = 'applemusic-ico.svg',
    Soundcloud = 'soundcloud-ico.svg',
    Steam = 'steam-ico.svg'
}
export enum Category {
    Basic = "basic",
    Messenger = "messenger",
    SocialNetwork = "socialnetwork",
    Requisite = "requisite",
    Media = "media",
    Music = "music"
}

export enum Type { Contact = "contact", App = "app" }

interface ServiceInstance extends Model {
    id: number,
    name: string,
    url: string,
    mask: Mask,
    img: LinksImage,
    category: Category,
    type: Type
}

export const Service = sequelize.define<ServiceInstance>('service', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type:DataTypes.STRING},
    url: {type:DataTypes.STRING},
    mask: {type:DataTypes.ENUM('at', 'phonenumber', 'link')},
    img: {type:DataTypes.ENUM(
    'phone-ico.svg',
        'mail-ico.svg',
        'site-ico.svg',
        'telegram-ico.svg',
        'whatsapp-ico.svg',
        'viber-ico.svg',
        'discord-ico.svg',
        'instagram-ico.svg',
        'vkontakte-ico.svg',
        'odnoklassniki-ico.svg',
        'tiktok-ico.svg',
        'twitter-ico.svg',
        'facebook-ico.svg',
        'snapchat-ico.svg',
        'sberbank-ico.svg',
        'tinkoff-ico.svg',
        'umoney-ico.svg',
        'behance-ico.svg',
        'dribbble-ico.svg',
        'twitch-ico.svg',
        'youtube-ico.svg',
        'yandexmusic-ico.svg',
        'spotify-ico.svg',
        'applemusic-ico.svg',
        'soundcloud-ico.svg',
        'steam-ico.svg')},
    category: {type:DataTypes.ENUM(
        'basic',
            'messenger',
            'socialnetwork',
            'requisite',
            'media',
            'music')},
    type: {type:DataTypes.ENUM('contact', 'app')}
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