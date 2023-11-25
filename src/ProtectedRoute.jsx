import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes({ isLogged, children, redirectTo = "/" }) {
    if (!isLogged) {
        return <Navigate to={redirectTo} replace />;
    } else {
        return children ? children : <Outlet />;
    }
}

export default ProtectedRoutes;
