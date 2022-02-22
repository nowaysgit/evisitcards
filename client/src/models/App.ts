export enum Type { Contact = "contact", App = "app" }
export enum Mask { At = "at", PhoneNumber = "phonenumber", Link = "link", Email = "email"}

export enum Category { Basic = "basic", Messenger = "messenger", SocialNetwork = "socialnetwork",
    Requisite = "requisite", Media = "media", Music = "music" }
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

export interface App {
    id: number,
    name: string,
    url?: string,
    img: LinksImage,
    mask: Mask,
    category: Category,
    type: Type
}