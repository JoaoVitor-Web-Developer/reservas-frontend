"use client";
import Link from "next/link";

export default function LeaseCard({ lease }: { lease: any }) {
  const isAvailable = lease.available ?? true;
  return (
    <div className="bg-zinc-800/30 border border-zinc-800 rounded-xl shadow-md overflow-hidden hover:scale-[1.02] transition-all">
      <img
        src={lease.images?.[0] ?? "https://picsum.photos/600/400"}
        alt={lease.name}
        className="w-full h-44 object-cover"
      />
      <div className="p-4 flex flex-col justify-between h-[calc(100%-11rem)]">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">
            {lease.name}
          </h3>
          <p className="text-sm text-zinc-400 line-clamp-2 mb-2">
            {lease.description}
          </p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span
            className={`text-sm font-semibold ${
              isAvailable ? "text-green-400" : "text-red-400"
            }`}
          >
            {isAvailable ? "Disponível" : "Indisponível"}
          </span>
          <Link
            href={`/leases/${lease.id}`}
            className="text-indigo-400 hover:text-indigo-300 text-sm font-medium"
          >
            Ver detalhes →
          </Link>
        </div>
      </div>
    </div>
  );
}
