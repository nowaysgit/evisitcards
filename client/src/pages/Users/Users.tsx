import React, {FC} from 'react';
import { Outlet } from "react-router-dom";

const Users: FC = () => {

    return (
        <div>
            <Outlet/>
        </div>
    );
};

export default Users;