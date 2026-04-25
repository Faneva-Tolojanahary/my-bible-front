// app/books/[name]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { apiClient } from '@/lib/api-client';
import { motion, AnimatePresence } from 'motion/react';

// Types pour les données de l'API
interface Chapter {
  [verseNumber: string]: string;
}

interface BookData {
  [chapterNumber: string]: Chapter;
  _id: string;
  meta: {
    name: string;
    order: number;
    chapter_number: number;
  };
}

export default function BookPage() {
  const params = useParams();
  const bookName = params.name as string;
  const versesRef = useRef<HTMLDivElement>(null);
  
  const [bookData, setBookData] = useState<BookData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const data = await apiClient.get(`/${bookName}`);
        setBookData(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Tsy hita ny boky");
        setBookData(null);
      } finally {
        setLoading(false);
      }
    };

    if (bookName) {
      fetchBook();
    }
  }, [bookName]);

  useEffect(() => {
    if (versesRef.current) {
      versesRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedChapter]);

  const getChapterCount = () => {
    if (!bookData) return 0;
    const chapters = Object.keys(bookData).filter(key => key !== '_id' && key !== 'meta');
    return chapters.length;
  };

  const getVerses = () => {
    if (!bookData) return [];
    const chapterKey = selectedChapter.toString();
    const chapter = bookData[chapterKey];
    if (!chapter) return [];
    
    return Object.entries(chapter).map(([verseNum, text]) => ({
      number: parseInt(verseNum),
      text: text as string
    }));
  };

  // Grouper les versets en paragraphes (tous les 5 versets par exemple)
  const getFormattedText = () => {
    const verses = getVerses();
    if (verses.length === 0) return [];
    
    // Option 1: Texte continu avec numéros de versets intégrés
    const continuousText = verses.map(verse => `[${verse.number}] ${verse.text}`).join(' ');
    
    // Option 2: Diviser en paragraphes (tous les 5-8 versets)
    const paragraphSize = 6;
    const paragraphs = [];
    for (let i = 0; i < verses.length; i += paragraphSize) {
      const paragraphVerses = verses.slice(i, i + paragraphSize);
      paragraphs.push({
        startVerse: paragraphVerses[0].number,
        endVerse: paragraphVerses[paragraphVerses.length - 1].number,
        text: paragraphVerses.map(verse => `[${verse.number}] ${verse.text}`).join(' ')
      });
    }
    
    return paragraphs;
  };

  const fontSizeClasses = {
    small: 'text-sm leading-relaxed',
    medium: 'text-base leading-loose',
    large: 'text-lg leading-loose'
  };

  if (loading) {
    return (
      <div className="bg-[#F5F0E8] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-2 border-[#8B7355] border-t-[#C4A67D] rounded-full animate-spin mx-auto mb-6" />
          <p className="text-[#8B7355] text-sm tracking-wider uppercase font-serif">Mamaky ny Soratra Masina...</p>
          <p className="text-[#A89070] text-xs mt-3 italic">{bookName}</p>
        </div>
      </div>
    );
  }

  if (error || !bookData) {
    return (
      <div className="bg-[#F5F0E8] min-h-screen">
        <div className="max-w-[900px] mx-auto px-6 py-16">
          <Link href="/books" className="text-[#8B7355] hover:text-[#6B5340] transition inline-flex items-center gap-2 mb-12 font-serif">
            <span>←</span>
            <span className="text-sm tracking-wide">Hiverina any amin'ny lisitry ny boky</span>
          </Link>
          <div className="border-l-4 border-[#C4A67D] pl-8 py-4 bg-white/50">
            <h1 className="text-3xl font-serif font-light text-[#3D2B1F] mb-3">Tsy hita ny boky</h1>
            <p className="text-[#8B7355]">Ny boky "{bookName}" dia tsy hita ao amin'ny Baiboly</p>
            <p className="text-[#A89070] text-sm mt-3">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const chapterCount = getChapterCount();
  const paragraphs = getFormattedText();
  const bookTitle = bookData.meta?.name || bookName;

  return (
    <div className="bg-[#F5F0E8] min-h-screen">
      {/* Header with gold accent */}
      <div className="sticky top-0 z-10 bg-[#F5F0E8]/95 backdrop-blur-sm border-b border-[#D4C4A8]">
        <div className="max-w-[1000px] mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <Link href="/books" className="text-[#8B7355] hover:text-[#6B5340] transition text-sm tracking-wide inline-flex items-center gap-2 font-serif">
              <span>←</span>
              <span>Lisitry ny boky</span>
            </Link>
            

          </div>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-6 py-8">
        {/* Book Title - Bible style */}
        <div className="text-center mb-12 pb-8 border-b border-[#D4C4A8]">
          <div className="w-12 h-px bg-[#C4A67D] mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-serif font-light text-[#3D2B1F] tracking-wide mb-3">
            {bookTitle}
          </h1>
          
          <div className="w-12 h-px bg-[#C4A67D] mx-auto mt-6" />
          
        </div>

       

        {/* Chapter number - Large decorative */}
        <div className="text-center mb-8">
          <span className="text-7xl font-serif font-light text-[#D4C4A8]">
            {selectedChapter}
          </span>
          <div className="w-16 h-px bg-[#C4A67D] mx-auto mt-3" />
        </div>

        {/* Verses as continuous paragraphs */}
        <div 
          ref={versesRef}
          className=" pr-4 custom-scrollbar"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedChapter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {paragraphs.map((paragraph, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group"
                >
                 
                  {/* Texte continu */}
                  <p className={`${fontSizeClasses[fontSize]} text-[#3D2B1F] font-serif text-justify`}>
                    {paragraph.text.split(' ').map((word, i) => {
                      // Mettre en évidence les numéros de versets
                      if (word.match(/^\[\d+\]$/)) {
                        return (
                          <span key={i} className="text-[#C4A67D] font-bold inline-block mx-0.5">
                            {word}
                          </span>
                        );
                      }
                      return <span key={i}> {word} </span>;
                    })}
                  </p>
                </motion.div>
              ))}
              
              {/* Affichage alternatif: Texte complètement continu sans paragraphes */}
              <div className="mt-4 pt-4 border-t border-[#D4C4A8]/30">
                <div className="text-xs text-[#A89070] italic mb-3 font-serif">
                  * Vakio amin'ny faharetana sy fisaintsainana
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Chapter Navigation */}
        <div className="mt-10 flex justify-between items-center border-t border-[#D4C4A8] pt-8">
          <button
            onClick={() => setSelectedChapter(prev => Math.max(1, prev - 1))}
            disabled={selectedChapter === 1}
            className={`group flex items-center gap-3 transition-all duration-300 ${
              selectedChapter === 1
                ? 'opacity-30 cursor-not-allowed'
                : 'hover:translate-x-[-4px]'
            }`}
          >
            <div className="w-8 h-px bg-[#C4A67D] group-hover:w-12 transition-all duration-300" />
            <span className="text-xs tracking-wide text-[#8B7355] uppercase font-serif">Toko teo aloha</span>
          </button>
          
          <span className="text-xs text-[#A89070] font-serif">
            {selectedChapter} / {chapterCount}
          </span>
          
          <button
            onClick={() => setSelectedChapter(prev => Math.min(chapterCount, prev + 1))}
            disabled={selectedChapter === chapterCount}
            className={`group flex items-center gap-3 transition-all duration-300 ${
              selectedChapter === chapterCount
                ? 'opacity-30 cursor-not-allowed'
                : 'hover:translate-x-[4px]'
            }`}
          >
            <span className="text-xs tracking-wide text-[#8B7355] uppercase font-serif">Toko manaraka</span>
            <div className="w-8 h-px bg-[#C4A67D] group-hover:w-12 transition-all duration-300" />
          </button>
        </div>

        {/* Footer with Bible verse */}
        <div className="mt-16 pt-8 text-center border-t border-[#D4C4A8]">
          <p className="text-xs text-[#A89070] italic font-serif leading-relaxed max-w-md mx-auto">
            "Fa velomin’ny tenin’Andriamanitra ny olona, ary tsy mofo ihany no hahavelona azy."
          </p>
          <p className="text-[10px] text-[#C4A67D] mt-3 tracking-wider">
            — Deoteronomia 8:3 —
          </p>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #E8E0D0;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #C4A67D;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #8B7355;
        }
      `}</style>
    </div>
  );
}