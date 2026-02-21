import React from "react";

export default function Placeholder({ title }) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-gray-500 mt-2">This module is under development.</p>
    </div>
  );
}
