import { Navigate } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";

export default function ProtectedRoute({ children }) {
    const { token } = useAuth();
    
    if (!token) {
        return <Navigate to="/Login.js" />;
    };
    
    return children;
};