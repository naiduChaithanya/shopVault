import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

export function useAuth(){
    const {user, token, isloading, error} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const isAuthenticated = Boolean(token);
    const handleLogout = () => dispatch(logout());

    return {user, token, isloading, error, isAuthenticated, handleLogout}
}