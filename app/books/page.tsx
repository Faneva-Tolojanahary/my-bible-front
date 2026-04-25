// app/users/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Reveal } from '../Components/UI';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api-client';

interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
  meta?: {
    name: string;
  };
}

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await apiClient.get('/');
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Fonction pour naviguer vers /books/[name]
  const handleUserClick = (userName: string) => {
    const slug = userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase().replace(/\s+/g, '-');
    router.push(`/books/${slug}`);
  };

  if (loading) {
    return (
      <div className="bg-[#F5F0E8] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-2 border-[#8B7355] border-t-[#C4A67D] rounded-full animate-spin mx-auto mb-6" />
          <p className="text-[#8B7355] text-sm tracking-wider uppercase font-serif">Mpandray ny mpampiasa...</p>
          <p className="text-[#A89070] text-xs mt-3 italic">Andraso kely azafady</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#F5F0E8] min-h-screen flex items-center justify-center p-6">
        <div className="border-l-4 border-[#C4A67D] pl-8 py-4 bg-white/50 max-w-md">
          <p className="text-[#8B7355] font-serif">Nisy olana nitranga</p>
          <p className="text-[#A89070] text-sm mt-2">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 text-[#C4A67D] text-sm tracking-wider uppercase hover:text-[#8B7355] transition font-serif"
          >
            Andramo indray →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F0E8] min-h-screen">
      {/* Hero Section - Bible style */}
      <section className="relative border-b border-[#D4C4A8]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <Reveal delay={0}>
            <div className="text-center">
              <div className="w-12 h-px bg-[#C4A67D] mx-auto mb-6" />
              <h1 className="text-5xl md:text-6xl font-serif font-light text-[#3D2B1F] tracking-wide mb-4">
              Mpikambana
              </h1>
              <p className="text-[#C4A67D] text-sm tracking-widest uppercase font-serif">
              Fianakavian'ny Teny Masina
              </p>
              <div className="w-12 h-px bg-[#C4A67D] mx-auto mt-6" />
              <p className="text-[#A89070] text-sm mt-5">
                {users.length} mpampiasa voasoratra ao amin'ny fianakaviana
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Users Grid Section */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user, index) => {
            const displayName = user.meta?.name || user.name || 'Tsy voatanisa';
            const userSlug = displayName.charAt(0).toUpperCase() + displayName.slice(1).toLowerCase().replace(/\s+/g, '-');
            
            return (
              <Reveal key={user.id} delay={index * 100}>
                <Link href={`/books/${userSlug}`}>
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

        {/* Empty state */}
        {users.length === 0 && !loading && !error && (
          <div className="text-center py-20">
            <div className="w-20 h-20 border border-[#D4C4A8] flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl text-[#C4A67D] font-serif">?</span>
            </div>
            <p className="text-[#8B7355] font-serif font-light text-lg">Tsy misy mpampiasa voasoratra</p>
            <p className="text-[#A89070] text-sm mt-2">Andramo averina any aoriana</p>
          </div>
        )}
      </section>
    </div>
  );
}