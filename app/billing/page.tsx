import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import db from "@/db/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { CreateStripeAccoutnLink, GetStripeDashboardLink } from "../actions";
import { Submitbutton } from "@/components/sell/SubmitButtons";
import { unstable_noStore as noStore } from "next/cache";

async function getData(userId: string) {
  const data = await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      stripeConnectedLinked: true,
    },
  });

  return data;
}

export default async function BillingRoute() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || !user.id || user === null) {
    redirect("/api/auth/login");
  }

  const data = await getData(user.id);
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8">
      <Card>
        <CardHeader>
          <CardTitle>Billing</CardTitle>
          <CardDescription>
            Find all your details regarding your payments
          </CardDescription>
        </CardHeader>
        <CardContent>
          {data?.stripeConnectedLinked === false && (
            <form action={CreateStripeAccoutnLink}>
              <Submitbutton title="Connect to Stripe" />
            </form>
          )}
          {data?.stripeConnectedLinked === true && (
            <form action={GetStripeDashboardLink}>
              <Submitbutton title="View Dashboard" />
            </form>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
