import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // 1. Get the user from the database
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        // 2. If no user or invalid password, return null
        if (!user || !user.passwordHash) return null;

        const isValid = await bcrypt.compare(
          credentials!.password,
          user.passwordHash
        );

        if (!isValid) return null;

        // 3. Return only fields you want in the JWT/session
        return {
          id: user.id,
          email: user.email,
          username: user.username,
        };
      },
    }),
  ],

  // Store user info in JWT token
  session: { strategy: 'jwt' },

  callbacks: {
    // Add user ID to the token
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    // Add token ID to session.user
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };