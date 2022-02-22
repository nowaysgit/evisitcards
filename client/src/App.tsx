import * as React from "react";
import {Outlet} from 'react-router-dom';
import {useContext, useMemo} from "react";
import {Context} from "./index";
import Footer from "./components/Footer";

function App(): JSX.Element {
    const {userStore} = useContext(Context);

    useMemo(() => {
        if(!userStore.user || userStore.user && !userStore.user.id)
        {
            userStore.CheckAuth();
        }
    }, [])

    return (
        <div className="App" id="page-wrap">
            <div className="content">
                <Outlet />
            </div>
            <Footer >© 2022 myinf.ru Электронная визитка.</Footer>
        </div>
    );
}

export default App;
