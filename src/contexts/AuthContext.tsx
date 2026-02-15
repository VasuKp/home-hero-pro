import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { mockBookings, type Booking } from "@/data/mock-data";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  bookings: Booking[];
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  addBooking: (booking: Booking) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("homeserv_user");
    if (stored) {
      setUser(JSON.parse(stored));
      setBookings(mockBookings);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, _password: string) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const newUser: User = {
      id: "u1",
      name: email.split("@")[0],
      email,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    };
    setUser(newUser);
    setBookings(mockBookings);
    localStorage.setItem("homeserv_user", JSON.stringify(newUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    setBookings([]);
    localStorage.removeItem("homeserv_user");
  };

  const addBooking = (booking: Booking) => {
    setBookings((prev) => [booking, ...prev]);
  };

  return (
    <AuthContext.Provider value={{ user, bookings, isLoading, login, logout, addBooking }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
