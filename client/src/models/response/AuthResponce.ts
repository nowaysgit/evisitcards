import {User} from "../User";

export interface AuthResponse {
    AccessToken: string,
    RefreshToken: string,
    user: User
}