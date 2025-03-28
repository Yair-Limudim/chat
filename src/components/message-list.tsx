import { useEffect, useRef } from "react";
import { useChatStore, useAuthStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

export function MessageList() {
  const messages = useChatStore((state) => state.chatRoom.messages);
  const currentUser = useAuthStore((state) => state.user);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
      <div className="space-y-4">
        {messages.map((message) => {
          const isCurrentUser = currentUser?.id === message.userId;
          const isSystem = message.userId === "system";

          if (isSystem) {
            return (
              <div
                key={message.id}
                className="flex justify-center my-2"
              >
                <div className="bg-muted px-3 py-1 rounded-full text-xs text-muted-foreground">
                  {message.content}
                </div>
              </div>
            );
          }

          return (
            <div
              key={message.id}
              className={cn(
                "flex gap-3",
                isCurrentUser ? "justify-end" : "justify-start"
              )}
            >
              {!isCurrentUser && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {getInitials(message.username)}
                  </AvatarFallback>
                </Avatar>
              )}
              <div className="flex flex-col gap-1 max-w-[80%]">
                {!isCurrentUser && (
                  <span className="text-xs text-muted-foreground">
                    {message.username}
                  </span>
                )}
                <div
                  className={cn(
                    "rounded-lg px-4 py-2 text-sm",
                    isCurrentUser
                      ? "bg-primary text-primary-foreground ml-auto"
                      : "bg-secondary text-secondary-foreground"
                  )}
                >
                  {message.content}
                </div>
                <span
                  className={cn(
                    "text-xs text-muted-foreground",
                    isCurrentUser ? "text-right" : "text-left"
                  )}
                >
                  {format(new Date(message.timestamp), "HH:mm")}
                </span>
              </div>
              {isCurrentUser && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {getInitials(message.username)}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          );
        })}
        <div ref={endOfMessagesRef} />
      </div>
    </ScrollArea>
  );
}