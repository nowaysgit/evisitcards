import React, {FC, useContext} from "react";
import {observer} from "mobx-react-lite";
import {Outlet} from "react-router-dom";
import {Context} from "../index";

const Loading: FC = () => {
    const {profileStore} = useContext(Context);
    return (
        profileStore.isLoading
            ? (
                profileStore.isTimeOut ? (
                        <div/>
                    )
                    : (
                        <div>
                            <h1>ЗАГРУЗКА...</h1>
                        </div>
                    )
            )
            : (
                <Outlet />
            )
    );
};

export default observer(Loading);