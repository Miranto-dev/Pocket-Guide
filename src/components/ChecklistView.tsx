import { useState, type FormEvent } from 'react';
import { ChecklistCategory, ChecklistItem } from '../types';
import { 
  FileText, 
  Shirt, 
  HeartPulse, 
  Smartphone, 
  Plus, 
  RotateCcw, 
  Check, 
  Trash2,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ChecklistViewProps {
  categories: ChecklistCategory[];
  onToggleItem: (categoryId: string, itemId: string) => void;
  onAddItem: (categoryId: string, text: string) => void;
  onDeleteItem: (categoryId: string, itemId: string) => void;
  onResetChecklist: () => void;
}

export function ChecklistView({
  categories,
  onToggleItem,
  onAddItem,
  onDeleteItem,
  onResetChecklist
}: ChecklistViewProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCatId, setSelectedCatId] = useState(categories[0]?.id || 'docs');
  const [newItemText, setNewItemText] = useState('');

  // Calculate total progress
  let totalItems = 0;
  let checkedItems = 0;
  categories.forEach(cat => {
    cat.items.forEach(item => {
      totalItems++;
      if (item.checked) checkedItems++;
    });
  });

  const percentage = totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;

  const handleToggle = (catId: string, itemId: string, wasChecked: boolean) => {
    onToggleItem(catId, itemId);
    // Trigger confetti if about to hit 100%
    if (!wasChecked && checkedItems + 1 === totalItems) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleAddItemSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;
    onAddItem(selectedCatId, newItemText.trim());
    setNewItemText('');
    setShowAddModal(false);
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'description':
        return <FileText className="w-5 h-5" />;
      case 'apparel':
        return <Shirt className="w-5 h-5" />;
      case 'medical_services':
        return <HeartPulse className="w-5 h-5" />;
      case 'devices':
        return <Smartphone className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 pt-4 pb-24 flex flex-col">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="font-['Montserrat',sans-serif] font-bold text-2xl sm:text-3xl text-[#1A1C1A] mb-1">
          Ma Liste de Voyage
        </h1>
        <p className="text-sm text-[#56423E]">
          Préparez-vous pour Madagascar. N'oubliez rien d'essentiel.
        </p>

        {/* Progress Bar Card */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-[0_4px_14px_rgba(0,109,91,0.06)] border border-[#ddc0ba]/30 mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-['Montserrat',sans-serif] font-semibold text-xs text-[#1A1C1A] uppercase tracking-wider">
              Progression
            </span>
            <span className="font-['Montserrat',sans-serif] font-bold text-sm text-[#006B5B]">
              {percentage}% Complété ({checkedItems}/{totalItems})
            </span>
          </div>
          <div className="w-full bg-[#E3E2E0] rounded-full h-3 overflow-hidden">
            <div
              className="bg-[#006B5B] h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>

          {percentage === 100 && (
            <div className="mt-3 text-xs text-[#006B59] font-semibold flex items-center gap-1.5 bg-[#9DF3DC]/30 p-2 rounded-xl">
              <Sparkles className="w-4 h-4 text-[#00A58E]" />
              <span>Félicitations ! Vos valises sont prêtes pour Madagascar. Bon voyage !</span>
            </div>
          )}
        </div>
      </div>

      {/* Checklist Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((category) => (
          <section
            key={category.id}
            className="bg-white rounded-2xl p-5 shadow-[0_4px_16px_rgba(0,109,91,0.06)] border border-[#ddc0ba]/30 flex flex-col justify-between"
          >
            <div>
              {/* Category Header */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${category.bgClass} ${category.colorClass} flex items-center justify-center`}>
                    {getCategoryIcon(category.icon)}
                  </div>
                  <h2 className="font-['Montserrat',sans-serif] font-bold text-lg text-[#1A1C1A]">
                    {category.name}
                  </h2>
                </div>
                <span className="text-xs font-mono text-[#89726D]">
                  {category.items.filter(i => i.checked).length}/{category.items.length}
                </span>
              </div>

              {/* Items List */}
              <ul className="space-y-3">
                {category.items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between gap-3 group"
                  >
                    <label className="flex items-center gap-3 flex-1 cursor-pointer select-none">
                      <div
                        onClick={() => handleToggle(category.id, item.id, item.checked)}
                        className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                          item.checked
                            ? 'bg-[#006B5B] border-[#006B5B] text-white shadow-xs'
                            : 'bg-white border-[#89726D]/60 hover:border-[#006B5B]'
                        }`}
                      >
                        {item.checked && <Check className="w-4 h-4 stroke-[3]" />}
                      </div>

                      <div className="flex-1">
                        <span
                          className={`text-sm leading-tight transition-all block ${
                            item.checked
                              ? 'line-through text-[#89726D] opacity-70'
                              : 'text-[#1A1C1A] font-medium'
                          }`}
                        >
                          {item.text}
                        </span>
                        {item.notes && (
                          <span className="text-[11px] text-[#89726D] block">
                            {item.notes}
                          </span>
                        )}
                      </div>
                    </label>

                    <button
                      onClick={() => onDeleteItem(category.id, item.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-[#89726D] hover:text-[#BA1A1A] transition-all"
                      title="Supprimer cet élément"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Add To Category */}
            <button
              onClick={() => {
                setSelectedCatId(category.id);
                setShowAddModal(true);
              }}
              className="mt-4 pt-3 border-t border-[#ddc0ba]/20 text-xs font-semibold text-[#9F402D] hover:text-[#E2725B] flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Ajouter à {category.name}</span>
            </button>
          </section>
        ))}
      </div>

      {/* Bottom Floating Action Bar */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#E2725B] hover:bg-[#9F402D] text-white font-['Montserrat',sans-serif] font-bold rounded-full px-6 py-3 text-sm shadow-md transition-all hover:scale-102 active:scale-98 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Ajouter un élément</span>
        </button>

        <button
          onClick={onResetChecklist}
          className="bg-white hover:bg-[#FAF9F6] border border-[#ddc0ba]/60 text-[#56423E] font-medium rounded-full px-4 py-2.5 text-xs transition-colors flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Réinitialiser la liste</span>
        </button>
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF9F6] rounded-3xl p-6 w-full max-w-md shadow-2xl border border-[#ddc0ba]/40">
            <h3 className="font-['Montserrat',sans-serif] font-bold text-xl text-[#1A1C1A] mb-1">
              Ajouter un élément à votre valise
            </h3>
            <p className="text-xs text-[#56423E] mb-4">
              Choisissez la catégorie et précisez l'objet à emporter
            </p>

            <form onSubmit={handleAddItemSubmit} className="flex flex-col gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#1A1C1A] mb-1">Catégorie</label>
                <select
                  value={selectedCatId}
                  onChange={(e) => setSelectedCatId(e.target.value)}
                  className="w-full bg-white border border-[#ddc0ba] rounded-xl px-3 py-2.5 text-sm text-[#1A1C1A] focus:ring-2 focus:ring-[#006B5B] outline-hidden"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A1C1A] mb-1">Nom de l'élément</label>
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="Ex: Lunettes de soleil polarisées, Lampe frontale..."
                  value={newItemText}
                  onChange={(e) => setNewItemText(e.target.value)}
                  className="w-full bg-white border border-[#ddc0ba] rounded-xl px-3 py-2.5 text-sm text-[#1A1C1A] focus:ring-2 focus:ring-[#006B5B] outline-hidden"
                />
              </div>

              {/* Quick tropical suggestions */}
              <div className="mt-1">
                <span className="text-[11px] font-mono text-[#89726D] block mb-1.5">Suggestions pour Nosy Be :</span>
                <div className="flex flex-wrap gap-1.5">
                  {['Lunettes de soleil', 'Lampe frontale', 'K-way', 'Gourde isotherme', 'Permis international', 'Snorkel'].map((sug) => (
                    <button
                      key={sug}
                      type="button"
                      onClick={() => setNewItemText(sug)}
                      className="text-[11px] bg-white border border-[#ddc0ba]/60 px-2 py-0.5 rounded-md text-[#56423E] hover:bg-[#FAF9F6]"
                    >
                      + {sug}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 mt-4">
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
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
