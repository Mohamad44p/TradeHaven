import SellForm from "@/components/form/Sellform";
import { Card } from "@/components/ui/card";
import db from "@/db/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";

async function getData(userId: string) {
  const data = await db.user.findUnique({
    where: {
      id: userId,
    },
  });
}

export default async function SellRoute() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    redirect("/api/auth/login");
  }
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 mb-14">
      <Card>
        <SellForm />
      </Card>
    </section>
  );
}
