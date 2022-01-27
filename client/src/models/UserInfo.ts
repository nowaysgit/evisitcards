import {UserService} from "./UserService";

export interface UserInfo {
    name: string,
    profileLink: string,
    description: string,
    emoji: any,
    number: string,
    userId: number,
    user_services: UserService[]
}