// auth.ts

import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import type { Provider } from 'next-auth/providers';

const providers: Provider[] = [
  Credentials({
    credentials: {
      username: { label: 'Username', type: 'text' },
      password: { label: 'Password', type: 'password' },
    },
    authorize: async (c) => {
      if (
        c?.password === '@demo1' && 
        c?.username === 'toolpad-demo'
      ) {
        return {
          id: 'test',
          name: 'Toolpad Demo',
          email: 'toolpad-demo@mui.com',
        };
      }
      
      const response = await fetch(`${process.env.API_GATEWAY_URL}/auth/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: c?.username,
          password: c?.password,
        }),
      });

      const data = await response.json();
      console.log('Login response:', data);
      const { user, loginToken, expiresIn } = data;

      if (user) {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image || null,
          token: loginToken || null,
          expires: expiresIn || null,
          
        };
      }
      


      return null;
    },

  }),
];

export const providerMap = providers.map((provider) => {
  if (typeof provider === 'function') {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  }
  return { id: provider.id, name: provider.name };
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/auth/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = (user as any).image || null;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.image as string;
      }
      return session;
    },
  },
});

