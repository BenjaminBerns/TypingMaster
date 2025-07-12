import { useState, useEffect } from "react";

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/user", {
          credentials: "include",
        });

        if (!mounted) return;

        if (response.status === 401) {
          // User is not authenticated - this is normal
          setUser(null);
          setError(null);
        } else if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          setError(null);
        } else {
          throw new Error(`${response.status}: ${response.statusText}`);
        }
      } catch (err) {
        if (!mounted) return;
        setError(err as Error);
        setUser(null);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    checkAuth();

    return () => {
      mounted = false;
    };
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    error,
  };
}