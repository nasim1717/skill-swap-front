import { useNavigate } from "react-router-dom";
import AuthForm from "@/pages/Auth/components/AuthForm";

const Auth = () => {
  const navigate = useNavigate();

  const handleAuthSuccess = () => {
    // Set authentication flag (in real app, this would be proper auth state management)
    localStorage.setItem("isAuthenticated", "true");
    navigate("/");
  };

  return <AuthForm onAuthSuccess={handleAuthSuccess} />;
};

export default Auth;
