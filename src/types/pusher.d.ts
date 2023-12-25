type IncomingFriendRequest = Omit<User, 'emailVerified'>;

type PendingFriendRequest = Omit<User, 'emailVerified'>;
