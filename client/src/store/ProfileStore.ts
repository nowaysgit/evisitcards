import {makeAutoObservable, runInAction} from "mobx";
import {UserInfo} from "../models/UserInfo";
import UserInfoService from "../services/UserInfoService";
import {UserApp} from "../models/UserApp";

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
            return false;
        }
        if(!this.isRendered) {
            this.SetRendered(true);
            try {
                this.UpdateProfile(id, getAuthProfile).then();
                return true;
            } catch (e: any) {
                console.error(e.message)
            }
        }
        else {
            this.SetRendered(false);
            return false;
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

    async CreateUserApp(app: UserApp) : Promise<number> {
        try {
            if (app) {
                const response = await UserInfoService.CreateUserApp(app);
                if(response.status === 200) {
                    const newApps: UserApp[] = [...this.userInfo.user_services];
                    newApps.push(response.data.user_service)
                    this.SetProfile({...this.userInfo, user_services: newApps});
                    return response.data.user_service.id
                }
            }
            return -1
        } catch (e: any) {
            console.log(e.response?.data?.message);
            return -1
        }
    }

    async SaveUserApp(id: number, url: string) {
        try {
            const userApp = this.userInfo.user_services.find(app => app.id === id);
            if (userApp) {
                userApp.url = url;
                const response = await UserInfoService.SaveUserApp(userApp);
                if(response.status === 200) {
                    const newApps: UserApp[] = [...this.userInfo.user_services.filter(app => app.id !== id)];
                    newApps.push(userApp)
                    this.SetProfile({...this.userInfo, user_services: newApps});
                }
            }
        } catch (e: any) {
            console.log('ERROR: ', e.response?.data?.message);
        }
    }

    async DeleteUserApp(id: number) {
        try {
            const userApp = this.userInfo.user_services.find(app => app.id === id);
            if (userApp) {
                const response = await UserInfoService.DeleteUserApp(id);
                if(response.status === 200) {
                    this.SetProfile({...this.userInfo, user_services: this.userInfo.user_services.filter(app => app.id !== id)});
                }
            }
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async Cansel() {
        this.userInfoEdited = this.userInfo;
    }
}