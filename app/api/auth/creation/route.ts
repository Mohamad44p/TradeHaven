import db from "@/db/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
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
    dbUser = await db.user.create({
      data: {
        id: user.id,
        firstName: user.given_name as string ?? "",
        lastName: user.family_name as string ?? "",
        email: user.email as string,
        profileImage: user.picture ?? `https://avatar.vercel.sh/${user.given_name}`,
      },
    });
  }

  revalidatePath("/api/auth/creation");
  revalidatePath("/");
  return NextResponse.redirect("http://localhost:3000");
}
