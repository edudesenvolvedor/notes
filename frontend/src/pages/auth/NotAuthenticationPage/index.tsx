import {Outlet, useNavigate} from "react-router";
import {useEffect} from "react";
import {isSession} from "../../../lib/helpers/session.ts";

export const NotAuthenticationPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if(isSession())
            navigate("/app")
    }, []);

    return (
        <>
            <Outlet/>
        </>
    );
}