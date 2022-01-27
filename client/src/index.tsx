import * as React from "react";
import * as ReactDOM from "react-dom";
import UserStore from "./store/UserStore";
import {createContext} from "react";
import AppRouter from "./components/AppRouter";
import ProfileStore from "./store/ProfileStore";
import "./styles/Index.scss";

interface State {
    userStore: UserStore,
    profileStore: ProfileStore,
}

const userStore = new UserStore();
const profileStore = new ProfileStore();

export const Context = createContext<State>({
    userStore,
    profileStore
})

ReactDOM.render(
    <div className="container-fluid g-custom">
        <Context.Provider value={{
            userStore,
            profileStore
        }}>
            <AppRouter/>
        </Context.Provider>
    </div>,
  document.getElementById("root")
);