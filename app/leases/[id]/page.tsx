"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import LeaseGallery from "@/components/LeaseGallery";
import { Calendar, Clock, MapPin, Star } from "lucide-react";

export default function LeaseDetail() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const { user } = useAuth();

  const [lease, setLease] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const data = await api.get(`/leases/${id}`);
        setLease(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const reserve = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("Faça login para reservar");
      return;
    }
    try {
      await api.post("/reservations", {
        leaseId: id,
        startDate: start,
        endDate: end,
      });
      router.push("/reservations/confirm");
    } catch (err: any) {
      alert(err?.body?.message || err.message || "Erro ao reservar");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-zinc-400">
        Carregando informações...
      </div>
    );

  if (!lease)
    return (
      <div className="flex items-center justify-center h-screen text-zinc-400">
        Local não encontrado
      </div>
    );

  return (
    <div className="flex flex-col md:grid md:grid-cols-3 gap-8 px-4 py-12 max-w-7xl mx-auto text-zinc-100">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="md:col-span-2 space-y-6"
      >
        <div className="overflow-hidden rounded-2xl border border-zinc-800 shadow-2xl">
          <LeaseGallery
            images={
              lease.images ?? [
                "https://picsum.photos/seed/1/800/400",
                "https://picsum.photos/seed/2/800/400",
                "https://picsum.photos/seed/3/800/400",
              ]
            }
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{lease.name}</h1>
          <div className="flex flex-wrap items-center gap-4 text-zinc-400 text-sm">
            <div className="flex items-center gap-1">
              <MapPin size={16} />
              <span>{lease.location ?? "Localização não informada"}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>Disponível: {lease.available ? "Sim" : "Não"}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star size={16} className="text-yellow-400" />
              <span>4.9 (128 avaliações)</span>
            </div>
          </div>

          <p className="text-zinc-400 leading-relaxed mt-2">
            {lease.description || "Sem descrição disponível."}
          </p>

          <div className="mt-4 text-sm text-zinc-400 space-y-2">
            <div>
              Valor por hora:{" "}
              <span className="text-green-700 font-bold">
                R$ {lease.hourValue?.toFixed?.(2) ?? lease.hourValue}
              </span>
            </div>
            <div>
              Tempo mínimo:{" "}
              <span className="text-zinc-300 font-medium">{lease.minTime} hora{lease.minTime > 1 && "s"}</span>
            </div>
            <div>
              Tempo máximo:{" "}
              <span className="text-zinc-300 font-medium">{lease.maxTime} hora{lease.maxTime > 1 && "s"}</span>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.aside
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-zinc-900/70 border border-zinc-800 p-6 rounded-2xl backdrop-blur-xl shadow-2xl h-fit"
      >
        <h3 className="text-xl font-semibold mb-4">Fazer Reserva</h3>

        <form onSubmit={reserve} className="space-y-5">
          <div>
            <label className="block text-sm text-zinc-400 mb-2">
              Data e hora de início
            </label>
            <input
              type="datetime-local"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl p-2 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-2">
              Data e hora de término
            </label>
            <input
              type="datetime-local"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl p-2 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 hover:scale-105 font-medium text-white transition-all duration-300 ease-in-out cursor-pointer"
          >
            Reservar agora
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-zinc-500">
          * Cancele gratuitamente até 24h antes da reserva.
        </div>
      </motion.aside>
    </div>
  );
}
