import { AuthContext } from "@/context";
import { ReactNode, useEffect, useState } from "react";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};
