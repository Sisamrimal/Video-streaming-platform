import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";

import bcrypt from "bcryptjs";

const handler = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "database" },

  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password)
          return null;

        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) return null;

        const valid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!valid) return null;

        return user;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
