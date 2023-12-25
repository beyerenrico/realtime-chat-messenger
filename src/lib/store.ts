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

interface FriendsSlice {
  friends: Omit<User, 'emailVerified'>[];
  setFriends: (friends: Omit<User, 'emailVerified'>[]) => void;
}

const createSessionStore: StateCreator<SessionSlice> = (set) => ({
  session: null,
  setSession: (session) => set({ session }),
});

const createUnseenFriendRequestsStore: StateCreator<UnseenFriendRequestsSlice> = (set) => ({
  unseenFriendRequestsCount: 0,
  setUnseenFriendRequestsCount: (unseenFriendRequestsCount) => set({ unseenFriendRequestsCount: unseenFriendRequestsCount }),
});

const createFriendsStore: StateCreator<FriendsSlice> = (set) => ({
  friends: [],
  setFriends: (friends) => set({ friends }),
});

// Bind Store Slices and export them as a combined store
export const useStore = create<SessionSlice & UnseenFriendRequestsSlice & FriendsSlice>((...args) => ({
  ...createSessionStore(...args),
  ...createUnseenFriendRequestsStore(...args),
  ...createFriendsStore(...args),
}));
