import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import type { Provider } from 'next-auth/providers';

const providers: Provider[] = [
  GitHub({
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
  }),
  Credentials({
    credentials: {
      username: { label: 'Username', type: 'text' },
      password: { label: 'Password', type: 'password' },
    },
    authorize: async (c) => {
      // Demo account fallback
      if (c?.username === 'toolpad-demo' && c?.password === '@demo1') {
        return {
          id: 'demo-id',
          name: 'Toolpad Demo',
          email: 'toolpad-demo@mui.com',
        };
      }

      // Custom login logic
      const response = await fetch(`http://localhost:5000/api/auth/login`, {
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
      const { user, loginToken } = data;

      if (user) {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image || null,
          token: loginToken,
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
  async jwt({ token, user, account, profile }) {
    // Nếu login bằng GitHub
    if (account?.provider === 'github' && profile) {
      const githubProfile = profile as {
        id: string;
        name?: string;
        login: string;
        email: string;
        avatar_url: string;
      };

      token.id = githubProfile.id;
      token.name = githubProfile.name || githubProfile.login;
      token.email = githubProfile.email;
      token.image = githubProfile.avatar_url;
    }


    // Nếu login bằng Credentials (tài khoản của bạn)
    if (user && account?.provider === 'credentials') {
      token.id = user.id;
      token.name = user.name;
      token.email = user.email;
      token.image = (user as any).image || null;
      token.token = (user as any).token || null;
      token.expires = (user as any).expires || null;
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

