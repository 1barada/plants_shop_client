import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const useAuth = () => {
    const isAuth = useSelector<RootState>(state => state.user.authorized);
    return isAuth;
};