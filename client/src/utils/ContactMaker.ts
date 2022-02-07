import vCard from "vcf";
import {UserInfo} from "../models/UserInfo";

export function MakeContact(userInfo: UserInfo) : vCard {
    const card = new vCard();
    //const address = ';;42 Plantation St.;Baytown;LA;30314;United States of America'
    //const property = new vCard.Property( 'adr', address, {
    //    type: [ 'home' ],
    //    label: '"42 Plantation St.\nBaytown, LA 30314\nUnited States of America"',
    //})
    //card.addProperty( property )
    card.addProperty(new vCard.Property( 'n', `${userInfo.name};;;`,{
        charset: 'utf-8'
    }))
    card.addProperty(new vCard.Property( 'note', `❗️Долгое нажатие на фото профиля сохранит контакт в Ваш телефон 😉`,
        {
        charset: 'utf-8'
    }))
    card.addProperty(new vCard.Property( 'tel', `${userInfo.user_services.find(app => app.service.id === 1)?.url || ''}`))
    card.addProperty(new vCard.Property( 'email', `${userInfo.user_services.find(app => app.service.id === 2)?.url || ''}`,
        {
        type: 'INTERNET'
    }))
    card.addProperty(new vCard.Property( 'url', `https://myinf/${userInfo.profileLink}`,
        {
        type: 'MyInf'
    }))

    return card;
}