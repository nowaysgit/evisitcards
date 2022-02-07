import {UserApp} from "../UserApp";

export interface ProfileResponse {
    name: string,
    profileLink: string,
    description: string,
    emoji: any,
    number: string
    userId: number,
    user_services: UserApp[]
}

export interface SaveProfileResponse {
    status: boolean
}