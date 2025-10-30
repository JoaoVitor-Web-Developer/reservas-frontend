"use client";

import Link from "next/link";
import { useAuth } from "../lib/auth";
import { PlusCircle, House, LogOut, User, Menu, X } from "@deemlol/next-icons";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function Header() {
  const { user, logout } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <header className="w-full bg-zinc-900/90 border-b border-zinc-800 backdrop-blur-md fixed top-0 left-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link
          href="/leases"
          className="text-xl font-bold bg-linear-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent hover:opacity-80 transition"
        >
          Reservas Já
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-zinc-300"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav
          className={`absolute md:static top-16 left-0 w-full md:w-auto bg-zinc-900 md:bg-transparent flex flex-col md:flex-row items-center gap-4 md:gap-6 border-t md:border-0 border-zinc-800 p-4 md:p-0 transition-all duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto"
            }`}
        >
          <Link
            href="/leases"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-white font-semibold transition-colors"
          >

            <House size={16} />
            Locais
          </Link>

          {user ? (
            <>
              <Link
                href="/profile"
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-white font-semibold transition-colors"
              >
                <User size={16} />
                Perfil
              </Link>
              <Link
                href="/create-lease"
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-white font-semibold transition-colors"
              >

                <PlusCircle size={16} />
                Criar Locação
              </Link>
              <Button
                size="sm"
                onClick={logout}
                className="flex items-center gap-1 cursor-pointer bg-red-600 hover:bg-red-700 transition-all duration-300 ease-in-out"
              >
                <LogOut size={16} />
                Sair
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-muted-foreground hover:text-white font-semibold transition-colors"
              >
                Login
              </Link>
              <Button asChild size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                <Link href="/register">Registrar</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
