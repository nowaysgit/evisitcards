import React, {FC} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import App from "../App";
import Profile from "../pages/Profile/Profile";
import LoginForm from "../pages/Login/LoginForm";
import RegistrationForm from "../pages/Registration/RegistrationForm";
import Settings from "../pages/Settings/Settings";
import Me from "./Me";
import Loading from "./Loading";

const AppRouter: FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Loading/>}>
                    <Route element={<App/>}>
                        <Route path="settings" element={<Settings />} />
                        <Route path="login" element={<LoginForm/>} />
                        <Route path="registration" element={<RegistrationForm/>} />
                        <Route path="me" element={<Me/>} />
                        <Route path=":id" element={<Profile />} />
                    </Route>
                </Route>
                <Route
                    path="*"
                    element={
                        <main style={{ padding: "1rem" }}>
                            <p>There's nothing here!</p>
                        </main>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;