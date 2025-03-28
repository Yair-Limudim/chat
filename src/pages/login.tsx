import { LoginForm } from "@/components/login-form";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/lib/store";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export default function LoginPage() {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/chat");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <LoginForm />
    </div>
  );
}