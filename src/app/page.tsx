"use client"
import Image from "next/image";
import ContinentCon from "@/container/ContinentCon";
import StoreProvider from "@/providers/StoreProvider";

export default function Home() {
  return (
    <div className="p-4">
      {/* <StoreProvider> */}
      <ContinentCon />
      {/* </StoreProvider> */}
    </div>
  );
}
