import { TabType } from '../types';
import { Logo } from './Logo';
import { Wifi, WifiOff, Settings, Download, BookOpen } from 'lucide-react';

interface HeaderProps {
  currentTab: TabType;
  onTabChange?: (tab: TabType) => void;
  onNavigate?: (tab: TabType) => void;
  isOffline: boolean;
  onToggleOffline: () => void;
  onOpenSettings?: () => void;
  installPromptAvailable?: boolean;
  onInstallPwa?: () => void;
}

export function Header({
  currentTab,
  onTabChange,
  onNavigate,
  isOffline,
  onToggleOffline,
  onOpenSettings = () => {},
  installPromptAvailable = false,
  onInstallPwa = () => {}
}: HeaderProps) {
  const handleNav = (tab: TabType) => {
    if (onNavigate) onNavigate(tab);
    else if (onTabChange) onTabChange(tab);
  };
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#ddc0ba]/30 shadow-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => handleNav('accueil')}
          className="flex items-center gap-3 text-left group transition-transform active:scale-98"
        >
          <Logo className="w-10 h-10 shadow-xs group-hover:scale-105 transition-transform" />
          <div>
            <span className="font-['Montserrat',sans-serif] font-bold text-lg sm:text-xl text-[#1A1C1A] tracking-tight block leading-none">
              Pocket Guide
            </span>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#9F402D] font-semibold">
              Madagascar • Nosy Be
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            onClick={() => handleNav('accueil')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              currentTab === 'accueil'
                ? 'bg-[#E2725B]/20 text-[#9F402D] font-semibold'
                : 'text-[#56423E] hover:bg-[#E3E2E0]/40'
            }`}
          >
            Accueil
          </button>
          <button
            onClick={() => handleNav('carte')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              currentTab === 'carte'
                ? 'bg-[#E2725B]/20 text-[#9F402D] font-semibold'
                : 'text-[#56423E] hover:bg-[#E3E2E0]/40'
            }`}
          >
            Carte
          </button>
          <button
            onClick={() => handleNav('trajet')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              currentTab === 'trajet'
                ? 'bg-[#E2725B]/20 text-[#9F402D] font-semibold'
                : 'text-[#56423E] hover:bg-[#E3E2E0]/40'
            }`}
          >
            Trajet
          </button>
          <button
            onClick={() => handleNav('liste')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              currentTab === 'liste'
                ? 'bg-[#E2725B]/20 text-[#9F402D] font-semibold'
                : 'text-[#56423E] hover:bg-[#E3E2E0]/40'
            }`}
          >
            Checklist
          </button>
          <button
            onClick={() => handleNav('phrases')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              currentTab === 'phrases'
                ? 'bg-[#E2725B]/20 text-[#9F402D] font-semibold'
                : 'text-[#56423E] hover:bg-[#E3E2E0]/40'
            }`}
          >
            Phrases
          </button>
          <button
            onClick={() => handleNav('convertisseur')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              currentTab === 'convertisseur'
                ? 'bg-[#E2725B]/20 text-[#9F402D] font-semibold'
                : 'text-[#56423E] hover:bg-[#E3E2E0]/40'
            }`}
          >
            Devises
          </button>
          <button
            onClick={() => handleNav('urgences')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              currentTab === 'urgences'
                ? 'bg-[#BA1A1A]/15 text-[#BA1A1A] font-bold'
                : 'text-[#BA1A1A] hover:bg-[#FFDAD6]/50'
            }`}
          >
            SOS
          </button>
          <button
            onClick={() => handleNav('cahier')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wide transition-colors flex items-center gap-1.5 border border-[#1B6B57]/30 ${
              currentTab === 'cahier'
                ? 'bg-[#1B6B57] text-[#FAF9F6] font-bold'
                : 'text-[#1B6B57] hover:bg-[#1B6B57]/10'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Cahier des charges
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Offline Toggle Pill */}
          <button
            onClick={onToggleOffline}
            title={isOffline ? "Mode hors-ligne activé (cliquez pour simuler en ligne)" : "Mode en ligne (cliquez pour simuler hors-ligne)"}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors shadow-2xs ${
              isOffline
                ? 'bg-[#E3E2E0] text-[#56423E] border border-[#ddc0ba]/40'
                : 'bg-[#9DF3DC]/50 text-[#005144] border border-[#006B5B]/30'
            }`}
          >
            {isOffline ? (
              <>
                <WifiOff className="w-3.5 h-3.5 text-[#9F402D]" />
                <span className="hidden sm:inline">Hors-ligne</span>
              </>
            ) : (
              <>
                <Wifi className="w-3.5 h-3.5 text-[#006B59]" />
                <span className="hidden sm:inline">Connecté</span>
              </>
            )}
          </button>

          {/* PWA Install Button */}
          {installPromptAvailable && (
            <button
              onClick={onInstallPwa}
              className="flex items-center gap-1.5 px-3 py-1 bg-[#E2725B] text-white rounded-full text-xs font-semibold shadow-xs hover:bg-[#9F402D] transition-colors"
              title="Installer Pocket Guide en tant que PWA"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Installer l'app</span>
            </button>
          )}

          {/* Settings button */}
          <button
            onClick={onOpenSettings}
            className="w-9 h-9 rounded-full bg-[#EFEEEB] hover:bg-[#E3E2E0] flex items-center justify-center text-[#9F402D] transition-colors"
            title="Paramètres & Gestion du voyage"
            aria-label="Paramètres"
          >
            <Settings className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
