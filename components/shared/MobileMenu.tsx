"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { navItems } from "./NavLinks";
import { UserNav } from "./UserNav";
import { ModeToggle } from "../theme/ModeToggle";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export function MobileMenu() {
  const location = usePathname();
  const { getUser } = useKindeBrowserClient();
  const user = getUser();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="mt-5 flex px-2 space-y-1 flex-col">
          {navItems.map((item: any) => (
            <Link
              href={item.href}
              key={item.id}
              className={cn(
                location === item.href
                  ? "bg-muted"
                  : "hover:bg-muted hover:bg-opacity-75",
                "group flex items-center px-2 py-2 font-medium rounded-md"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex flex-col my-4 gap-y-5 ml-5 ms-auto">
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
      </SheetContent>
    </Sheet>
  );
}
