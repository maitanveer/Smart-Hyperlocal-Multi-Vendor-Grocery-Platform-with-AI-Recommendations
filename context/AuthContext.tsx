'use client';

import React, { createContext, useContext, useState } from 'react';

export type UserRole = 'user' | 'vendor' | 'admin';

export interface UserInfo {
  name: string;
  email: string;
  role: UserRole;
}

interface AuthCredentials {
  email: string;
  password: string;
  role: UserRole;
}

interface SignupData extends AuthCredentials {
  name: string;
}

interface AuthResult {
  success: boolean;
  message: string;
}

interface AuthContextType {
  user: UserInfo | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (credentials: AuthCredentials) => AuthResult;
  signup: (data: SignupData) => AuthResult;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_KEY = 'saas-session';
const USERS_KEY = 'saas-users';

function getStoredUsers(): SignupData[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(USERS_KEY);
    return stored ? (JSON.parse(stored) as SignupData[]) : [];
  } catch {
    return [];
  }
}

function saveStoredUsers(users: SignupData[]) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserInfo | null>(() => {
    if (typeof window === 'undefined') {
      return null;
    }

    const storedSession = window.localStorage.getItem(SESSION_KEY);
    if (!storedSession) {
      return null;
    }

    try {
      return JSON.parse(storedSession) as UserInfo;
    } catch {
      window.localStorage.removeItem(SESSION_KEY);
      return null;
    }
  });
  const loading = false;

  const login = ({ email, password, role }: AuthCredentials): AuthResult => {
    const users = getStoredUsers();
    const existingUser = users.find(
      (record) =>
        record.email.toLowerCase() === email.toLowerCase() &&
        record.password === password &&
        record.role === role
    );

    if (!existingUser) {
      return {
        success: false,
        message: 'Invalid credentials. Check your email, password, and role.',
      };
    }

    const sessionUser: UserInfo = {
      name: existingUser.name,
      email: existingUser.email,
      role: existingUser.role,
    };

    window.localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);

    return {
      success: true,
      message: `Welcome back, ${existingUser.name}!`,
    };
  };

  const signup = ({ name, email, password, role }: SignupData): AuthResult => {
    if (!name || !email || !password) {
      return {
        success: false,
        message: 'Please fill in every field to create your account.',
      };
    }

    const users = getStoredUsers();
    const duplicate = users.some(
      (record) => record.email.toLowerCase() === email.toLowerCase()
    );

    if (duplicate) {
      return {
        success: false,
        message: 'An account with that email already exists.',
      };
    }

    const newUser: SignupData = {
      name,
      email,
      password,
      role,
    };

    const updatedUsers = [...users, newUser];
    saveStoredUsers(updatedUsers);

    const sessionUser: UserInfo = {
      name,
      email,
      role,
    };

    window.localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);

    return {
      success: true,
      message: 'Your account was created successfully!',
    };
  };

  const logout = () => {
    window.localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: Boolean(user),
    loading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
