"use client";
import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import LeaseCard from "@/components/LeaseCard";

export default function LeasesPage() {
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await api.get("/leases");
        setList(data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <main className="min-h-screen pt-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">
          Locais disponíveis para reserva
        </h1>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6)
              .fill(null)
              .map((_, i) => (
                <Skeleton key={i} className="w-full h-60 rounded-xl" />
              ))}
          </div>
        ) : list.length === 0 ? (
          <p className="text-zinc-400 text-center">
            Nenhum local encontrado.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((lease) => (
              <LeaseCard key={lease.id} lease={lease} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
