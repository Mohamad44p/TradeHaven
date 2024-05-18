"use client";

import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useFormState } from "react-dom";

import { useEffect } from "react";
import { toast } from "sonner";
import { type State, UpdateUserSettings } from "@/app/actions";
import { Submitbutton } from "../sell/SubmitButtons";
import Title from "../shared/Title";

interface iAppProps {
  firstName: string;
  lastName: string;
  email: string;
}

export function SettingsForm({ email, firstName, lastName }: iAppProps) {
  const initalState: State = { message: "", status: undefined };
  const [state, formAction] = useFormState(UpdateUserSettings, initalState);

  useEffect(() => {
    if (state?.status === "error") {
      toast.error(state.message);
    } else if (state?.status === "success") {
      toast.success(state.message);
    }
  }, [state]);
  return (
    <form action={formAction}>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>
          <p className="text-sm font-bold group-hover:text-green-400 transition-all">
            Here you will find settings regarding your account
          </p>
          <div className="w-40 h-2 bg-rose-600 rounded-full"></div>
          <div className="w-40 h-2 bg-indigo-200 rounded-full translate-x-2"></div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-5">
        <div className="flex flex-col gap-y-2">
          <Label>First Name</Label>
          <Input name="firstName" type="text" defaultValue={firstName} />
        </div>

        <div className="flex flex-col gap-y-2">
          <Label>Last Name</Label>
          <Input name="lastName" type="text" defaultValue={lastName} />
        </div>

        <div className="flex flex-col gap-y-2">
          <Label>Email</Label>
          <Input
            name="email"
            type="email"
            disabled
            defaultValue={email}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Submitbutton title="Update your settings" />
      </CardFooter>
    </form>
  );
}
