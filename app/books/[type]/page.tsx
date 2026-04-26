"use client";

import { Reveal } from "@/app/Components/UI";
import { apiClient } from "@/lib/api-client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from 'motion/react';

interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
  meta?: {
    name: string;
  };
}

// ── Component ──────────────────────────────────────────────────────────────
export default function Type() {
  const { type } = useParams();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Décoder le type si nécessaire
        const decodedType = type ? decodeURIComponent(type as string) : '';
        const data = await apiClient.get(`/${decodedType}`);
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur");
      } finally {
        setLoading(false);
      }
    };

    if (type) {
      fetchUsers();
    }
  }, [type]);

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="text-[#C4A67D]">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="text-red-500">Erreur: {error}</div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user, index) => {
            const displayName = user.meta?.name || user.name || 'Tsy voatanisa';
            
            // ✅ Garder le nom original et l'encoder pour l'URL
            const encodedName = encodeURIComponent(displayName);
            
            return (
              <Reveal key={user.id} delay={index * 100}>
                <Link href={`/books/${type}/${encodedName}`}>
                  <motion.div 
                    className="group bg-white border border-[#D4C4A8] hover:border-[#C4A67D] transition-all cursor-pointer"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="p-6">
                      {/* User initial - Bible style circle */}
                      <div className="w-14 h-14 border border-[#C4A67D] flex items-center justify-center mb-5 group-hover:bg-[#C4A67D]/5 transition">
                        <span className="text-2xl font-serif font-light text-[#8B7355] uppercase">
                          {displayName.charAt(0)}
                        </span>
                      </div>

                      {/* User name */}
                      <h2 className="text-xl font-serif font-light text-[#3D2B1F] mb-2 group-hover:text-[#C4A67D] transition">
                        {displayName}
                      </h2>
                      
                      {/* User email */}
                      <p className="text-sm text-[#A89070] font-serif mb-4">
                        {user.email}
                      </p>
                      
                      {/* Divider */}
                      <div className="h-px bg-[#D4C4A8] mb-4 group-hover:bg-[#C4A67D] transition" />

                      {/* User role */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs tracking-wider text-[#A89070] uppercase font-serif">
                          {user.role || 'Mpikambana'}
                        </span>
                        <span className="text-[10px] text-[#C4A67D] group-hover:translate-x-1 transition-transform">
                          Hijery ny boky →
                        </span>
                      </div>
                    </div>

                    {/* Footer accent bar */}
                    <div className="h-0.5 bg-[#C4A67D]/0 group-hover:bg-[#C4A67D]/30 transition-all" />
                  </motion.div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        {/* Bottom Malagasy Proverb */}
        {users.length > 0 && (
          <div className="mt-20 text-center border-t border-[#D4C4A8] pt-12">
            <div className="w-12 h-px bg-[#C4A67D] mx-auto mb-6" />
            <p className="text-xs tracking-[0.3em] text-[#A89070] uppercase font-serif mb-4">
              Ohabolana malagasy
            </p>
            <p className="text-xl md:text-2xl font-serif font-light text-[#8B7355] italic max-w-2xl mx-auto">
              "Ny olona tsara no firavaky ny firenena"
            </p>
            <p className="text-[10px] text-[#C4A67D] mt-4 tracking-wider">
              — Fahendrena gasy —
            </p>
            <div className="w-12 h-px bg-[#C4A67D] mx-auto mt-6" />
          </div>
        )}
      </section>
    </div>
  );
}