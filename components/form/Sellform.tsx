"use client";

import { TipTapEditor } from "@/components/editor/Editor";
import { SelectCategory } from "@/components/sell/SelectCategory";
import Title from "@/components/shared/Title";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { JSONContent } from "@tiptap/react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useFormState } from "react-dom";
import { SellProduct, State } from "@/app/actions";
import { toast } from "sonner";
import { UploadDropzone } from "@/lib/uploadthing";
import { Submitbutton } from "../sell/SubmitButtons";
import { redirect } from "next/navigation";

export default function SellForm() {
  const initialState: State = {
    status: undefined,
    message: "",
  };
  const [state, formAction] = useFormState(SellProduct, initialState);
  const [json, setJson] = useState<null | JSONContent>(null);
  const [images, setImages] = useState<null | string[]>(null);
  const [productFile, setProductFile] = useState<null | string>(null);

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
      redirect("/");
    } else if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state.message, state.status]);

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8">
      <Card>
        <form action={formAction}>
          <CardHeader>
            <CardTitle>
              <div className="rotate-3 mt-5">
                <p className="text-3xl font-bold group-hover:text-green-400 transition-all">
                  Sell your Product
                </p>
                <div className="w-40 h-2 bg-slate-500 rounded-full "></div>
                <div className="w-40 h-2 bg-sky-500 rounded-full translate-x-2"></div>
              </div>
            </CardTitle>
            <CardDescription>
              Please describe your product in detail so that it can be sold.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-10">
            <div className="flex flex-col gap-y-2">
              <Label>Name</Label>
              <Input
                type="text"
                name="name"
                placeholder="Name of your Product"
                required
                minLength={3}
              />
              {state?.error?.["name"]?.[0] && (
                <p className="text-red-500">{state?.error?.["name"]?.[0]}</p>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Category</Label>
              <SelectCategory />
              {state?.error?.["category"]?.[0] && (
                <p className="text-red-500">
                  {state?.error?.["category"]?.[0]}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Price</Label>
              <Input
                type="number"
                name="price"
                placeholder="30$"
                required
                min={1}
              />
              {state?.error?.["price"]?.[0] && (
                <p className="text-red-500">{state?.error?.["price"]?.[0]}</p>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Small Summary</Label>
              <Textarea
                name="smallDescription"
                placeholder="Please describe your product shortly right here..."
                required
                minLength={1}
              />
              {state?.error?.["smallDescription"]?.[0] && (
                <p className="text-red-500">
                  {state?.error?.["smallDescription"]?.[0]}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <input
                type="hidden"
                name="description"
                value={JSON.stringify(json)}
              />
              <Label>Description</Label>
              <TipTapEditor json={json} setJson={setJson} />
              {state?.error?.["description"]?.[0] && (
                <p className="text-red-500">
                  {state?.error?.["description"]?.[0]}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <input
                type="hidden"
                name="images"
                value={JSON.stringify(images)}
              />
              <Label>Product Images</Label>
              <UploadDropzone
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  setImages(res.map((item) => item.url));
                  toast.success("Your images have been uploaded");
                }}
                onUploadError={(error: Error) => {
                  toast.error("Something went wrong, try again");
                }}
              />
              {state?.error?.["images"]?.[0] && (
                <p className="text-red-500">{state?.error?.["images"]?.[0]}</p>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <input
                type="hidden"
                name="productFile"
                value={productFile ?? ""}
              />
              <Label>Product File</Label>
              <UploadDropzone
                onClientUploadComplete={(res) => {
                  setProductFile(res[0].url);
                  toast.success("File uploaded successfully");
                }}
                endpoint="productFileUpload"
                onUploadError={(error: Error) => {
                  toast.error("Something went wrong, try again");
                }}
              />
              {state?.error?.["productFile"]?.[0] && (
                <p className="text-red-500">
                  {state?.error?.["productFile"]?.[0]}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="mt-5">
            <Submitbutton title="Crete your Product" />
          </CardFooter>
        </form>
      </Card>
    </section>
  );
}
