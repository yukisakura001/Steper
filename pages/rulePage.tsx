import React from "react";
import dynamic from "next/dynamic";

const Rule = dynamic(() => import("../components/Rule"));

export default function rulePage() {
  return (
    <div>
      <Rule />
    </div>
  );
}
