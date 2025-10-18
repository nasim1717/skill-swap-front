import { useEffect, useState } from "react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import HeroSection from "./HeroSection";
import Logo from "../../../assets/icon.png";
import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser } from "@/services/authService";
import { useAuthContext } from "@/hooks/useAuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const navigate = useNavigate();
  const { setUser, setAccsessToken } = useAuthContext();
  // Register
  const { mutate: handleRegister, isPending: isRegisterLoading } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data: any) => {
      toast.success("User registered successfully");
      setUser(data.data.user);
      setAccsessToken(data.data.access_token);
      navigate("/");
    },
    onError: (registerError: any) => {
      const errorMessagr = registerError?.response?.data?.errors;
      for (const [key, value] of Object.entries(errorMessagr)) {
        setErrors((prev) => ({ ...prev, [key]: value }));
      }
    },
  });

  // login
  const { mutate: handleLogin, isPending: isLoginLoading } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data: any) => {
      toast.success("User logged in successfully");
      setUser(data.data.user);
      setAccsessToken(data.data.access_token);
      navigate("/");
    },
    onError: (registerError: any) => {
      const errorMessagr = registerError?.response?.data?.errors;
      for (const [key, value] of Object.entries(errorMessagr)) {
        setErrors((prev) => ({ ...prev, [key]: value }));
      }
    },
  });

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState<Record<string, unknown>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLogin) {
      handleRegister(formData);
    } else {
      handleLogin(formData);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    });
  };

  return (
    <div className="min-h-screen flex">
      {/* Hero Section */}
      <HeroSection />
      {/* Auth Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-12">
        <Card className="w-full max-w-md shadow-lg border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center">
            <div className="w-20 h-12  rounded-full flex items-center justify-center mx-auto mb-4">
              <img src={Logo} className=" " />
            </div>
            <CardTitle className="text-2xl font-bold">
              {isLogin ? "Welcome back" : "Create account"}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {isLogin
                ? "Enter your credentials to access your account"
                : "Join SkillSwap to connect with learners and teachers"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      className={cn(
                        "pl-10 transition-all duration-smooth",
                        errors.name && "border-destructive focus-visible:ring-destructive"
                      )}
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                  </div>
                  {errors.name && <p className="text-sm text-destructive">{String(errors.name)}</p>}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className={cn(
                      "pl-10 transition-all duration-smooth",
                      errors.email && "border-destructive focus-visible:ring-destructive"
                    )}
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
                {errors.email && <p className="text-sm text-destructive">{String(errors.email)}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className={cn(
                      "pl-10 pr-10 transition-all duration-smooth",
                      errors.password && "border-destructive focus-visible:ring-destructive"
                    )}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">{String(errors.password)}</p>
                )}
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className={cn(
                        "pl-10 pr-10 transition-all duration-smooth",
                        errors.confirm_password &&
                          "border-destructive focus-visible:ring-destructive"
                      )}
                      value={formData.confirm_password}
                      onChange={(e) => handleInputChange("confirm_password", e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  {errors.confirm_password && (
                    <p className="text-sm text-destructive">{String(errors.confirm_password)}</p>
                  )}
                </div>
              )}

              <Button type="submit" size="lg" className="w-full mt-6" disabled={isRegisterLoading}>
                {isRegisterLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{isLogin ? "Signing in..." : "Creating account..."}</span>
                  </div>
                ) : (
                  <span>{isLogin ? "Sign In" : "Create Account"}</span>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Button
                variant="link"
                onClick={toggleMode}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthForm;
