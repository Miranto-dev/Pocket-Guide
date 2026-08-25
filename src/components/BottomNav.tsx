import { useState } from 'react';
import { TabType } from '../types';
import { 
  Home, 
  Map, 
  Route, 
  CheckSquare, 
  Menu, 
  X, 
  Coins, 
  MessageSquare, 
  AlertTriangle, 
  Folder, 
  BookText, 
  FileCheck 
} from 'lucide-react';

interface BottomNavProps {
  currentTab: TabType;
  onTabChange?: (tab: TabType) => void;
  onNavigate?: (tab: TabType) => void;
}

export function BottomNav({ currentTab, onTabChange, onNavigate }: BottomNavProps) {
  const [showPlusMenu, setShowPlusMenu] = useState(false);

  const handleNav = (tab: TabType) => {
    setShowPlusMenu(false);
    if (onNavigate) onNavigate(tab);
    else if (onTabChange) onTabChange(tab);
  };

  const isPlusActive = ['phrases', 'convertisseur', 'urgences', 'documents', 'journal', 'cahier'].includes(currentTab);

  return (
    <>
      {/* Plus Menu Bottom Sheet Popup */}
      {showPlusMenu && (
        <div 
          className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end"
          onClick={() => setShowPlusMenu(false)}
        >
          <div 
            className="bg-[#FAF9F6] rounded-t-3xl p-5 border-t border-[#ddc0ba]/50 shadow-2xl animate-in slide-in-from-bottom duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#ddc0ba]/30">
              <span className="font-['Montserrat',sans-serif] font-bold text-base text-[#1A1C1A]">
                Autres fonctionnalités Pocket Guide
              </span>
              <button 
                onClick={() => setShowPlusMenu(false)}
                className="p-1 rounded-full text-[#89726D] hover:bg-[#EFEEEB]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => handleNav('convertisseur')}
                className={`p-3 rounded-2xl flex items-center gap-3 text-left transition-all ${
                  currentTab === 'convertisseur'
                    ? 'bg-[#E2725B]/20 border border-[#E2725B] text-[#9F402D]'
                    : 'bg-white border border-[#ddc0ba]/40 text-[#1A1C1A] hover:bg-[#FAF9F6]'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-[#E3E2E0] text-[#333333] flex items-center justify-center shrink-0">
                  <Coins className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-xs block">Convertisseur</span>
                  <span className="text-[10px] text-[#56423E]">EUR ↔ MGA</span>
                </div>
              </button>

              <button
                onClick={() => handleNav('phrases')}
                className={`p-3 rounded-2xl flex items-center gap-3 text-left transition-all ${
                  currentTab === 'phrases'
                    ? 'bg-[#E2725B]/20 border border-[#E2725B] text-[#9F402D]'
                    : 'bg-white border border-[#ddc0ba]/40 text-[#1A1C1A] hover:bg-[#FAF9F6]'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-[#9DF3DC]/50 text-[#006B59] flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-xs block">Phrases utiles</span>
                  <span className="text-[10px] text-[#56423E]">Lexique audio</span>
                </div>
              </button>

              <button
                onClick={() => handleNav('urgences')}
                className={`p-3 rounded-2xl flex items-center gap-3 text-left transition-all ${
                  currentTab === 'urgences'
                    ? 'bg-[#FFDAD6] border border-[#BA1A1A] text-[#BA1A1A]'
                    : 'bg-white border border-[#BA1A1A]/30 text-[#BA1A1A] hover:bg-[#FFDAD6]/30'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-[#FFDAD6] text-[#BA1A1A] flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-xs block">Urgences SOS</span>
                  <span className="text-[10px] text-[#BA1A1A]/80 font-medium">117 & Hôpital</span>
                </div>
              </button>

              <button
                onClick={() => handleNav('documents')}
                className={`p-3 rounded-2xl flex items-center gap-3 text-left transition-all ${
                  currentTab === 'documents'
                    ? 'bg-[#E2725B]/20 border border-[#E2725B] text-[#9F402D]'
                    : 'bg-white border border-[#ddc0ba]/40 text-[#1A1C1A] hover:bg-[#FAF9F6]'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-[#E8EBFF] text-[#006B59] flex items-center justify-center shrink-0">
                  <Folder className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-xs block">Mes documents</span>
                  <span className="text-[10px] text-[#56423E]">Chiffrés local</span>
                </div>
              </button>

              <button
                onClick={() => handleNav('journal')}
                className={`p-3 rounded-2xl flex items-center gap-3 text-left transition-all ${
                  currentTab === 'journal'
                    ? 'bg-[#E2725B]/20 border border-[#E2725B] text-[#9F402D]'
                    : 'bg-white border border-[#ddc0ba]/40 text-[#1A1C1A] hover:bg-[#FAF9F6]'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-[#9F402D]/10 text-[#9F402D] flex items-center justify-center shrink-0">
                  <BookText className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-xs block">Journal de bord</span>
                  <span className="text-[10px] text-[#56423E]">Notes & Photos</span>
                </div>
              </button>

              <button
                onClick={() => handleNav('cahier')}
                className={`p-3 rounded-2xl flex items-center gap-3 text-left transition-all ${
                  currentTab === 'cahier'
                    ? 'bg-[#1B6B57] text-[#FAF9F6]'
                    : 'bg-[#1B6B57]/10 border border-[#1B6B57]/30 text-[#1B6B57] hover:bg-[#1B6B57]/20'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-[#1B6B57] text-[#FAF9F6] flex items-center justify-center shrink-0">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-xs block">Cahier des charges</span>
                  <span className="text-[10px] opacity-80 font-mono">Stage PWA</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Bottom Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-lg border-t border-[#ddc0ba]/40 shadow-[0_-4px_16px_rgba(0,109,91,0.06)] rounded-t-2xl px-2 py-1.5 flex justify-around items-center">
        {/* Accueil */}
        <button
          onClick={() => handleNav('accueil')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 ${
            currentTab === 'accueil'
              ? 'text-[#9F402D] bg-[#E2725B]/20 scale-105 font-bold'
              : 'text-[#56423E] hover:bg-[#E3E2E0]/40'
          }`}
        >
          <Home className={`w-5 h-5 mb-0.5 ${currentTab === 'accueil' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[11px] font-medium leading-none">Accueil</span>
        </button>

        {/* Carte */}
        <button
          onClick={() => handleNav('carte')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 ${
            currentTab === 'carte'
              ? 'text-[#9F402D] bg-[#E2725B]/20 scale-105 font-bold'
              : 'text-[#56423E] hover:bg-[#E3E2E0]/40'
          }`}
        >
          <Map className={`w-5 h-5 mb-0.5 ${currentTab === 'carte' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[11px] font-medium leading-none">Carte</span>
        </button>

        {/* Trajet */}
        <button
          onClick={() => handleNav('trajet')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 ${
            currentTab === 'trajet'
              ? 'text-[#9F402D] bg-[#E2725B]/20 scale-105 font-bold'
              : 'text-[#56423E] hover:bg-[#E3E2E0]/40'
          }`}
        >
          <Route className={`w-5 h-5 mb-0.5 ${currentTab === 'trajet' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[11px] font-medium leading-none">Trajet</span>
        </button>

        {/* Liste */}
        <button
          onClick={() => handleNav('liste')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 ${
            currentTab === 'liste'
              ? 'text-[#9F402D] bg-[#E2725B]/20 scale-105 font-bold'
              : 'text-[#56423E] hover:bg-[#E3E2E0]/40'
          }`}
        >
          <CheckSquare className={`w-5 h-5 mb-0.5 ${currentTab === 'liste' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[11px] font-medium leading-none">Liste</span>
        </button>

        {/* Plus Drawer Trigger */}
        <button
          onClick={() => setShowPlusMenu(true)}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 ${
            isPlusActive
              ? 'text-[#9F402D] bg-[#E2725B]/20 scale-105 font-bold'
              : 'text-[#56423E] hover:bg-[#E3E2E0]/40'
          }`}
        >
          <Menu className={`w-5 h-5 mb-0.5 ${isPlusActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[11px] font-medium leading-none">Plus</span>
        </button>
      </nav>
    </>
  );
}
