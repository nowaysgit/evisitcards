import {UserService} from "../UserService";

export interface ProfileResponse {
    name: string,
    profileLink: string,
    description: string,
    emoji: any,
    number: string
    userId: number,
    user_services: UserService[]
}

export interface SaveProfileResponse {
    status: boolean
}