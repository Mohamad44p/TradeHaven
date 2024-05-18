"use server";
import db from "@/db/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { type CategoryTypes } from "@prisma/client";
import { z } from "zod";

export type State = {
  status: "error" | "success" | undefined;
  error?: {
    [key: string]: string[];
  };
  message?: string | null;
};
const productSchema = z.object({
  name: z.string().min(3, { message: "Name must be atleast 5 characters" }),
  category: z.string().min(1, { message: "Category is required" }),
  price: z.number().min(1, { message: "Price must be bigger than 1$" }),
  smallDescription: z
    .string()
    .min(10, { message: "Description must be AtLeast 10 characters" }),
  description: z.string().min(10, { message: "Description is required" }),
  images: z.array(z.string(), { message: "Images are required" }),
  productFile: z.string().min(1, { message: "Product file is required" }),
});

const userSettingsSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "Minimum length of 3 required" })
    .or(z.literal(""))
    .optional(),

  lastName: z
    .string()
    .min(3, { message: "Minimum length of 3 required" })
    .or(z.literal(""))
    .optional(),
});

export async function SellProduct(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    throw new Error("User not found");
  }

  const validateFields = productSchema.safeParse({
    name: formData.get("name") as string,
    category: formData.get("category") as string,
    price: Number(formData.get("price")),
    smallDescription: formData.get("smallDescription") as string,
    description: formData.get("description") as string,
    images: JSON.parse(formData.get("images") as string) as string[],
    productFile: formData.get("productFile") as string,
  });

  if (!validateFields.success) {
    const state: State = {
      status: "error",
      error: validateFields.error.flatten().fieldErrors,
      message: "Please fill the form correctly",
    };
    return state;
  }

  await db.product.create({
    data: {
      name: validateFields.data.name,
      category: validateFields.data.category as CategoryTypes,
      price: validateFields.data.price,
      smallDescription: validateFields.data.smallDescription,
      description: JSON.parse(validateFields.data.description),
      images: validateFields.data.images,
      productFile: validateFields.data.productFile,
      userId: user.id,
    },
  });

  const state: State = {
    status: "success",
    message: "Product created successfully!",
  };
  return state;
}

export async function UpdateUserSettings(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("something went wrong");
  }

  const validateFields = userSettingsSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
  });

  if (!validateFields.success) {
    const state: State = {
      status: "error",
      error: validateFields.error.flatten().fieldErrors,
      message: "Oops, I think there is a mistake with your inputs.",
    };

    return state;
  }

  const data = await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      firstName: validateFields.data.firstName,
      lastName: validateFields.data.lastName,
    },
  });

  const state: State = {
    status: "success",
    message: "Your Settings have been updated",
  };

  return state;
}
