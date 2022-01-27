import {Service} from "./Service";
export enum Type { Contact = "contact", App = "app" }

export interface UserService {
    id: number,
    url: string,
    type: Type;
    userInfoId: number,
    service: Service
}

export interface ServicesProps {
    info: UserService[],
    blockTitle: string
}

export interface ServiceProps {
    info: UserService
}