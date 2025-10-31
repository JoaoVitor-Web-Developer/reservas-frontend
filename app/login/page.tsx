"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import { api } from "../../lib/api";
import { useAuth } from "../../lib/auth";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Validação dinâmica
  const validateField = (field: string, value: string) => {
    if (field === "email") {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      setErrors((prev) => ({
        ...prev,
        email: isValidEmail ? "" : "Insira um email válido.",
      }));
    }

    if (field === "password") {
      setErrors((prev) => ({
        ...prev,
        password:
          value.length < 8
            ? "A senha deve conter pelo menos 8 caracteres."
            : "",
      }));
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    validateField("email", value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    validateField("password", value);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || errors.email) {
      toast.error("Por favor, insira um email válido.");
      return;
    }
    if (!password || errors.password) {
      toast.error("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    setLoading(true);
    try {
      const data: any = await api.post("/auth/login", { email, password });

      if (!data || !data.token) {
        throw new Error("Resposta inválida do backend: token ausente");
      }

      login(data.token, data.user);
      toast.success("Login realizado com sucesso!");
      setTimeout(() => router.push("/leases"), 800);
    } catch (error: any) {
      toast.error("Erro ao fazer login!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-zinc-800/30 border border-zinc-700 rounded-2xl p-8 backdrop-blur-lg shadow-2xl relative z-10"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-linear-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent">
            Bem-vindo de volta
          </h1>
          <p className="text-zinc-400 text-sm mt-2">
            Entre para continuar suas reservas
          </p>
        </div>

        <form onSubmit={submit} className="space-y-5 mt-8">
          <div>
            <Label htmlFor="email" className="text-zinc-300 mb-3">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Digite seu email"
              className={`bg-zinc-800 border text-white focus-visible:ring-indigo-500 ${
                errors.email ? "border-red-500" : "border-zinc-700"
              }`}
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <Label htmlFor="password" className="text-zinc-300 mb-3">
              Senha
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              className={`bg-zinc-800 border text-white focus-visible:ring-indigo-500 ${
                errors.password ? "border-red-500" : "border-zinc-700"
              }`}
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition-all font-medium shadow-lg shadow-indigo-600/20"
          >
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        <p className="text-center text-sm text-zinc-500 mt-6">
          Ainda não tem uma conta?{" "}
          <a
            href="/register"
            className="text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Cadastre-se
          </a>
        </p>
      </motion.div>
    </div>
  );
}
