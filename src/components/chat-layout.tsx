import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuthStore, useUIStore } from "@/lib/store";
import { MessageList } from "@/components/message-list";
import { MessageInput } from "@/components/message-input";
import { UsersList } from "@/components/users-list";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { LogOut, Menu, Users } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function ChatLayout() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="flex h-screen">
      {/* Desktop sidebar */}
      {!isMobile && (
        <div className="w-80 border-r bg-card">
          <UsersList />
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            {isMobile && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Users className="h-5 w-5" />
                    <span className="sr-only">Users</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-80">
                  <UsersList />
                </SheetContent>
              </Sheet>
            )}
            <h1 className="text-xl font-bold">Chat Room</h1>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Logout</span>
            </Button>
          </div>
        </header>

        {/* Chat area */}
        <MessageList />

        {/* Message input */}
        <MessageInput />
      </div>
    </div>
  );
}