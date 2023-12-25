type User = {
  name: string;
  email: string;
  image: string;
  id: string;
  emailVerified: string | null;
}

type Chat = {
  id: string;
  messages: Message[];
}

type Message = {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  createdAt: number;
  seen: boolean;
}

type ChatRequest = {
  id: string;
  senderId: string;
  recipientId: string;
}
