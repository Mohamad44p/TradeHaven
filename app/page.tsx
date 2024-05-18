import { ProductRow } from "@/components/sell/ProductRow";
import Image from "next/image";

export default function Home() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="max-w-3xl mx-auto text-2xl sm:text-5xl lg:text-6xl font-semibold text-center">
        <h1>Find the Best Tailwind</h1>
        <h1 className="text-green-500">Templates & Icons</h1>
        <div className="w-full h-2 dark:bg-white bg-black rounded-full"></div>
        <div className="w-full h-2 bg-teal-500 rounded-full translate-x-2"></div>
        <p className="lg:text-lg text-muted-foreground mx-auto mt-5 w-[90%] font-normal text-base">
          Welcome to TradeHaven, a marketplace where users can sell products,
          templates, UI kits, and icons stands out as the premier marketplace
          for all things related to tailwindcss, offering an unparalleled
          platform for both sellers and buyers alike.
        </p>
      </div>
      <ProductRow category="newest" />
      <ProductRow category="templates" />
      <ProductRow category="icons" />
      <ProductRow category="uikits" />
    </section>
  );
}
