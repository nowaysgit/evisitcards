import {User} from "../models/User"
import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import { AuthResponse } from "src/models/response/AuthResponse";
import {API_URL} from "../http";
import axios from "axios";
import {ErrorsResponse} from "../models/response/ErrorsResponse";
import UserInfoService from "../services/UserInfoService";

export default class UserStore {
    user = {} as User;
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    SetAuth(bool: boolean) {
        this.isAuth = bool;
    }

    SetUser(user: User) {
        this.user = user;
    }

    SetLoading(bool: boolean) {
        this.isLoading = bool;
    }

    async Login(email: string, password: string): Promise< ErrorsResponse[]| null> {
        try {
            const response = await AuthService.Login(email, password);
            localStorage.setItem('token', response.data.AccessToken);
            this.SetAuth(true);
            this.SetUser(response.data.user);
            console.log(response.data.user);
            return null;
        } catch (e: any) {
            return (e.response?.data?.errors)
        }
    }

    async Registration(email: string, password: string, password2: string): Promise< ErrorsResponse[]| null> {
        try {
            await AuthService.Registration(email, password, password2);
            return null
        } catch (e: any) {
            return (e.response?.data?.errors)
        }
    }

    async Logout() {
        try {
            const response = await AuthService.Logout();
            localStorage.removeItem('token')
            this.SetAuth(false);
            this.SetUser({} as User);
        } catch (e: any) {
            console.log(e.response?.data?.message)
        }
    }

    async CheckAuth() {
        this.SetLoading(true);
        try {
            const response = await axios.get(`${API_URL}/user/refresh`, { withCredentials: true })
            localStorage.setItem('token', response.data.AccessToken);
            this.SetAuth(true);
            this.SetUser(response.data.user);
        } catch (e: any) {
            console.log(e.response?.data?.message);
            if (e.response.status === 401 && localStorage.getItem('token')) {
                localStorage.removeItem('token')
                this.SetAuth(false);
                this.SetUser({} as User);
            }
        } finally {
            this.SetLoading(false);
        }
    }

    async UpdatePassword(password: string) : Promise<ErrorsResponse[] | null> {
        this.SetLoading(true);
        try {
            const response = await AuthService.UpdatePassword(this.user.id, password);
            localStorage.setItem('token', response.data.AccessToken)
            return null;
        } catch (e: any) {
            return await e.response?.data?.errors;
        } finally {
            this.SetLoading(false);
        }
        return null;
    }

    async UpdateEmail(email: string) : Promise<ErrorsResponse[] | null> {
        this.SetLoading(true);
        try {
            const response = await AuthService.UpdateEmail(this.user.id, email);
            localStorage.setItem('token', response.data.AccessToken);
        } catch (e: any) {
            return await e.response?.data?.errors;
        } finally {
            this.SetLoading(false);
        }
        return null;
    }
}