import React from "react";

export const Button = () => {
  return (
    <div>
      <div className="p-3 bg-blue-500">
        <button onClick={() => alert("button clicked")}>
          This is a button
        </button>
      </div>
    </div>
  );
};
