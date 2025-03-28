import {useEffect} from "react";
import {Outlet, useNavigate} from "react-router";
import {isSession} from "../../../lib/helpers/session.ts";

export const AuthenticationPage = () => {

    const navigate = useNavigate();

    useEffect(() => {
        if(!isSession())
            navigate("/auth/login")
    }, []);

    return (
        <>
            <Outlet/>
        </>
    );
}