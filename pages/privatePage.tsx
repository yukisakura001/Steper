import React from "react";
import dynamic from "next/dynamic";

const Private = dynamic(() => import("../components/Private"));

export default function privatePage() {
  return (
    <div>
      <Private />
    </div>
  );
}
