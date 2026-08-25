import { useState, useMemo } from 'react';
import { Phrase } from '../types';
import { speakMalagasy } from '../utils/audioSynth';
import { 
  Search, 
  Volume2, 
  Hand, 
  Utensils, 
  AlertCircle, 
  Car, 
  ShoppingBag, 
  Sparkles,
  VolumeX
} from 'lucide-react';

interface PhrasesViewProps {
  phrases: Phrase[];
}

export function PhrasesView({ phrases }: PhrasesViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('salutations');
  const [playingId, setPlayingId] = useState<string | null>(null);

  const filteredPhrases = useMemo(() => {
    return phrases.filter(p => {
      const matchSearch = p.french.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.malagasy.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (p.phonetic && p.phonetic.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchCat = searchQuery ? true : p.category === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [phrases, searchQuery, selectedCategory]);

  const handlePlayAudio = (phrase: Phrase) => {
    setPlayingId(phrase.id);
    speakMalagasy(phrase.malagasy, phrase.phonetic);
    setTimeout(() => {
      setPlayingId(null);
    }, 1200);
  };

  const getCategoryTitle = () => {
    switch (selectedCategory) {
      case 'salutations': return 'Salutations & Politesse';
      case 'nourriture': return 'Au Restaurant & Repas';
      case 'urgence': return 'Urgences & Santé';
      case 'transport': return 'Transports & Déplacements';
      case 'marche': return 'Marché, Prix & Achats';
      default: return 'Phrases Courantes';
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 pt-4 pb-24 flex flex-col gap-6">
      {/* Header Section */}
      <div>
        <h1 className="font-['Montserrat',sans-serif] font-bold text-2xl sm:text-3xl text-[#9F402D] mb-1">
          Phrases Utiles
        </h1>
        <p className="text-sm text-[#56423E]">
          Guide de conversation phonétique Français ↔ Malagasy avec prononciation audio hors-ligne.
        </p>

        {/* Search Input */}
        <div className="relative mt-4">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#006B5B]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher une phrase (ex: Bonjour, Merci, Prix, Pain...)"
            className="w-full bg-[#F5F5DC] border border-[#ddc0ba] rounded-2xl py-3.5 pl-12 pr-4 text-sm text-[#1A1C1A] placeholder:text-[#89726D] focus:ring-2 focus:ring-[#006B5B] outline-hidden shadow-2xs transition-colors"
          />
        </div>
      </div>

      {/* Category Pills (Bento Grid) */}
      {!searchQuery && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={() => setSelectedCategory('salutations')}
            className={`rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
              selectedCategory === 'salutations'
                ? 'bg-[#E2725B]/20 border-2 border-[#E2725B] text-[#9F402D] shadow-xs'
                : 'bg-white border border-[#ddc0ba]/40 text-[#56423E] hover:bg-[#FAF9F6]'
            }`}
          >
            <Hand className="w-6 h-6 text-[#9F402D]" />
            <span className="font-['Montserrat',sans-serif] font-semibold text-xs text-center">Salutations</span>
          </button>

          <button
            onClick={() => setSelectedCategory('nourriture')}
            className={`rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
              selectedCategory === 'nourriture'
                ? 'bg-[#E2725B]/20 border-2 border-[#E2725B] text-[#9F402D] shadow-xs'
                : 'bg-white border border-[#ddc0ba]/40 text-[#56423E] hover:bg-[#FAF9F6]'
            }`}
          >
            <Utensils className="w-6 h-6 text-[#006B5B]" />
            <span className="font-['Montserrat',sans-serif] font-semibold text-xs text-center">Nourriture</span>
          </button>

          <button
            onClick={() => setSelectedCategory('urgence')}
            className={`rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
              selectedCategory === 'urgence'
                ? 'bg-[#BA1A1A]/15 border-2 border-[#BA1A1A] text-[#BA1A1A] shadow-xs'
                : 'bg-white border border-[#ddc0ba]/40 text-[#56423E] hover:bg-[#FAF9F6]'
            }`}
          >
            <AlertCircle className="w-6 h-6 text-[#BA1A1A]" />
            <span className="font-['Montserrat',sans-serif] font-semibold text-xs text-center">Urgence</span>
          </button>

          <button
            onClick={() => setSelectedCategory('marche')}
            className={`rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
              selectedCategory === 'marche'
                ? 'bg-[#E2725B]/20 border-2 border-[#E2725B] text-[#9F402D] shadow-xs'
                : 'bg-white border border-[#ddc0ba]/40 text-[#56423E] hover:bg-[#FAF9F6]'
            }`}
          >
            <ShoppingBag className="w-6 h-6 text-[#006B59]" />
            <span className="font-['Montserrat',sans-serif] font-semibold text-xs text-center">Marché & Prix</span>
          </button>
        </div>
      )}

      {/* Phrases List */}
      <section className="flex flex-col gap-3">
        <h2 className="font-['Montserrat',sans-serif] font-bold text-lg text-[#1A1C1A]">
          {searchQuery ? `Résultats pour "${searchQuery}" (${filteredPhrases.length})` : getCategoryTitle()}
        </h2>

        {filteredPhrases.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-[#ddc0ba]/30">
            <p className="text-sm text-[#56423E]">Aucune phrase trouvée pour cette recherche.</p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-3 text-xs text-[#9F402D] font-bold underline"
            >
              Afficher toutes les salutations
            </button>
          </div>
        ) : (
          filteredPhrases.map((phrase) => {
            const isPlaying = playingId === phrase.id;
            return (
              <div
                key={phrase.id}
                className="bg-white rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4 shadow-[0_4px_14px_rgba(0,109,91,0.06)] border border-[#ddc0ba]/30 hover:border-[#E2725B]/40 transition-all"
              >
                <div>
                  <span className="text-[10px] font-mono text-[#89726D] uppercase tracking-wider block mb-0.5">
                    Français
                  </span>
                  <p className="text-base sm:text-lg font-bold text-[#1A1C1A]">
                    {phrase.french}
                  </p>
                  {phrase.context && (
                    <span className="text-[11px] text-[#89726D] italic block mt-0.5">
                      {phrase.context}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-[#9F402D] uppercase tracking-wider block mb-0.5">
                      Malagasy
                    </span>
                    <p className="text-base sm:text-lg font-bold text-[#9F402D]">
                      {phrase.malagasy}
                    </p>
                    {phrase.phonetic && (
                      <span className="text-[11px] font-mono text-[#006B5B] block">
                        [{phrase.phonetic}]
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handlePlayAudio(phrase)}
                    className={`w-11 h-11 rounded-full flex items-center justify-center transition-all shadow-xs ${
                      isPlaying
                        ? 'bg-[#006B5B] text-white scale-110'
                        : 'bg-[#9DF3DC]/40 text-[#006B59] hover:bg-[#9DF3DC] hover:scale-105 active:scale-95'
                    }`}
                    title={`Écouter la prononciation de "${phrase.malagasy}"`}
                    aria-label={`Écouter ${phrase.malagasy}`}
                  >
                    <Volume2 className={`w-5 h-5 ${isPlaying ? 'animate-pulse' : ''}`} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </section>

      {/* Cultural Market Illustration Banner matching screenshot */}
      <div className="rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(0,109,91,0.08)] relative h-52 w-full border border-[#ddc0ba]/30">
        <img
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
          alt="Marché Malagasy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1C1A]/90 via-[#1A1C1A]/30 to-transparent flex flex-col justify-end p-5 text-white">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#FFDAD3] mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6D4D]" />
            <span>Astuce linguistique</span>
          </div>
          <p className="text-sm font-medium text-white/95">
            Apprenez quelques mots locaux ("Salama", "Misaotra", "Azafady") pour enrichir vos échanges avec la population locale et ouvrir tous les cœurs à Madagascar.
          </p>
        </div>
      </div>
    </div>
  );
}
