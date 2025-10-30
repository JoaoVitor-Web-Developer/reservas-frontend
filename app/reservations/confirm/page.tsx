"use client";

import { motion } from "framer-motion";
import { CheckCircle2, User } from "lucide-react";
import Link from "next/link";

export default function ConfirmPage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 flex items-center justify-center z-0"
      >
        <div className="w-[300px] h-[300px] bg-indigo-600 rounded-full blur-[120px]" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg bg-zinc-900/70 border border-zinc-800 rounded-2xl p-10 text-center shadow-2xl backdrop-blur-lg"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
          className="flex justify-center mb-6"
        >
          <CheckCircle2 className="text-green-500 w-20 h-20" />
        </motion.div>

        <h2 className="text-3xl font-bold mb-3 text-white">
          Reserva criada com sucesso!
        </h2>
        <p className="text-zinc-400 mb-8">
          Acompanhe suas reservas em{" "}
          <span className="text-indigo-400 font-semibold">Meu Perfil</span> ou
          continue explorando os locais disponíveis.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/profile"
            className="flex items-center justify-center cursor-pointer hover:scale-105 gap-2 bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 ease-in-out px-5 py-3 rounded-xl text-white font-medium"
          >
            <User size={18} />
            Meu Perfil
          </Link>

          <Link
            href="/leases"
            className="flex items-center justify-center cursor-pointer hover:scale-105 gap-2 bg-zinc-800 hover:bg-zinc-700 transition-all duration-300 ease-in-out px-5 py-3 rounded-xl text-zinc-300"
          >
            Explorar Locais
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
