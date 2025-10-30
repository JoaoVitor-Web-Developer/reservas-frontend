"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, User, Phone, Mail, Calendar, Edit, X, Clock, MapPin } from "@deemlol/next-icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [reservations, setReservations] = useState<any[]>([]);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [p, r] = await Promise.all([
          api.get("/client/me"),
          api.get("/reservations/my-reservations"),
        ]);
        setProfile(p);
        setReservations(r);
        setForm({ name: p.name, email: p.email, phone: p.phone });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updated = await api.put("/client/me", form);
      setProfile(updated);
      setEditing(false);
    } catch (err: any) {
      alert(err?.body?.message || err.message || "Erro ao atualizar");
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "PENDING":
        return "Pendente";
      case "CONFIRMED":
        return "Confirmada";
      case "CANCELED":
        return "Cancelada";
      case "COMPLETED":
        return "Concluída";
      default:
        return status;
    }
  };

  const handleCancel = async (id: string) => {
    if (!confirm("Deseja realmente cancelar esta reserva?")) return;

    try {
      await api.del(`/reservations/${id}/cancel`);
      setReservations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: "CANCELED" } : r))
      );
    } catch (err: any) {
      alert(err?.body?.message || "Erro ao cancelar a reserva");
    }
  };

  const handleConfirm = async (id: string) => {
    if (!confirm("Deseja confirmar esta reserva?")) return;

    try {
      await api.post(`/reservations/${id}/confirm`, {});
      setReservations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: "CONFIRMED" } : r))
      );
    } catch (err: any) {
      alert(err?.body?.message || "Erro ao confirmar a reserva");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-zinc-400">
        Carregando perfil...
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full text-white px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl bg-zinc-800/30 border border-zinc-800 rounded-2xl p-8 shadow-2xl backdrop-blur-lg"
      >
        {/* HEADER DO PERFIL */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-2xl font-bold">
              {profile.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-3xl font-bold">{profile.name}</h2>
              <p className="text-zinc-400 text-sm">{profile.email}</p>
            </div>
          </div>

          <Button
            onClick={() => setEditing(!editing)}
            variant="outline"
            className="mt-4 sm:mt-0 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700 cursor-pointer hover:text-white hover:scale-105 transition-all duration-300 ease-in-out"
          >
            {editing ? (
              <>
                <X size={16} className="mr-2" /> Cancelar
              </>
            ) : (
              <>
                <Edit size={16} className="mr-2" /> Editar Perfil
              </>
            )}
          </Button>
        </div>

        {/* SEÇÃO DE PERFIL E RESERVAS */}
        <AnimatePresence mode="wait">
          {!editing ? (
            <motion.div
              key="view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 bg-zinc-800/50 p-3 rounded-xl">
                  <Phone className="text-indigo-400 w-5 h-5" />
                  <p>{profile.phone || "Não informado"}</p>
                </div>
                <div className="flex items-center gap-3 bg-zinc-800/50 p-3 rounded-xl">
                  <Mail className="text-indigo-400 w-5 h-5" />
                  <p>{profile.email}</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-indigo-400" />
                  Minhas Reservas
                </h3>

                {reservations.length ? (
                  <div className="grid gap-5 sm:grid-cols-2">
                    {reservations.map((r) => (
                      <motion.div
                        key={r.id}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                        className="p-5 bg-zinc-800/50 border border-zinc-700 rounded-xl transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-lg text-white">
                              {r.leases?.name}
                            </h4>
                            <span
                              className={`text-xs px-2 py-1 rounded-full font-medium ${
                                r.status === "CONFIRMED"
                                  ? "bg-green-500/20 text-green-400"
                                  : r.status === "PENDING"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : r.status === "CANCELED"
                                  ? "bg-red-500/20 text-red-400"
                                  : "bg-blue-500/20 text-blue-400"
                              }`}
                            >
                              {getStatusLabel(r.status)}
                            </span>
                          </div>

                          <p className="text-sm text-zinc-400 mt-1 flex items-center gap-1">
                            <MapPin className="w-4 h-4 text-indigo-400" />
                            {r.leases?.type === "BEACH_HOUSE"
                              ? "Casa de praia"
                              : r.leases?.type}
                          </p>

                          <div className="text-sm mt-3 space-y-1 text-zinc-300">
                            <p>
                              <Clock className="w-4 h-4 inline text-indigo-400 mr-1" />
                              Início:{" "}
                              <span className="text-white">
                                {new Date(r.startDate).toLocaleString()}
                              </span>
                            </p>
                            <p>
                              <Clock className="w-4 h-4 inline text-indigo-400 mr-1" />
                              Fim:{" "}
                              <span className="text-white">
                                {new Date(r.endDate).toLocaleString()}
                              </span>
                            </p>
                            <p className="mt-2">
                              💰 Valor total:{" "}
                              <span className="text-green-400 font-semibold">
                                R$ {r.totalValue.toFixed(2)}
                              </span>
                            </p>
                          </div>
                        </div>

                        {r.status === "PENDING" && (
                          <div className="flex justify-between mt-5">
                            <Button
                              onClick={() => handleConfirm(r.id)}
                              className="flex-1 mr-2 bg-green-600 hover:bg-green-700 text-white transition-all duration-200 hover:scale-105"
                            >
                              <CheckCircle size={16} className="mr-2" />{" "}
                              Confirmar
                            </Button>
                            <Button
                              onClick={() => handleCancel(r.id)}
                              variant="destructive"
                              className="flex-1 ml-2 bg-red-600 hover:bg-red-700 text-white transition-all duration-200 hover:scale-105"
                            >
                              <X size={16} className="mr-2" /> Cancelar
                            </Button>
                          </div>
                        )}

                        {r.status === "CONFIRMED" && (
                          <div className="text-center mt-5 text-green-400 text-sm">
                            ✅ Reserva Confirmada
                          </div>
                        )}

                        {r.status === "CANCELED" && (
                          <div className="text-center mt-5 text-red-400 text-sm">
                            ❌ Reserva Cancelada
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-zinc-400 text-sm">
                    Nenhuma reserva feita ainda.
                  </p>
                )}
              </div>
            </motion.div>
          ) : (
            /* FORMULÁRIO DE EDIÇÃO */
            <motion.form
              key="edit"
              onSubmit={save}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label className="mb-3">Nome</Label>
                  <Input
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    className="bg-zinc-800 border border-zinc-700 text-white"
                  />
                </div>
                <div>
                  <Label className="mb-3">Email</Label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="bg-zinc-800 border border-zinc-700 text-white"
                  />
                </div>
              </div>
              <div>
                <Label className="mb-3">Telefone</Label>
                <Input
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                  className="bg-zinc-800 border border-zinc-700 text-white"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button
                  type="button"
                  onClick={() => setEditing(false)}
                  variant="outline"
                  className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-zinc-200 cursor-pointer hover:text-white hover:scale-105 transition-all duration-300"
                >
                  <X size={16} className="mr-2" /> Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 cursor-pointer text-white flex items-center gap-1 hover:text-white hover:scale-105 transition-all duration-300"
                >
                  <CheckCircle size={16} />
                  Salvar
                </Button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
