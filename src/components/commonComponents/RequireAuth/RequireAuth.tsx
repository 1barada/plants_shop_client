import { Navigate } from "react-router";
import { useAuth } from "../../../hooks/useAuth";

interface RequireAuthProps {
    children: JSX.Element
};

const RequireAuth = ({children}: RequireAuthProps) => {
    const isAuthorized = useAuth();

    if (!isAuthorized) {
        return (
            <Navigate to='/'/>
        );
    }

    return (
        children
    );
}
 
export default RequireAuth;