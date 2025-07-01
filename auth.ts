import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { compareSync } from "bcrypt-ts";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  // Hardcoded secret
  secret: "my_super_secret_key_123456",
  providers: [
    Google,

    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !compareSync(password, user.password)) {
          return null;
        }

        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const ProtectedRoutes = [
        "/financial-advisor",
        "/financial-advisor/clients",
        "/financial-advisor/financial-check",
        "/financial-advisor/services",
        "/financial-check",
      ];

      if (!isLoggedIn && ProtectedRoutes.includes(nextUrl.pathname)) {
        return Response.redirect(new URL("/login", nextUrl));
      }
      if (isLoggedIn && nextUrl.pathname.startsWith("/login")) {
        return Response.redirect(new URL("/", nextUrl));
      }
      if (isLoggedIn && nextUrl.pathname.startsWith("/signup")) {
        return Response.redirect(new URL("/", nextUrl));
      }

      return true;
    },
    jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    session({ session, token }: { session: any; token: any }) {
      session.user.id = token.sub;
      session.user.role = token.role;
      return session;
    },
    
  },
  pages: {
    signIn: "/login",
  },
  
});
