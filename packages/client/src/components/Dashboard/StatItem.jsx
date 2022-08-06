import React from "react";

function StatItem({ icon, title, value }) {
  return (
    <div className="h-28 grid bg-neutral grid-cols-auto p-3 rounded-2xl shadow-xl hover:bg-gray-800 cursor-pointer">
      <span className="col-span-2 text-white text-xs sm:text-sm my-0 capitalize">
        {title}
      </span>
      <span className="text-white sm:text-4xl font-bold self-end truncate">
        {new Intl.NumberFormat("en-US", { notation: "compact" }).format(value)}
      </span>
      <div className="justify-self-end self-end">{icon}</div>
    </div>
  );
}

export default StatItem;
