import { Navigate, Outlet } from "react-router-dom";

const ProtectedLink = ({ isAllowed, redirectPath = "/jordy/", children }) => {
  if (!isAllowed) {
    console.log("redirected");
    return <Navigate to={redirectPath} replace />;
  }
  console.log("not redirected");
  return children ? children : <Outlet />;
};

export default ProtectedLink;
