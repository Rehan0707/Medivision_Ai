import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                try {
                    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
                    const res = await fetch(`${apiBase}/api/auth/login`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password,
                        }),
                    });

                    const user = await res.json();

                    if (res.ok && user) {
                        // Check if doctor is approved
                        if (user.role === 'Doctor' && !user.isApproved) {
                            throw new Error("Account pending approval. Please contact administrator.");
                        }
                        return user;
                    }
                    throw new Error(user.message || "Invalid credentials");
                } catch (error: any) {
                    throw new Error(error.message || "Authentication failed");
                }
            }
        })
    ],
    pages: {
        signIn: "/auth",
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === 'google' && user?.email) {
                try {
                    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
                    const res = await fetch(`${apiBase}/api/auth/google`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email: user.email,
                            name: user.name,
                            image: user.image,
                        }),
                    });
                    const data = await res.json();
                    if (data.token) {
                        (user as any).accessToken = data.token;
                        (user as any).role = data.role || 'Patient';
                        (user as any).profile = data.profile;
                    }
                } catch (e) {
                    console.warn("Google auth sync failed:", e);
                }
            }
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role || 'Patient';
                token.status = (user as any).status || 'Approved';
                token.isApproved = (user as any).isApproved ?? true;
                token.profile = (user as any).profile;
                token.accessToken = (user as any).accessToken || (user as any).token;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).role = token.role;
                (session.user as any).status = token.status;
                (session.user as any).isApproved = token.isApproved;
                (session.user as any).profile = token.profile;
                (session.user as any).accessToken = token.accessToken;
            }
            return session;
        },
    },
};
