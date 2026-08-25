import { useState, type ChangeEvent, type FormEvent } from 'react';
import { JournalEntry } from '../types';
import { 
  Plus, 
  MapPin, 
  Utensils, 
  Calendar, 
  Image as ImageIcon, 
  Upload, 
  X, 
  Sparkles, 
  Share2 
} from 'lucide-react';

interface JournalViewProps {
  entries: JournalEntry[];
  onAddEntry: (entry: Omit<JournalEntry, 'id' | 'timestamp'>) => void;
}

export function JournalView({ entries, onAddEntry }: JournalViewProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newDate, setNewDate] = useState(new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }));
  const [newCategory, setNewCategory] = useState<JournalEntry['category']>('paysage');
  const [imagePreview, setImagePreview] = useState<string>('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80');

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    onAddEntry({
      title: newTitle.trim() || undefined,
      content: newContent.trim(),
      location: newLocation.trim() || 'Madagascar',
      date: newDate,
      category: newCategory,
      imageUrl: imagePreview
    });

    setNewTitle('');
    setNewContent('');
    setNewLocation('');
    setShowAddModal(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 pt-4 pb-28 flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-['Montserrat',sans-serif] font-bold text-2xl sm:text-3xl text-[#1A1C1A]">
            Mon Journal
          </h1>
          <p className="text-sm text-[#56423E]">
            Immortalisez vos souvenirs, rencontres et découvertes à Madagascar.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-[#E2725B] hover:bg-[#9F402D] text-white rounded-full text-xs font-semibold shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Nouvelle note</span>
        </button>
      </div>

      {/* Journal Entries Grid / Stream matching mockups */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {entries.map((entry) => (
          <article
            key={entry.id}
            className="bg-white rounded-3xl shadow-[0_4px_16px_rgba(0,109,91,0.08)] border border-[#ddc0ba]/30 overflow-hidden flex flex-col group hover:shadow-[0_8px_24px_rgba(0,109,91,0.12)] transition-all duration-300"
          >
            {/* Entry Header Image with Gradient & Date */}
            <div className="relative w-full h-52 overflow-hidden bg-[#FAF9F6]">
              <img
                src={entry.imageUrl}
                alt={entry.title || entry.location}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              
              <div className="absolute bottom-3 left-4 text-white">
                <span className="text-[11px] font-mono uppercase tracking-widest block opacity-95 text-[#FFDAD3] font-semibold">
                  {entry.date}
                </span>
                {entry.title && (
                  <h3 className="font-['Montserrat',sans-serif] font-bold text-sm sm:text-base text-white line-clamp-1">
                    {entry.title}
                  </h3>
                )}
              </div>
            </div>

            {/* Entry Text & Location */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <p className="text-sm text-[#1A1C1A]/85 leading-relaxed">
                {entry.content}
              </p>

              <div className="mt-4 pt-3 border-t border-[#ddc0ba]/20 flex items-center justify-between text-xs text-[#56423E]">
                <div className="flex items-center gap-1.5 font-medium">
                  {entry.category === 'culinaire' ? (
                    <Utensils className="w-4 h-4 text-[#9F402D]" />
                  ) : (
                    <MapPin className="w-4 h-4 text-[#9F402D]" />
                  )}
                  <span>{entry.location}</span>
                </div>

                <span className="text-[11px] font-mono text-[#89726D] bg-[#EFEEEB] px-2 py-0.5 rounded-md">
                  {entry.category}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Floating Action Button (FAB) */}
      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-20 md:bottom-8 right-6 w-14 h-14 bg-[#E2725B] hover:bg-[#9F402D] text-white rounded-2xl shadow-[0_8px_20px_rgba(226,114,91,0.35)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-40"
        title="Ajouter un souvenir au journal"
      >
        <Plus className="w-7 h-7 stroke-[2.5]" />
      </button>

      {/* Add Entry Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF9F6] rounded-3xl p-6 w-full max-w-md shadow-2xl border border-[#ddc0ba]/40 max-h-[90vh] overflow-y-auto">
            <h3 className="font-['Montserrat',sans-serif] font-bold text-xl text-[#1A1C1A] mb-1">
              Ajouter une entrée au journal
            </h3>
            <p className="text-xs text-[#56423E] mb-4">
              Partagez une anecdote, un ressenti ou un moment fort de votre voyage
            </p>

            <form onSubmit={handleCreateSubmit} className="flex flex-col gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#1A1C1A] mb-1">Titre de la note (optionnel)</label>
                <input
                  type="text"
                  placeholder="Ex: Coucher de soleil magique, Rencontre inoubliable..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-white border border-[#ddc0ba] rounded-xl px-3 py-2 text-sm text-[#1A1C1A] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A1C1A] mb-1">Lieu</label>
                <input
                  type="text"
                  placeholder="Ex: Nosy Iranja, Plage d'Andilana, Hell-Ville..."
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full bg-white border border-[#ddc0ba] rounded-xl px-3 py-2 text-sm text-[#1A1C1A] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A1C1A] mb-1">Récit de l'expérience</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Racontez ce que vous avez vu, goûté, ressenti..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full bg-white border border-[#ddc0ba] rounded-xl px-3 py-2 text-sm text-[#1A1C1A] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A1C1A] mb-1">Photo du souvenir</label>
                <label className="flex flex-col items-center justify-center p-3 border-2 border-dashed border-[#ddc0ba] hover:border-[#006B5B] rounded-2xl bg-white cursor-pointer transition-colors mb-2">
                  <Upload className="w-5 h-5 text-[#89726D] mb-1" />
                  <span className="text-xs text-[#56423E]">Choisir une photo locale</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                {imagePreview && (
                  <div className="h-32 rounded-xl overflow-hidden border border-[#ddc0ba]">
                    <img src={imagePreview} alt="Aperçu" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2.5 bg-[#EFEEEB] hover:bg-[#E3E2E0] text-[#56423E] rounded-xl text-sm font-semibold transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-[#E2725B] hover:bg-[#9F402D] text-white rounded-xl text-sm font-bold shadow-xs transition-colors"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
