"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { toast } from "react-toastify";
import { api } from "../../lib/api";
import { ArrowRightCircle, ArrowLeftCircle } from "@deemlol/next-icons";

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    cpf: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const onChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));

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

  const nextStep = () => {
    if (!form.email || errors.email) {
      toast.error("Por favor, insira um email válido.");
      return;
    }
    if (!form.password || errors.password) {
      toast.error("A senha deve ter pelo menos 8 caracteres.");
      return;
    }
    setStep(2);
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/register", form);
      toast.success("Cadastro realizado com sucesso!");
      router.push("/login");
    } catch (error) {
      toast.error("Erro ao realizar registro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md bg-zinc-800/30 border border-zinc-700 rounded-2xl p-8 backdrop-blur-lg shadow-2xl">
        <Progress
          value={step === 1 ? 50 : 100}
          className="mb-6 h-2 bg-zinc-700"
        />

        <h1 className="text-3xl font-bold text-left mb-6 bg-gradient-to-r from-indigo-500 to-blue-600 bg-clip-text text-transparent">
          Criar Conta
        </h1>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.form
              key="step1"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.4 }}
              onSubmit={(e) => {
                e.preventDefault();
                nextStep();
              }}
              className="space-y-5"
            >
              <div>
                <Label htmlFor="email" className="text-zinc-300 mb-3">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Digite seu email"
                  value={form.email}
                  onChange={(e) => onChange("email", e.target.value)}
                  className={`bg-zinc-800 border text-white ${
                    errors.email ? "border-red-500" : "border-zinc-700"
                  }`}
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
                  value={form.password}
                  onChange={(e) => onChange("password", e.target.value)}
                  className={`bg-zinc-800 border text-white ${
                    errors.password ? "border-red-500" : "border-zinc-700"
                  }`}
                />
                {errors.password && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.password}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white mt-6 cursor-pointer"
              >
                Próximo <ArrowRightCircle size={24} color="#FFFFFF" />
              </Button>
            </motion.form>
          )}

          {step === 2 && (
            <motion.form
              key="step2"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              onSubmit={submit}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="name" className="text-zinc-300 mb-3">
                  Nome completo
                </Label>
                <Input
                  id="name"
                  placeholder="Digite seu nome completo"
                  value={form.name}
                  onChange={(e) => onChange("name", e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>

              <div>
                <Label htmlFor="cpf" className="text-zinc-300 mb-3">
                  CPF
                </Label>
                <Input
                  id="cpf"
                  placeholder="Digite seu CPF"
                  value={form.cpf}
                  onChange={(e) => onChange("cpf", e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-zinc-300 mb-3">
                  Telefone
                </Label>
                <Input
                  id="phone"
                  placeholder="Digite seu telefone"
                  value={form.phone}
                  onChange={(e) => onChange("phone", e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>

              <div className="flex justify-between items-center">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="border-zinc-600 text-zinc-300 bg-indigo-600 hover:bg-indigo-800 hover:text-zinc-300 cursor-pointer"
                >
                  Voltar <ArrowLeftCircle size={24} color="#FFFFFF" />
                </Button>

                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                >
                  {loading ? "Registrando..." : "Registrar"}
                </Button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        <div className="flex justify-center items-center gap-2 mt-6">
          {[1, 2].map((i) => (
            <div
              key={i}
              className={`h-2 w-8 rounded-full transition-all ${
                step >= i ? "bg-indigo-500" : "bg-zinc-700"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
