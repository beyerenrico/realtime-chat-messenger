import {UpstashRedisAdapter} from '@next-auth/upstash-redis-adapter';
import {NextAuthOptions} from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import {db} from '@/lib/db';
import {getEnvironmentVariable} from '@/lib/utils';

export const authOptions: NextAuthOptions = {
  adapter: UpstashRedisAdapter(db),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/signin',
  },
  providers: [
    GoogleProvider({
      clientId: getEnvironmentVariable('GOOGLE_CLIENT_ID'),
      clientSecret: getEnvironmentVariable('GOOGLE_CLIENT_SECRET'),
    })
  ],
  callbacks: {
    async jwt({token, user}) {
      const dbUser = await db.get(`user:${token.id}`) as User | null;

      if (!dbUser) {
        token.id = user.id;
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        image: dbUser.image,
      };
    },
    async session({session, token}) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },
    redirect() {
      return '/dashboard';
    }
  }
};
