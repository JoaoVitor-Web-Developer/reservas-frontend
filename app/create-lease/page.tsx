"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeftCircle, ArrowRightCircle, Image } from "@deemlol/next-icons";

export default function CreateLeaseStepByStep() {
  const router = useRouter();
  const { user } = useAuth();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    hourValue: "50.00",
    minTime: 1,
    maxTime: 8,
    type: "",
    images: "",
  });

  const onChange = (k: string, v: any) => setForm((s) => ({ ...s, [k]: v }));

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const submit = async () => {
    if (!user) return toast.error("Faça login para criar uma locação.");
    try {
      setLoading(true);
      const images = form.images.split(",").map((s) => s.trim()).filter(Boolean);
      const payload = { ...form, hourValue: parseFloat(form.hourValue), images };
      await api.post("/leases", payload);
      toast.success("Local criado com sucesso!");
      setTimeout(() => router.push("/leases"), 1000);
    } catch (e: any) {
      toast.error("Erro ao criar locação");
    } finally {
      setLoading(false);
    }
  };

  const stepTitles = [
    "Informações básicas",
    "Detalhes e valores",
    "Imagens e finalização",
  ];

  return (
    <div className="flex flex-col justify-center min-h-screen overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-3xl bg-zinc-800/30 border border-zinc-800 rounded-2xl shadow-2xl backdrop-blur-xl p-8 mx-auto"
      >
        <div className="relative w-full h-2 bg-zinc-800 rounded-full mb-8 overflow-hidden">
          <motion.div
            className="h-full bg-indigo-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        <h1 className="text-2xl font-bold text-white mb-2">
          {stepTitles[step - 1]}
        </h1>

        <p className="text-zinc-400 mb-6 text-sm">
          {step === 1 && "Preencha as informações iniciais sobre o local."}
          {step === 2 && "Defina os valores e a duração da locação."}
          {step === 3 && "Adicione as imagens e finalize o cadastro."}
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            {step === 1 && (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row gap-6 w-full">
                  <div className="flex-1">
                    <Label className="mb-3">Nome do espaço</Label>
                    <Input
                      value={form.name}
                      onChange={(e) => onChange("name", e.target.value)}
                      placeholder="Ex: Casa de Praia"
                      className="bg-zinc-800 border border-zinc-700 text-white"
                    />
                  </div>

                  <div className="flex-1">
                    <Label className="mb-3">Tipo de locação</Label>
                    <Select
                      onValueChange={(v) => onChange("type", v)}
                      defaultValue={form.type}
                    >
                      <SelectTrigger className="bg-zinc-800 border border-zinc-700 text-white">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border border-zinc-700 text-zinc-200">
                        <SelectItem value="DAILY">Diária</SelectItem>
                        <SelectItem value="SEASONAL">Temporada</SelectItem>
                        <SelectItem value="LONG_TERM">Longo prazo</SelectItem>
                        <SelectItem value="SHORT_TERM">Curto prazo</SelectItem>
                        <SelectItem value="ROOM">Quarto</SelectItem>
                        <SelectItem value="ENTIRE_PROPERTY">Imóvel completo</SelectItem>
                        <SelectItem value="BED">Cama ou vaga</SelectItem>
                        <SelectItem value="EVENT_RENTAL">Evento</SelectItem>
                        <SelectItem value="CORPORATE">Corporativo</SelectItem>
                        <SelectItem value="LUXURY">Luxo</SelectItem>
                        <SelectItem value="RURAL">Rural</SelectItem>
                        <SelectItem value="BEACH_HOUSE">Casa de praia</SelectItem>
                        <SelectItem value="MOUNTAIN_HOUSE">Casa de montanha</SelectItem>
                        <SelectItem value="MOTORHOME">Motorhome</SelectItem>
                        <SelectItem value="OTHER">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label className="mb-3">Descrição</Label>
                  <Textarea
                    value={form.description}
                    onChange={(e) => onChange("description", e.target.value)}
                    placeholder="Descreva o local e suas comodidades..."
                    className="bg-zinc-800 border border-zinc-700 text-white min-h-[100px]"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="mb-3">Valor por hora (R$)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      value={form.hourValue}
                      onChange={(e) => onChange("hourValue", e.target.value)}
                      className="bg-zinc-800 border border-zinc-700 text-white"
                    />
                  </div>

                  <div>
                    <Label className="mb-3">Tempo mínimo (em horas)</Label>
                    <Input
                      type="number"
                      min={1}
                      value={form.minTime}
                      onChange={(e) => onChange("minTime", e.target.value)}
                      className="bg-zinc-800 border border-zinc-700 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="mb-3">Tempo máximo (em horas)</Label>
                    <Input
                      type="number"
                      min={form.minTime}
                      value={form.maxTime}
                      onChange={(e) => onChange("maxTime", e.target.value)}
                      className="bg-zinc-800 border border-zinc-700 text-white"
                    />
                  </div>

                  <div>
                    <Label className="mb-3">Tipo de locação</Label>
                    <Select onValueChange={(v) => onChange("type", v)} defaultValue={form.type}>
                      <SelectTrigger className="bg-zinc-800 border border-zinc-700 text-white">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border border-zinc-700 text-zinc-200">
                        <SelectItem value="DAILY">Diária</SelectItem>
                        <SelectItem value="SEASONAL">Temporada</SelectItem>
                        <SelectItem value="LONG_TERM">Longo prazo</SelectItem>
                        <SelectItem value="SHORT_TERM">Curto prazo</SelectItem>
                        <SelectItem value="ROOM">Quarto</SelectItem>
                        <SelectItem value="ENTIRE_PROPERTY">Imóvel completo</SelectItem>
                        <SelectItem value="BED">Cama ou vaga</SelectItem>
                        <SelectItem value="EVENT_RENTAL">Evento</SelectItem>
                        <SelectItem value="CORPORATE">Corporativo</SelectItem>
                        <SelectItem value="LUXURY">Luxo</SelectItem>
                        <SelectItem value="RURAL">Rural</SelectItem>
                        <SelectItem value="BEACH_HOUSE">Casa de praia</SelectItem>
                        <SelectItem value="MOUNTAIN_HOUSE">Casa de montanha</SelectItem>
                        <SelectItem value="MOTORHOME">Motorhome</SelectItem>
                        <SelectItem value="OTHER">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}


            {step === 3 && (
              <div className="flex flex-col gap-6">
                <div>
                  <Label className="mb-3">Imagens (URLs separadas por vírgula)</Label>
                  <div className="relative">
                    <Input
                      value={form.images}
                      onChange={(e) => onChange("images", e.target.value)}
                      placeholder="https://exemplo.com/img1.jpg, https://exemplo.com/img2.jpg"
                      className="bg-zinc-800 border border-zinc-700 text-white pr-10"
                    />
                    <Image className="absolute right-3 top-3 w-5 h-5 text-zinc-500" />
                  </div>
                </div>
                {form.images && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {form.images.split(",").map((url, i) => (
                      <img
                        key={i}
                        src={url.trim()}
                        alt="Preview"
                        className="rounded-lg object-cover w-full h-28 border border-zinc-700"
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between mt-8">
          {step > 1 ? (
            <Button
              variant="outline"
              onClick={back}
              className="border-zinc-600 text-zinc-300 bg-indigo-600 hover:bg-indigo-800 hover:text-zinc-300 cursor-pointer"
            >
              Voltar <ArrowLeftCircle size={24} color="#FFFFFF" />
            </Button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <Button
              onClick={next}
              className="border-zinc-600 text-zinc-300 bg-indigo-600 hover:bg-indigo-800 hover:text-zinc-300 cursor-pointer"
            >
              Próximo <ArrowRightCircle size={16} />
            </Button>
          ) : (
            <Button
              onClick={submit}
              disabled={loading}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
            >
              {loading ? "Criando..." : "Finalizar"}
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
