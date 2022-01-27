import {User} from "../models/User"
import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import { AuthResponse } from "src/models/response/AuthResponce";
import {API_URL} from "../http";
import axios from "axios";

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

    async Login(email: string, password: string): Promise<boolean> {
        try {
            const response = await AuthService.Login(email, password);
            localStorage.setItem('token', response.data.AccessToken);
            this.SetAuth(true);
            this.SetUser(response.data.user);
            console.log(response.data.user);
            return true;
        } catch (e: any) {
            console.log(e.response?.data?.message);
            return false;
        }
    }

    async Registration(email: string, password: string, password2: string) {
        try {
            const response = await AuthService.Registration(email, password, password2);
            localStorage.setItem('token', response.data.AccessToken)
            this.SetAuth(true);
            this.SetUser(response.data.user);
        } catch (e: any) {
            console.log(e.response?.data?.message)
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
            const response = await axios.get<AuthResponse>(`${API_URL}/user/refresh`, { withCredentials: true })
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
}