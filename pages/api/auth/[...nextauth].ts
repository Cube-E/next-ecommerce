import NextAuth, { NextAuthOptions }  from "next-auth"
import Providers from "next-auth/providers"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/util/prisma"
import Stripe from "stripe"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_URL,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  events: {
    // After a user signs in for the first time, link a Stripe id to their user object
    createUser: async ({ user }: any) => {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: '2022-11-15'
      })
      // Create a new customer object
      if(user.name && user.email) {
        const customer = await stripe.customers.create({
          email: user.email || undefined,
          name: user.name || undefined, 
        })
        // Update prisma user with stripe customer id
        await prisma.user.update({
          where: { id: user.id },
          data: { stripeCustomerId: customer.id }
        })
      }
    },
  },
  callbacks: {
    async session({ session, token, user }) {
      session.user = user
      return session
    }
  },
}

export default NextAuth(authOptions)