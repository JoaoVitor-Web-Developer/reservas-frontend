"use client";

import { motion } from "framer-motion";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import Link from "next/link";
import { CalendarDays, ShieldCheck, MapPin } from "lucide-react";

export default function LandingPage() {
  return (
    <ParallaxProvider>
      <div className="w-screen h-auto min-h-screen bg-[#09090f] text-white overflow-x-hidden overflow-y-auto fixed inset-0 z-[9999]">
        
        <header className="fixed top-0 left-0 w-full z-50 bg-zinc-900/60 backdrop-blur-lg border-b border-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
          <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-extrabold tracking-tight">
              Reservas <span className="text-blue-500">Já</span>
            </h1>
            <nav className="flex items-center gap-4">
              <Link
                href="/leases"
                className="text-sm font-semibold text-gray-300 hover:text-blue-400 transition"
              >
                Locais
              </Link>
              <Link
                href="/login"
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-600 hover:opacity-90 rounded-lg text-sm font-semibold transition"
              >
                Entrar
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 border border-blue-500 text-blue-400 hover:bg-blue-600/10 rounded-lg text-sm font-semibold transition"
              >
                Registrar
              </Link>
            </nav>
          </div>
        </header>

        <section className="relative h-screen flex flex-col justify-center items-center text-center overflow-hidden">
          <AnimatedBackground />
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-indigo-500 to-blue-600 bg-clip-text text-transparent drop-shadow-lg"
          >
            Reserve. Gerencie. Inove.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-lg text-gray-300 mt-6 max-w-2xl"
          >
            Uma plataforma moderna e intuitiva para gerenciar suas locações com praticidade e sofisticação.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-10 flex gap-4"
          >
            <Link
              href="/register"
              className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-lg font-semibold hover:opacity-90 transition shadow-lg shadow-blue-600/20"
            >
              Começar Agora
            </Link>
            <Link
              href="/leases"
              className="px-8 py-3 border border-blue-500 rounded-lg font-semibold text-blue-400 hover:bg-blue-600/10 transition"
            >
              Ver Locais
            </Link>
          </motion.div>
        </section>

        <section className="relative h-screen flex flex-col justify-center items-center text-center bg-zinc-800/30 overflow-hidden">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-blue-400 mb-16"
          >
            Tudo o que você precisa
          </motion.h2>

          <div className="flex flex-col md:flex-row gap-10">
            <Feature
              icon={<CalendarDays className="w-12 h-12 text-blue-400" />}
              title="Reservas Rápidas"
              desc="Agende espaços em poucos cliques com feedback instantâneo."
            />
            <Feature
              icon={<MapPin className="w-12 h-12 text-blue-400" />}
              title="Locais Variados"
              desc="Salas, eventos e coworkings à sua disposição."
            />
            <Feature
              icon={<ShieldCheck className="w-12 h-12 text-blue-400" />}
              title="Segurança Total"
              desc="Gerencie suas reservas com autenticação segura e controle total."
            />
          </div>
        </section>

        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#09090f] to-[#111827]">
          <div className="absolute inset-0 z-0">
            <Parallax speed={-20}>
              <motion.div
                className="absolute w-96 h-96 rounded-full bg-blue-500/10 blur-3xl top-1/3 left-10"
                animate={{ y: [0, 40, 0] }}
                transition={{ repeat: Infinity, duration: 6 }}
              />
            </Parallax>

            <Parallax speed={15}>
              <motion.div
                className="absolute w-64 h-64 rounded-full bg-indigo-500/10 blur-2xl bottom-10 right-10"
                animate={{ y: [0, -30, 0] }}
                transition={{ repeat: Infinity, duration: 7 }}
              />
            </Parallax>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative z-10 text-center"
          >
            <h3 className="text-5xl font-bold bg-gradient-to-r from-indigo-500 to-blue-600 bg-clip-text text-transparent">
              Experiência Imersiva
            </h3>
            <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
              Movimentos sutis, animações elegantes e performance impecável —
              tudo para tornar sua jornada mais envolvente.
            </p>
          </motion.div>
        </section>

        <section className="relative h-screen flex flex-col justify-center items-center text-center bg-zinc-800/30">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-blue-400 mb-6"
          >
            Pronto para transformar suas reservas?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-300 mb-10 max-w-lg"
          >
            Crie uma conta gratuita e comece agora mesmo a organizar suas
            locações com praticidade e estilo.
          </motion.p>

          <Link
            href="/register"
            className="px-10 py-4 bg-gradient-to-r from-indigo-500 to-blue-600 hover:opacity-90 rounded-lg text-lg font-semibold shadow-lg shadow-blue-600/20 transition"
          >
            Criar Conta
          </Link>
        </section>
      </div>
    </ParallaxProvider>
  );
}

function Feature({
  icon,
  title,
  desc,
}: {
  icon: JSX.Element;
  title: string;
  desc: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-zinc-800/30 border border-white/10 p-8 rounded-xl backdrop-blur-md shadow-lg hover:shadow-blue-500/10 hover:scale-[1.02] transition transform max-w-sm"
    >
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-2xl font-semibold text-blue-400 mb-2">{title}</h3>
      <p className="text-gray-300 text-sm">{desc}</p>
    </motion.div>
  );
}

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#09090f]" />

      <motion.div
        className="absolute w-[200%] h-[200%] top-[-50%] left-[-50%]"
        animate={{
          background: [
            "radial-gradient(circle at 30% 30%, rgba(99,102,241,0.15), rgba(59,130,246,0.05), transparent 30%)",
            "radial-gradient(circle at 70% 40%, rgba(59,130,246,0.15), rgba(99,102,241,0.05), transparent 30%)",
            "radial-gradient(circle at 50% 70%, rgba(37,99,235,0.15), rgba(59,130,246,0.05), transparent 30%)",
            "radial-gradient(circle at 30% 30%, rgba(99,102,241,0.15), rgba(59,130,246,0.05), transparent 30%)",
          ],
        }}
        transition={{
          duration: 20,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute w-full h-full"
        animate={{
          background: [
            "radial-gradient(circle at 10% 80%, rgba(37,99,235,0.15), transparent 60%)",
            "radial-gradient(circle at 80% 20%, rgba(59,130,246,0.1), transparent 60%)",
            "radial-gradient(circle at 40% 50%, rgba(99,102,241,0.12), transparent 60%)",
            "radial-gradient(circle at 10% 80%, rgba(37,99,235,0.15), transparent 60%)",
          ],
        }}
        transition={{
          duration: 10,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        style={{
          filter: "blur(60px)",
          opacity: 0.1,
        }}
      />

      <motion.div
        className="absolute w-[150%] h-[150%] -top-[25%] -left-[25%] bg-[radial-gradient(circle,rgba(59,130,246,0.08),transparent_60%)]"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
