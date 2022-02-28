import vCard from "vcf";
import {UserInfo} from "../models/UserInfo";
import {ToBase64FromUrl} from "./helpfunctions";

export async function MakeContact(userInfo: UserInfo): Promise<vCard> {
    const card = new vCard();
    //const address = ';;42 Plantation St.;Baytown;LA;30314;United States of America'
    //const property = new vCard.Property( 'adr', address, {
    //    type: [ 'home' ],
    //    label: '"42 Plantation St.\nBaytown, LA 30314\nUnited States of America"',
    //})
    //card.addProperty( property )
    const photo = await ToBase64FromUrl('http://188.225.18.217:8080/user_images/' + userInfo.avatar);
    card.addProperty(new vCard.Property('photo', photo.replace('data:image/jpeg;base64,', ''),
        {
            encoding: 'b',
            type: 'JPEG'
        }))
    let name = '';
    let i = 0;
    for (const n of userInfo.name.split(' ').reverse()) {
        name = name + n + ';';
        i++
    }
    card.addProperty(new vCard.Property('n', `${name}`, {
        charset: 'utf-8'
    }))
    card.addProperty(new vCard.Property('note', `❗️Долгое нажатие на фото профиля сохранит контакт в Ваш телефон 😉`,
        {
            charset: 'utf-8'
        }))
    card.addProperty(new vCard.Property('tel', `${userInfo.user_services.find(app => app.service.id === 1)?.url || ''}`))
    card.addProperty(new vCard.Property('email', `${userInfo.user_services.find(app => app.service.id === 2)?.url || ''}`,
        {
            type: 'INTERNET'
        }))
    card.addProperty(new vCard.Property('url', `https://myinf/${userInfo.profileLink}`,
        {
            type: 'MyInf'
        }))

    return card;
}