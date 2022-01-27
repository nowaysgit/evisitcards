export enum Mask { At = "at", PhoneNumber = "phonenumber", Link = "link" }
export enum Category { Basic = "basic", Messenger = "messenger", SocialNetwork = "socialnetwork",
    Requisite = "requisite", Media = "media", Music = "music" }
export enum LinksImage { Vk = 'vkontakte-ico.svg', Telegram = 'telegram-ico.svg', Whatsapp = 'whatsapp-ico.svg',
    Instagram = 'instagram-ico.svg', Tiktok = 'tiktok-ico.svg', Discord = 'discord-ico.svg', Steam = 'steam-ico.svg' }

export interface Service {
    name: string,
    url: string,
    img: LinksImage,
    mask: Mask,
    category: Category,
}