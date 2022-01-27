import {makeAutoObservable, runInAction} from "mobx";
import {UserInfo} from "../models/UserInfo";
import UserInfoService from "../services/UserInfoService";

export default class ProfileStore {
    userInfo = {} as UserInfo;
    userInfoEdited = {} as UserInfo;
    isLoading = false;
    isRendered = false;
    isTimeOut = false;

    constructor() {
        makeAutoObservable(this);
    }

    SetProfileEdited = (user: UserInfo) => {
        this.userInfoEdited = user;
    }

    SetProfile = (user: UserInfo) => {
        this.userInfo = user;
    }

    SetIsLoading = (bool: boolean) => {
        this.isLoading = bool;
        if  (bool) {
            runInAction(() => {
                this.SetIsTimeOut(true)
                setTimeout(() => {
                    if (this.isLoading) {
                        this.SetIsTimeOut(false)
                    }
                }, 1500)
            })
        }
    }

    SetIsTimeOut = (bool: boolean) => {
        this.isTimeOut = bool;
    }

    SetRendered = (bool: boolean) => {
        this.isRendered = bool;
    }

    TryUpdateProfile = async (id: number | string, getAuthProfile: boolean = false) => {
        if (((!isNaN(parseInt(String(id))) && isFinite(Number(String(id))))
            ? id === this.userInfo.userId
            : id.toString() === this.userInfo.profileLink))
        {
            console.log("TryUpdateProfile FALSE");
            return;
        }
        if(!this.isRendered) {
            console.log("TryUpdateProfile");
            this.SetRendered(true);
            try {
                this.UpdateProfile(id, getAuthProfile).then();
            } catch (e: any) {
                console.error(e.message)
            }
        }
        else {
            console.log("TryUpdateProfile FALSE");
            this.SetRendered(false);
        }
    }

    UpdateProfile = async (id: number | string, getAuthProfile: boolean = false) => {
        console.log("UpdateProfile");
        runInAction(() => {
            this.SetIsLoading(true);
        })
        try {
            if (getAuthProfile)
            {
                await UserInfoService.GetAuthProfile().then(r => {
                    this.SetProfile(r.data)
                    this.userInfoEdited = r.data;
                    return this.userInfo
                })
            }
            else {
                if (!isNaN(parseInt(String(id))) && isFinite(Number(String(id)))) {
                    await UserInfoService.GetProfileById(parseInt(String(id))).then(r => {
                        this.SetProfile(r.data)
                        return this.userInfo
                    })
                }
                else
                {
                    await UserInfoService.GetProfileByLink(String(id)).then(r => {
                        this.SetProfile(r.data)
                        return this.userInfo
                    })
                }
            }
        } catch (e: any) {
            console.log(e.response?.data?.message);
        } finally {
            this.SetIsLoading(false);
        }
    }

    async Save() {
        this.SetIsLoading(true);
        try {
            const response = await UserInfoService.SaveProfile(this.userInfoEdited);
            console.log(response.status);
            if(response.status === 200) {
                this.SetProfile(this.userInfoEdited);
            }
        } catch (e: any) {
            console.log(e.response?.data?.message);
        } finally {
            this.SetIsLoading(false);
        }
    }

    async CreateUserService(id: number) {
        try {
            const service = this.userInfoEdited.user_services.find(service => service.id === id);
            if (service) {
                const response = await UserInfoService.CreateUserService(service);
                if(response.status === 200) {
                    this.SetProfile(this.userInfoEdited);
                }
            }
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async SaveUserService(id: number) {
        try {
            const service = this.userInfoEdited.user_services.find(service => service.id === id);
            if (service) {
                const response = await UserInfoService.SaveUserService(service);
                if(response.status === 200) {
                    this.SetProfile(this.userInfoEdited);
                }
            }
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async DeleteUserService(id: number) {
        try {
            const service = this.userInfo.user_services.find(service => service.id === id);
            if (service) {
                const response = await UserInfoService.DeleteUserService(id);
                if(response.status === 200) {
                    this.SetProfile({...this.userInfo, user_services: this.userInfo.user_services.filter(service => service.id !== id)});
                }
                console.log(response.status);
                console.log(this.userInfo);
            }
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async Cansel() {
        this.userInfoEdited = this.userInfo;
    }
}