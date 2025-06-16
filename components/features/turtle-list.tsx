"use client";

import type { Turtle } from "@prisma/client";
import { useSelector } from "@/lib/redux";
import Link from "next/link";

function TurtleItem({ name, id }: Turtle) {
  const colors = [
    "bg-green-500/20 border border-green-500/50 text-green-700",
    "bg-blue-500/20 border border-blue-500/50 text-blue-700",
    "bg-red-500/20 border border-red-500/50 text-red-700",
    "bg-yellow-500/20 border border-yellow-500/50 text-yellow-700",
  ];

  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <li
      className={`${randomColor} flex w-full items-center justify-between rounded-lg p-2`}
    >
      {name}
      <Link
        href={`/${id}`}
        className="rounded-lg bg-white p-1 transition-colors hover:bg-gray-200"
      >
        Gidelim
      </Link>
    </li>
  );
}

export function TurtleList() {
  const { data, isLoading } = useSelector((state) => state.turtles);

  if (isLoading) {
    return (
      <div className="w-full rounded-lg border border-blue-500/50 bg-blue-500/20 p-2 text-blue-700">
        Kaplumbağalar yükleniyor...
      </div>
    );
  }

  if (!data || data.length == 0) {
    return (
      <div className="w-full rounded-lg border border-red-500/50 bg-red-500/20 p-2 text-red-700">
        Kaplumbağa bulunamadı.
      </div>
    );
  }

  return (
    <ul className="flex w-full flex-col items-start gap-2">
      {data.map((turtle) => (
        <TurtleItem key={turtle.id} {...turtle} />
      ))}
    </ul>
  );
}
