import { TabType, TripInfo } from '../types';
import { 
  PlaneTakeoff, 
  Calendar, 
  Map, 
  CheckSquare, 
  MessageSquare, 
  Coins, 
  AlertTriangle, 
  Folder, 
  BookText, 
  ChevronRight,
  WifiOff,
  Sparkles,
  FileCheck
} from 'lucide-react';

interface HomeViewProps {
  tripInfo: TripInfo;
  journalCount: number;
  completedTasksRatio: { completed: number; total: number };
  onNavigate: (tab: TabType) => void;
  isOffline: boolean;
}

export function HomeView({
  tripInfo,
  journalCount,
  completedTasksRatio,
  onNavigate,
  isOffline
}: HomeViewProps) {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 pt-4 pb-12 flex flex-col gap-6">
      {/* Context Header & Status */}
      <section className="flex flex-col gap-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h1 className="font-['Montserrat',sans-serif] font-bold text-2xl sm:text-3xl text-[#1A1C1A] leading-tight">
              Voyage à {tripInfo.destination}, {tripInfo.startDate.split(' ')[0]}-{tripInfo.endDate.split(' ')[0]} {tripInfo.startDate.split(' ')[1]}
            </h1>
            <p className="text-xs font-mono uppercase tracking-widest text-[#9F402D] mt-0.5">
              Compagnon de séjour • {tripInfo.country}
            </p>
          </div>

          {/* Offline Indicator Pill */}
          <div className="flex items-center gap-1.5 bg-[#E3E2E0] text-[#56423E] px-3 py-1.5 rounded-full text-xs font-medium border border-[#ddc0ba]/40 shadow-2xs">
            <WifiOff className="w-3.5 h-3.5 text-[#9F402D]" />
            <span>{isOffline ? "Mode hors-ligne activé" : "Données locales synchronisées"}</span>
          </div>
        </div>

        {/* Departure Countdown Banner */}
        <div className="bg-[#E2725B] text-white rounded-2xl p-4 sm:p-5 flex items-center gap-4 shadow-[0_6px_20px_rgba(226,114,91,0.25)] border border-[#ffdad3]/20 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-white/5 rounded-l-full pointer-events-none" />
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0 backdrop-blur-xs">
            <PlaneTakeoff className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="font-['Montserrat',sans-serif] font-bold text-lg sm:text-xl">
                J-{tripInfo.daysUntilDeparture} avant le départ
              </p>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase font-mono bg-white/20 rounded-full">
                Prêt
              </span>
            </div>
            <p className="text-sm text-white/90 font-medium">
              Préparez vos valises ! {completedTasksRatio.completed}/{completedTasksRatio.total} éléments cochés
            </p>
          </div>
        </div>
      </section>

      {/* Bento Grid Dashboard */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {/* Programme du jour (Featured Banner - spans 2 cols, 2 rows) */}
        <button
          onClick={() => onNavigate('trajet')}
          className="col-span-2 row-span-2 rounded-2xl overflow-hidden relative shadow-[0_4px_16px_rgba(0,109,91,0.08)] group text-left cursor-pointer min-h-[220px] sm:min-h-[240px] border border-[#ddc0ba]/30 transition-transform active:scale-99 hover:shadow-[0_8px_24px_rgba(0,109,91,0.14)]"
        >
          <img
            src={tripInfo.todayProgram.heroImage}
            alt="Plage de Nosy Be"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1C1A]/90 via-[#1A1C1A]/40 to-transparent" />
          
          <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#9F402D] text-white shadow-xs">
                <Calendar className="w-3.5 h-3.5" />
                Aujourd'hui
              </span>
              <span className="text-white/80 text-xs font-mono bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-xs">
                Jour 1 / 5
              </span>
            </div>

            <div>
              <h3 className="font-['Montserrat',sans-serif] font-bold text-xl sm:text-2xl text-white">
                {tripInfo.todayProgram.title}
              </h3>
              <p className="text-sm font-medium text-[#FAF9F6] opacity-95 mt-1 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#FFDAD3]" />
                {tripInfo.todayProgram.activity}
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs text-[#E2725B] font-semibold">
                <span className="underline underline-offset-4">Voir tout l'itinéraire</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </button>

        {/* Carte Shortcut */}
        <button
          onClick={() => onNavigate('carte')}
          className="col-span-1 rounded-2xl bg-white p-4 flex flex-col items-start justify-between gap-3 shadow-[0_4px_14px_rgba(0,109,91,0.06)] border border-[#ddc0ba]/30 hover:bg-[#FAF9F6] transition-all hover:scale-102 active:scale-98 text-left relative overflow-hidden"
        >
          <div className="absolute -right-4 -top-4 w-20 h-20 bg-[#9DF3DC]/30 rounded-full blur-lg" />
          <div className="w-10 h-10 rounded-xl bg-[#9DF3DC] text-[#006B59] flex items-center justify-center relative z-10 shadow-xs">
            <Map className="w-5 h-5" />
          </div>
          <div className="relative z-10">
            <span className="font-['Montserrat',sans-serif] font-bold text-sm text-[#1A1C1A] block">Carte</span>
            <span className="text-[11px] text-[#56423E] font-medium">Lieux & offline</span>
          </div>
        </button>

        {/* Checklist Shortcut */}
        <button
          onClick={() => onNavigate('liste')}
          className="col-span-1 rounded-2xl bg-[#F5F5DC] p-4 flex flex-col items-start justify-between gap-3 shadow-[0_4px_14px_rgba(0,109,91,0.06)] border border-[#ddc0ba]/30 hover:opacity-95 transition-all hover:scale-102 active:scale-98 text-left relative overflow-hidden"
        >
          <div className="w-10 h-10 rounded-xl bg-white/70 text-[#9F402D] flex items-center justify-center shadow-xs">
            <CheckSquare className="w-5 h-5" />
          </div>
          <div>
            <span className="font-['Montserrat',sans-serif] font-bold text-sm text-[#1A1C1A] block">Checklist</span>
            <span className="text-[11px] text-[#56423E] font-medium">
              {Math.round((completedTasksRatio.completed / (completedTasksRatio.total || 1)) * 100)}% complété
            </span>
          </div>
        </button>

        {/* Phrases utiles Shortcut */}
        <button
          onClick={() => onNavigate('phrases')}
          className="col-span-2 md:col-span-1 rounded-2xl bg-white p-4 flex items-center gap-3 shadow-[0_4px_14px_rgba(0,109,91,0.06)] border border-[#ddc0ba]/30 hover:bg-[#FAF9F6] transition-all hover:scale-102 active:scale-98 text-left"
        >
          <div className="w-10 h-10 rounded-xl bg-[#00A58E]/20 text-[#006B5B] flex items-center justify-center shrink-0 shadow-xs">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <span className="font-['Montserrat',sans-serif] font-bold text-sm text-[#1A1C1A] block">Phrases utiles</span>
            <span className="text-[11px] text-[#56423E]">Lexique Malagasy</span>
          </div>
        </button>

        {/* Convertisseur Shortcut */}
        <button
          onClick={() => onNavigate('convertisseur')}
          className="col-span-1 rounded-2xl bg-white p-4 flex flex-col items-start justify-between gap-3 shadow-[0_4px_14px_rgba(0,109,91,0.06)] border border-[#ddc0ba]/30 hover:bg-[#FAF9F6] transition-all hover:scale-102 active:scale-98 text-left"
        >
          <div className="w-10 h-10 rounded-xl bg-[#E3E2E0] text-[#333333] flex items-center justify-center shadow-xs">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <span className="font-['Montserrat',sans-serif] font-bold text-sm text-[#1A1C1A] block">Convertisseur</span>
            <span className="text-[11px] text-[#56423E]">EUR ↔ MGA</span>
          </div>
        </button>

        {/* Urgences Shortcut */}
        <button
          onClick={() => onNavigate('urgences')}
          className="col-span-1 rounded-2xl bg-[#FFDAD6] text-[#93000A] p-4 flex flex-col items-start justify-between gap-3 shadow-[0_4px_14px_rgba(186,26,26,0.12)] border border-[#BA1A1A]/20 hover:bg-[#ffcdc7] transition-all hover:scale-102 active:scale-98 text-left"
        >
          <div className="w-10 h-10 rounded-xl bg-white/60 text-[#BA1A1A] flex items-center justify-center shadow-xs">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <span className="font-['Montserrat',sans-serif] font-bold text-sm text-[#93000A] block">Urgences</span>
            <span className="text-[11px] text-[#93000A]/80 font-semibold">SOS & Contacts</span>
          </div>
        </button>

        {/* Mes documents Shortcut */}
        <button
          onClick={() => onNavigate('documents')}
          className="col-span-1 md:col-span-2 rounded-2xl bg-white p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 shadow-[0_4px_14px_rgba(0,109,91,0.06)] border border-[#ddc0ba]/30 hover:bg-[#FAF9F6] transition-all hover:scale-102 active:scale-98 text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E8EBFF] text-[#006B59] flex items-center justify-center shrink-0 shadow-xs">
              <Folder className="w-5 h-5" />
            </div>
            <div>
              <span className="font-['Montserrat',sans-serif] font-bold text-sm text-[#1A1C1A] block">Mes documents</span>
              <span className="text-[11px] text-[#56423E]">Passeport, billets & coffre-fort</span>
            </div>
          </div>
          <span className="text-xs font-mono text-[#006B5B] bg-[#9DF3DC]/40 px-2 py-0.5 rounded-md">
            Chiffré local
          </span>
        </button>

        {/* Journal de voyage */}
        <button
          onClick={() => onNavigate('journal')}
          className="col-span-2 md:col-span-2 rounded-2xl bg-white p-4 flex items-center justify-between shadow-[0_4px_14px_rgba(0,109,91,0.06)] border border-[#ddc0ba]/30 hover:bg-[#FAF9F6] transition-all hover:scale-102 active:scale-98 text-left relative overflow-hidden group"
        >
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-[#9F402D]/10 text-[#9F402D] flex items-center justify-center shrink-0 shadow-xs">
              <BookText className="w-5 h-5" />
            </div>
            <div>
              <span className="font-['Montserrat',sans-serif] font-bold text-sm text-[#1A1C1A] block">
                Journal de voyage
              </span>
              <span className="text-xs text-[#56423E]">
                {journalCount} note{journalCount > 1 ? 's' : ''} et photos ajoutées
              </span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-[#89726D] group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Cahier des charges PWA (Stage Specs) Shortcut */}
        <button
          onClick={() => onNavigate('cahier')}
          className="col-span-2 md:col-span-2 rounded-2xl bg-[#1B6B57]/10 p-4 flex items-center justify-between shadow-[0_4px_14px_rgba(0,109,91,0.06)] border border-[#1B6B57]/30 hover:bg-[#1B6B57]/15 transition-all hover:scale-102 active:scale-98 text-left group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1B6B57] text-[#FAF9F6] flex items-center justify-center shrink-0 shadow-xs">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-['Montserrat',sans-serif] font-bold text-sm text-[#1B6B57] block">
                Cahier des charges Pocket Guide
              </span>
              <span className="text-xs text-[#134E40]">
                Spécifications PWA, Merise & Sprints
              </span>
            </div>
          </div>
          <span className="text-xs font-mono uppercase bg-[#1B6B57] text-white px-2.5 py-1 rounded-full group-hover:rotate-[-6deg] transition-transform">
            Doc v0.1
          </span>
        </button>
      </section>
    </div>
  );
}
