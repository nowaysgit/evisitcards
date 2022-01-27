import {makeAutoObservable} from "mobx";

interface PopUpData {
    x: number
    y: number
    data: any
}

export default class PopUpStore {
    data: PopUpData = {x: 0, y: 0, data: {}};
    show = false;

    constructor() {
        makeAutoObservable(this);
    }

    SetData = (data: PopUpData) => {
        this.data = data;
    }

    SetShowFalse = () => {
        this.show = false;
    }

    SetShowTrue = () => {
        this.show = true;
        setTimeout(this.TeleportPopUp, 0.01);
    }

    TeleportPopUp = () => {
        const modal = document.getElementById("MODAL");
        const marginRight: number = (6.4/100)*window.screen.width
        if (modal) {
            modal.style.marginLeft = String(window.screen.width - (marginRight + modal.offsetWidth)) + 'px';
            modal.style.marginTop = String(this.data.y) + 'px';
            modal.style.opacity = String(100);
        }
    }
}