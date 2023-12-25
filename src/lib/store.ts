import { Session } from 'next-auth';
import { create, StateCreator } from 'zustand';

interface SessionSlice {
  session: Session | null;
  setSession: (session: Session | null) => void;
}

interface UnseenFriendRequestsSlice {
  unseenFriendRequestsCount: number;
  setUnseenFriendRequestsCount: (unseenFriendRequests: number) => void;
}

const createSessionStore: StateCreator<SessionSlice> = (set) => ({
  session: null,
  setSession: (session) => set({ session }),
});

const createUnseenFriendRequestsStore: StateCreator<UnseenFriendRequestsSlice> = (set) => ({
  unseenFriendRequestsCount: 0,
  setUnseenFriendRequestsCount: (unseenFriendRequestsCount) => set({ unseenFriendRequestsCount: unseenFriendRequestsCount }),
});

// Bind Store Slices and export them as a combined store
export const useStore = create<SessionSlice & UnseenFriendRequestsSlice>((...args) => ({
  ...createSessionStore(...args),
  ...createUnseenFriendRequestsStore(...args),
}));
