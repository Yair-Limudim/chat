import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import type { User, Message, ChatRoom } from "./types";

// Auth Store
interface AuthState {
  user: User | null;
  login: (username: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (username: string) => {
    const user: User = {
      id: uuidv4(),
      username,
      isOnline: true,
      lastSeen: new Date(),
    };
    set({ user });
    useChatStore.getState().addUser(user);
  },
  logout: () => {
    const user = useAuthStore.getState().user;
    if (user) {
      useChatStore.getState().removeUser(user.id);
    }
    set({ user: null });
  },
}));

// Chat Store
interface ChatState {
  chatRoom: ChatRoom;
  addMessage: (content: string) => void;
  addUser: (user: User) => void;
  removeUser: (userId: string) => void;
}

// Mock initial data
const initialChatRoom: ChatRoom = {
  id: "main",
  name: "Main Room",
  messages: [
    {
      id: uuidv4(),
      userId: "system",
      username: "System",
      content: "Welcome to the chat room!",
      timestamp: new Date(),
    },
  ],
  users: [],
};

export const useChatStore = create<ChatState>((set, get) => ({
  chatRoom: initialChatRoom,
  addMessage: (content: string) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    const newMessage: Message = {
      id: uuidv4(),
      userId: user.id,
      username: user.username,
      content,
      timestamp: new Date(),
    };

    set((state) => ({
      chatRoom: {
        ...state.chatRoom,
        messages: [...state.chatRoom.messages, newMessage],
      },
    }));
  },
  addUser: (user: User) => {
    set((state) => {
      // Check if user already exists
      const existingUserIndex = state.chatRoom.users.findIndex(
        (u) => u.id === user.id
      );

      let updatedUsers = [...state.chatRoom.users];
      
      if (existingUserIndex >= 0) {
        // Update existing user
        updatedUsers[existingUserIndex] = {
          ...updatedUsers[existingUserIndex],
          isOnline: true,
          lastSeen: new Date(),
        };
      } else {
        // Add new user
        updatedUsers = [...updatedUsers, user];
        
        // Add system message for new user
        const systemMessage: Message = {
          id: uuidv4(),
          userId: "system",
          username: "System",
          content: `${user.username} has joined the chat`,
          timestamp: new Date(),
        };
        
        return {
          chatRoom: {
            ...state.chatRoom,
            users: updatedUsers,
            messages: [...state.chatRoom.messages, systemMessage],
          },
        };
      }
      
      return {
        chatRoom: {
          ...state.chatRoom,
          users: updatedUsers,
        },
      };
    });
  },
  removeUser: (userId: string) => {
    set((state) => {
      const user = state.chatRoom.users.find((u) => u.id === userId);
      if (!user) return state;

      // Mark user as offline instead of removing
      const updatedUsers = state.chatRoom.users.map((u) =>
        u.id === userId ? { ...u, isOnline: false, lastSeen: new Date() } : u
      );

      // Add system message for user leaving
      const systemMessage: Message = {
        id: uuidv4(),
        userId: "system",
        username: "System",
        content: `${user.username} has left the chat`,
        timestamp: new Date(),
      };

      return {
        chatRoom: {
          ...state.chatRoom,
          users: updatedUsers,
          messages: [...state.chatRoom.messages, systemMessage],
        },
      };
    });
  },
}));

// UI Store
interface UIState {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: false,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));