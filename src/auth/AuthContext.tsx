import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export type DemoRole = "instructor" | "student";

const STORAGE_KEY = "mudrek_demo_role";

function readStoredRole(): DemoRole | null {
  try {
    const v = sessionStorage.getItem(STORAGE_KEY);
    if (v === "instructor" || v === "student") return v;
  } catch {
    /* ignore */
  }
  return null;
}

type AuthContextValue = {
  role: DemoRole | null;
  loginAsInstructor: () => void;
  loginAsStudent: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<DemoRole | null>(() => readStoredRole());

  const persist = useCallback((r: DemoRole | null) => {
    try {
      if (r) sessionStorage.setItem(STORAGE_KEY, r);
      else sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setRole(r);
  }, []);

  const loginAsInstructor = useCallback(() => persist("instructor"), [persist]);
  const loginAsStudent = useCallback(() => persist("student"), [persist]);
  const logout = useCallback(() => persist(null), [persist]);

  const value = useMemo(
    () => ({ role, loginAsInstructor, loginAsStudent, logout }),
    [role, loginAsInstructor, loginAsStudent, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth يجب أن يُستخدَم داخل AuthProvider");
  }
  return ctx;
}
