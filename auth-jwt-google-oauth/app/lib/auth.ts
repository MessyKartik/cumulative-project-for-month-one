import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { connectDB } from './mongodb';

import { generateToken } from './jwt';
import User from './models/User';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        await connectDB();
        
        // Check if user exists
        let dbUser = await User.findOne({ email: user.email });
        
        if (!dbUser) {
          // Create new user
          dbUser = await User.create({
            name: user.name,
            email: user.email,
            googleId: account.providerAccountId,
          });
        }
        
        return true;
      }
      return true;
    },
    async jwt({ token, account, user }) {
      if (account && user) {
        await connectDB();
        const dbUser = await User.findOne({ email: user.email });
        
        if (dbUser) {
          token.userId = dbUser._id.toString();
          token.customJWT = generateToken({
            userId: dbUser._id.toString(),
            email: dbUser.email,
          });
        }
        
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.userId;
        (session as any).accessToken = token.accessToken;
        (session as any).customJWT = token.customJWT;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};