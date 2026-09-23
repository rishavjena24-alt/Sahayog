import React, { useState } from "react";
import { AuthCtx, roleProfiles, UserProfile } from "./useAuth";
import { Role } from "../types";

const STORAGE_KEY = "sahayog:user";

function readStoredUser(): UserProfile | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(readStoredUser);

  function login(role: Role): UserProfile | null {
    const profile = roleProfiles[role];
    if (!profile) return null;
    const account: UserProfile = { ...profile, role };
    setUser(account);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(account));
    return account;
  }

  function logout(): void {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <AuthCtx.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthCtx.Provider>
  );
};
