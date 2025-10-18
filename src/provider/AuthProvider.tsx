import { AuthContext } from "@/context";
import { ReactNode, useEffect, useState } from "react";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });

  const [accsessToken, setAccsessToken] = useState<string | null>(() => {
    const accessToken = localStorage.getItem("accessToken");
    return accessToken ? accessToken : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    if (accsessToken) {
      localStorage.setItem("accessToken", accsessToken);
    } else {
      localStorage.removeItem("accessToken");
    }
  }, [accsessToken]);

  return (
    <AuthContext.Provider value={{ user, setUser, accsessToken, setAccsessToken }}>
      {children}
    </AuthContext.Provider>
  );
};
