import $api from "../http"
import {AxiosResponse} from 'axios';
import {ProfileResponse, SaveProfileResponse} from "../models/response/ProfileResponse";
import {UserService} from "../models/UserService";
import {UserInfo} from "../models/UserInfo";
import {UserServiceResponse} from "../models/response/UserServiceResponse";

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

    static async CreateUserService(service: UserService): Promise<AxiosResponse<UserServiceResponse>> {
        return $api.post('/user-service/create', { service });
    }
    static async SaveUserService(service: UserService): Promise<AxiosResponse<UserServiceResponse>> {
        return $api.put('/user-service/update', { service });
    }
    static async DeleteUserService(id: number): Promise<AxiosResponse<UserServiceResponse>> {
        return $api.delete('/user-service/delete', { data: { id: id  } });
    }
}