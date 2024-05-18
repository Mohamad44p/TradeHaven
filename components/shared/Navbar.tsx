import Link from "next/link";
import Title from "./Title";
import NavLinks from "./NavLinks";
import { Button } from "../ui/button";
import { ModeToggle } from "../theme/ModeToggle";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { UserNav } from "./UserNav";
import { MobileMenu } from "./MobileMenu";

export default async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <nav className="relative max-w-7xl flex md:grid md:grid-cols-12 items-center px-4 md:px-8 mx-auto py-7">
      <div className="md:col-span-3">
        <Link href="/">
          <Title text="TradeHaven" className="cursor-pointer" />
        </Link>
      </div>
      <NavLinks />

      <div className="md:flex hidden items-center gap-x-5 ms-auto md:col-span-3">
        {user ? (
          <>
            <UserNav
              email={user.email as string}
              name={user.given_name as string}
              userImage={
                user.picture ?? `https://avatar.vercel.sh/${user.given_name}`
              }
            />
            <ModeToggle />
          </>
        ) : (
          <div className="flex items-center gap-x-2">
            <Button asChild>
              <LoginLink>Login</LoginLink>
            </Button>
            <Button variant="secondary" asChild>
              <RegisterLink>Register</RegisterLink>
            </Button>
            <ModeToggle />
          </div>
        )}
      </div>
      <div className="md:hidden flex ms-auto">
        <MobileMenu />
      </div>
    </nav>
  );
}
