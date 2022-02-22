import {UserApp} from "./UserApp";

export interface UserInfo {
    name: string,
    profileLink: string,
    description: string,
    avatar: string,
    number: string,
    userId: number,
    user_services: UserApp[]
}