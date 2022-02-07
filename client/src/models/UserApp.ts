import {App} from "./App";

export interface UserApp {
    id: number,
    url: string,
    userInfoId: number,
    service: App
}

export interface AppsProps {
    info: UserApp[],
    blockTitle: string
}

export interface AppProps {
    info: UserApp
}