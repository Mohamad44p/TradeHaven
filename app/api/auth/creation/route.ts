import db from "@/db/db";
import { stripe } from "@/lib/stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import {unstable_noStore as noStore} from "next/cache"

export async function GET() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id || user === null) {
    throw new Error("Something went wrong");
  }

  let dbUser = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) {
    const account = await stripe.accounts.create({
      email: user.email as string,
      controller: {
        losses: {
          payments: "application",
        },
        fees: {
          payer: "application",
        },
        stripe_dashboard: {
          type: "express",
        },
      },
    });
    dbUser = await db.user.create({
      data: {
        id: user.id,
        firstName: (user.given_name as string) ?? "",
        lastName: (user.family_name as string) ?? "",
        email: user.email as string,
        profileImage:
          user.picture ?? `https://avatar.vercel.sh/${user.given_name}`,
        connectedAccountId: account.id,
      },
    });
  }

  revalidatePath("/api/auth/creation");
  revalidatePath("/");
  return NextResponse.redirect("http://localhost:3000");
}
