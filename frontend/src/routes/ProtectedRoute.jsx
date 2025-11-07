import { Navigate, useLocation } from "react-router-dom";
export default function ProtectedRoute({ children }){
  const auth = localStorage.getItem("pb_user");
  const loc = useLocation();
  if(!auth) return <Navigate to="/login" state={{ from: loc }} replace />;
  return children;
}
