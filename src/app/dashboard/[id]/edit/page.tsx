"use client";
import Details from "@/components/Dashboard/Home/Details";
import { useParams } from "next/navigation";
import React from "react";



const Page = () => {
  const router = useParams();
  const { id } = router;

  console.log("params", id);

  return (
    <div>
      <Details selectId={id as string} />
    </div>
  );
};

export default Page;