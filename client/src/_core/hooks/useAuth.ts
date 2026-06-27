import { useEffect, useState } from 'react';

export type AuthUser = {
  id: number;
  openId: string;
  name: string | null;
  email: string | null;
  role: string;
};

type AuthState = {
  user: AuthUser | null;
  loading: boolean;
};

export function useAuth(): AuthState & { logout: () => Promise<void> } {
  const [state, setState] = useState<AuthState>({ user: null, loading: true });

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => {
        if (res.ok) return res.json();
        return null;
      })
      .then((data) => {
        setState({ user: data?.user ?? null, loading: false });
      })
      .catch(() => {
        setState({ user: null, loading: false });
      });
  }, []);

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setState({ user: null, loading: false });
    window.location.href = '/';
  };

  return { ...state, logout };
}
