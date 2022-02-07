import $api from "../http"
import {AxiosResponse} from 'axios';
import {ProfileResponse, SaveProfileResponse} from "../models/response/ProfileResponse";
import {UserApp} from "../models/UserApp";
import {UserInfo} from "../models/UserInfo";
import {UserAppResponse} from "../models/response/UserAppResponse";

export default class UserInfoService {
    static async GetProfileById(id: number): Promise<AxiosResponse<ProfileResponse>> {
        return $api.get<ProfileResponse>('/user/getbyid/' + id);
    }
    static async GetProfileByLink(link: string): Promise<AxiosResponse<ProfileResponse>> {
        return $api.get<ProfileResponse>('/user/getbylink/' + link);
    }
    static async GetAuthProfile(): Promise<AxiosResponse<ProfileResponse>> {
        return $api.get<ProfileResponse>('/user/auth-profile');
    }
    static async SaveProfile(user: UserInfo): Promise<AxiosResponse<SaveProfileResponse>> {
        return $api.post<SaveProfileResponse>('/user/update', { user });
    }

    static async CreateUserApp(app: UserApp): Promise<AxiosResponse<UserAppResponse>> {
        return $api.post('/user-app/create', { app });
    }
    static async SaveUserApp(app: UserApp): Promise<AxiosResponse<UserAppResponse>> {
        return $api.post('/user-app/update', { app });
    }
    static async DeleteUserApp(id: number): Promise<AxiosResponse<UserAppResponse>> {
        return $api.delete('/user-app/delete', { data: { id: id  } });
    }
}