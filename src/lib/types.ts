export interface User {
  id: string;
  username: string;
  isOnline: boolean;
  lastSeen: Date;
}

export interface Message {
  id: string;
  userId: string;
  username: string;
  content: string;
  timestamp: Date;
}

export interface ChatRoom {
  id: string;
  name: string;
  messages: Message[];
  users: User[];
}