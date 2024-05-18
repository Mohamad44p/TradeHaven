import { ReactNode } from "react";
import { CiGlobe } from "react-icons/ci";
import { IconType } from "react-icons/lib";
import { LuChefHat } from "react-icons/lu";
import { LuPartyPopper } from "react-icons/lu";

interface iAppProps {
  name: string;
  title: string;
  image: IconType;
  id: number;
}

export const categoryItems: iAppProps[] = [
  {
    id: 0,
    name: "template",
    title: "Template",
    image: CiGlobe,
  },
  {
    id: 1,
    name: "uikit",
    title: "Ui Kit",
    image: LuChefHat,
  },
  {
    id: 2,
    name: "icon",
    title: "Icon",
    image: LuPartyPopper,
  },
];
