import { useState } from 'react';
import { 
  FileCode, 
  CheckCircle2, 
  Database, 
  Smartphone, 
  Layers, 
  Sparkles, 
  Flame, 
  WifiOff, 
  BookOpen, 
  ShieldCheck, 
  Cpu, 
  Compass, 
  Coins, 
  AlertTriangle,
  FolderLock
} from 'lucide-react';

export function CahierView() {
  const [activeTab, setActiveTab] = useState<'overview' | 'merise' | 'sprints' | 'audit'>('overview');

  const specsChecklist = [
    { label: "Application PWA Responsive & Mobile-First", status: "Validé", desc: "Manifest PWA, Meta-tags, responsive sur mobile, tablette et desktop" },
    { label: "Mode 100% Hors-ligne (Offline-First)", status: "Validé", desc: "Toutes les données (cartes, lexique, taux, SOS) disponibles sans connexion" },
    { label: "Charte Graphique & Palette Terroir", status: "Validé", desc: "Terracotta (#E2725B), Vert Canopée / Teal (#006B5B), Écru Sable (#FAF9F6)" },
    { label: "Typography System (Fraunces & Montserrat)", status: "Validé", desc: "Hiérarchie avec ratios proportionnels, badges mono et contrastes WCAG AA" },
    { label: "Dashboard Bento Grid & Compte à rebours", status: "Validé", desc: "Programme du jour, météo, raccourcis vers tous les modules" },
    { label: "Carte Interactive Hors-ligne & Bottom Sheet", status: "Validé", desc: "Points d'intérêts Nosy Be, filtres catégories, fiches détaillées" },
    { label: "Itinéraire Chronologique Multi-Jours", status: "Validé", desc: "Jours 1 à 5, timeline visuelle, check des activités et ajout personnalisé" },
    { label: "Checklist de Voyage & Calculateur de Progression", status: "Validé", desc: "4 catégories (Documents, Vêtements, Santé, Électronique), confetti à 100%" },
    { label: "Phrases Utiles Malagasy & Synthèse Vocale", status: "Validé", desc: "Lexique bilingue avec phonétique et lecture audio intégrée" },
    { label: "Convertisseur de Devises EUR ↔ MGA avec Clavier", status: "Validé", desc: "Calcul instantané, présélections, inversion et édition du taux" },
    { label: "Section Urgences SOS & Contacts Locaux", status: "Validé", desc: "Bouton SOS pulsant, coordonnées GPS et appels directs 117/24-7" },
    { label: "Coffre-fort Documents Chiffré & QR Code", status: "Validé", desc: "Passeports, billets avec carte d'embarquement QR code, assurances" },
    { label: "Journal de Voyage avec Photos & Géolocalisation", status: "Validé", desc: "Carnet de bord visuel, anecdotes, dates et filtres de souvenirs" },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-4 pb-28 flex flex-col gap-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#006B59] font-bold mb-1">
          <FileCode className="w-4 h-4" />
          <span>Documentation Projet • Cahier des Charges Pocket Guide</span>
        </div>
        <h1 className="font-['Montserrat',sans-serif] font-bold text-2xl sm:text-3xl text-[#1A1C1A]">
          Spécifications & Conformité PWA
        </h1>
        <p className="text-sm text-[#56423E] mt-1">
          Suivi des exigences fonctionnelles, modélisation des données Merise et validation des sprints de développement.
        </p>
      </div>

      {/* Navigation Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-full text-xs font-['Montserrat',sans-serif] font-bold tracking-wide transition-all shadow-xs shrink-0 ${
            activeTab === 'overview'
              ? 'bg-[#E2725B] text-white'
              : 'bg-white text-[#56423E] hover:bg-[#FAF9F6] border border-[#ddc0ba]/40'
          }`}
        >
          Vue d'ensemble & Design System
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2 rounded-full text-xs font-['Montserrat',sans-serif] font-bold tracking-wide transition-all shadow-xs shrink-0 ${
            activeTab === 'audit'
              ? 'bg-[#E2725B] text-white'
              : 'bg-white text-[#56423E] hover:bg-[#FAF9F6] border border-[#ddc0ba]/40'
          }`}
        >
          Matrice d'Exigences ({specsChecklist.length}/{specsChecklist.length})
        </button>
        <button
          onClick={() => setActiveTab('merise')}
          className={`px-4 py-2 rounded-full text-xs font-['Montserrat',sans-serif] font-bold tracking-wide transition-all shadow-xs shrink-0 ${
            activeTab === 'merise'
              ? 'bg-[#E2725B] text-white'
              : 'bg-white text-[#56423E] hover:bg-[#FAF9F6] border border-[#ddc0ba]/40'
          }`}
        >
          Modélisation Merise (MCD/MLD)
        </button>
        <button
          onClick={() => setActiveTab('sprints')}
          className={`px-4 py-2 rounded-full text-xs font-['Montserrat',sans-serif] font-bold tracking-wide transition-all shadow-xs shrink-0 ${
            activeTab === 'sprints'
              ? 'bg-[#E2725B] text-white'
              : 'bg-white text-[#56423E] hover:bg-[#FAF9F6] border border-[#ddc0ba]/40'
          }`}
        >
          Planning des Sprints
        </button>
      </div>

      {/* Tab Content: Overview */}
      {activeTab === 'overview' && (
        <div className="flex flex-col gap-5">
          {/* Brand & Concept summary card */}
          <div className="bg-white rounded-3xl p-6 shadow-[0_4px_16px_rgba(0,109,91,0.06)] border border-[#ddc0ba]/40">
            <h2 className="font-['Montserrat',sans-serif] font-bold text-xl text-[#1A1C1A] mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#9F402D]" />
              Identité de Pocket Guide — Nosy Be
            </h2>
            <p className="text-sm text-[#56423E] leading-relaxed mb-4">
              Pocket Guide est un compagnon de voyage nomade conçu spécifiquement pour les séjours à Madagascar.
              L'application privilégie l'accès immédiat aux informations critiques sans réseau cellulaire, avec une ergonomie tactile haut de gamme.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#ddc0ba]/40">
                <span className="text-[10px] font-mono uppercase text-[#9F402D] font-bold block">Palette Terroir</span>
                <span className="font-bold text-sm text-[#1A1C1A] block mt-0.5">Terracotta & Teal</span>
                <p className="text-xs text-[#56423E] mt-1">Inspirée de la latérite malgache et des lagons de Nosy Be.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#ddc0ba]/40">
                <span className="text-[10px] font-mono uppercase text-[#006B5B] font-bold block">Typographie</span>
                <span className="font-bold text-sm text-[#1A1C1A] block mt-0.5">Montserrat & Fraunces</span>
                <p className="text-xs text-[#56423E] mt-1">Titres chaleureux et lisibilité maximale en plein soleil.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#ddc0ba]/40">
                <span className="text-[10px] font-mono uppercase text-[#005144] font-bold block">Architecture PWA</span>
                <span className="font-bold text-sm text-[#1A1C1A] block mt-0.5">Offline-First</span>
                <p className="text-xs text-[#56423E] mt-1">Stockage local, audio synthétisé WebAudio et cartes en cache.</p>
              </div>
            </div>
          </div>

          {/* Core Modules Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-[#ddc0ba]/40">
              <Compass className="w-6 h-6 text-[#006B5B] mb-2" />
              <h3 className="font-bold text-sm text-[#1A1C1A]">Carte Interactive</h3>
              <p className="text-xs text-[#56423E] mt-1">Points d'intérêts géoréférencés, filtres par catégorie, bottom-sheet rétractable et pack hors-ligne téléchargeable.</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#ddc0ba]/40">
              <Coins className="w-6 h-6 text-[#9F402D] mb-2" />
              <h3 className="font-bold text-sm text-[#1A1C1A]">Convertisseur MGA/EUR</h3>
              <p className="text-xs text-[#56423E] mt-1">Pavé numérique tactile, conversions bidirectionnelles instantanées et taux d'échange ajustable.</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#ddc0ba]/40">
              <AlertTriangle className="w-6 h-6 text-[#BA1A1A] mb-2" />
              <h3 className="font-bold text-sm text-[#1A1C1A]">Module Urgences SOS</h3>
              <p className="text-xs text-[#56423E] mt-1">Bouton SOS pulsant, coordonnées GPS pour secouristes, numéros 117 / 118 et assistance 24/7.</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#ddc0ba]/40">
              <FolderLock className="w-6 h-6 text-[#005144] mb-2" />
              <h3 className="font-bold text-sm text-[#1A1C1A]">Coffre-fort Documents</h3>
              <p className="text-xs text-[#56423E] mt-1">Passeports, billets avec carte d'embarquement QR Code et stockage de photos crypté local.</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#ddc0ba]/40">
              <ShieldCheck className="w-6 h-6 text-[#E2725B] mb-2" />
              <h3 className="font-bold text-sm text-[#1A1C1A]">Checklist Valise</h3>
              <p className="text-xs text-[#56423E] mt-1">4 catégories essentielles, calcul de progression en temps réel et animation de félicitations.</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#ddc0ba]/40">
              <BookOpen className="w-6 h-6 text-[#006B59] mb-2" />
              <h3 className="font-bold text-sm text-[#1A1C1A]">Journal & Lexique</h3>
              <p className="text-xs text-[#56423E] mt-1">Photos souvenirs, anecdotes géolocalisées et phrases utiles avec prononciation audio Malagasy.</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Requirements Checklist */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-3xl p-6 shadow-[0_4px_16px_rgba(0,109,91,0.06)] border border-[#ddc0ba]/40">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-['Montserrat',sans-serif] font-bold text-lg text-[#1A1C1A]">
              Validation du Cahier des Charges
            </h2>
            <span className="text-xs font-mono bg-[#9DF3DC] text-[#005144] font-bold px-3 py-1 rounded-full">
              100% Conforme
            </span>
          </div>

          <div className="space-y-3">
            {specsChecklist.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#ddc0ba]/30">
                <CheckCircle2 className="w-5 h-5 text-[#006B5B] shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-['Montserrat',sans-serif] font-bold text-sm text-[#1A1C1A]">
                      {item.label}
                    </span>
                    <span className="text-[11px] font-mono text-[#006B5B] font-bold">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#56423E] mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: Merise MCD / MLD */}
      {activeTab === 'merise' && (
        <div className="bg-white rounded-3xl p-6 shadow-[0_4px_16px_rgba(0,109,91,0.06)] border border-[#ddc0ba]/40 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-[#006B5B]" />
            <h2 className="font-['Montserrat',sans-serif] font-bold text-lg text-[#1A1C1A]">
              Modélisation des Données (Merise)
            </h2>
          </div>
          <p className="text-sm text-[#56423E]">
            Structure relationnelle des entités de l'application Pocket Guide :
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            {/* Entity 1: TRIP */}
            <div className="bg-[#FAF9F6] p-4 rounded-2xl border border-[#ddc0ba]">
              <span className="text-[#9F402D] font-bold text-sm block mb-1">ENTITÉ : VOYAGE</span>
              <ul className="space-y-1 text-[#56423E]">
                <li><strong className="text-[#1A1C1A]"># id_voyage</strong> (PK, VARCHAR)</li>
                <li>- destination (VARCHAR)</li>
                <li>- date_depart (DATE)</li>
                <li>- date_retour (DATE)</li>
                <li>- pays (VARCHAR)</li>
              </ul>
            </div>

            {/* Entity 2: ETAPE / ITINERAIRE */}
            <div className="bg-[#FAF9F6] p-4 rounded-2xl border border-[#ddc0ba]">
              <span className="text-[#006B5B] font-bold text-sm block mb-1">ENTITÉ : ACTIVITE_ITINERAIRE</span>
              <ul className="space-y-1 text-[#56423E]">
                <li><strong className="text-[#1A1C1A]"># id_activite</strong> (PK, VARCHAR)</li>
                <li>- # id_jour (FK)</li>
                <li>- titre, heure, duree</li>
                <li>- description, type, image</li>
              </ul>
            </div>

            {/* Entity 3: LIEU / POI */}
            <div className="bg-[#FAF9F6] p-4 rounded-2xl border border-[#ddc0ba]">
              <span className="text-[#E2725B] font-bold text-sm block mb-1">ENTITÉ : POINT_INTERET</span>
              <ul className="space-y-1 text-[#56423E]">
                <li><strong className="text-[#1A1C1A]"># id_lieu</strong> (PK, VARCHAR)</li>
                <li>- nom, categorie, coord_x, coord_y</li>
                <li>- note_moyenne, horaires, tarif</li>
                <li>- est_enregistre (BOOLEAN)</li>
              </ul>
            </div>

            {/* Entity 4: CHECKLIST */}
            <div className="bg-[#FAF9F6] p-4 rounded-2xl border border-[#ddc0ba]">
              <span className="text-[#005144] font-bold text-sm block mb-1">ENTITÉ : ELEMENT_CHECKLIST</span>
              <ul className="space-y-1 text-[#56423E]">
                <li><strong className="text-[#1A1C1A]"># id_item</strong> (PK, VARCHAR)</li>
                <li>- # id_categorie (FK)</li>
                <li>- libelle (VARCHAR)</li>
                <li>- est_coche (BOOLEAN)</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Sprints */}
      {activeTab === 'sprints' && (
        <div className="bg-white rounded-3xl p-6 shadow-[0_4px_16px_rgba(0,109,91,0.06)] border border-[#ddc0ba]/40">
          <h2 className="font-['Montserrat',sans-serif] font-bold text-lg text-[#1A1C1A] mb-3">
            Déroulement des Sprints Agiles
          </h2>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[#FAF9F6] border-l-4 border-[#006B5B]">
              <span className="text-xs font-mono text-[#006B5B] font-bold">SPRINT 1 : FONDATIONS & DESIGN SYSTEM</span>
              <p className="text-sm font-semibold text-[#1A1C1A] mt-0.5">Configuration PWA, Charte Graphique, Header & Navigation</p>
              <p className="text-xs text-[#56423E] mt-1">Mise en place de Vite React 19, Tailwind CSS 4, typographies Google Fonts et structure modulaire.</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF9F6] border-l-4 border-[#E2725B]">
              <span className="text-xs font-mono text-[#E2725B] font-bold">SPRINT 2 : VUES ESSENTIELLES & MULTIMÉDIA</span>
              <p className="text-sm font-semibold text-[#1A1C1A] mt-0.5">Carte Interactive, Itinéraire dynamique & Checklist</p>
              <p className="text-xs text-[#56423E] mt-1">Création des fiches POI, de la timeline journalière, de la gestion des valises et du mode offline.</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF9F6] border-l-4 border-[#BA1A1A]">
              <span className="text-xs font-mono text-[#BA1A1A] font-bold">SPRINT 3 : CONVERTISSEUR, SOS & SÉCURITÉ</span>
              <p className="text-sm font-semibold text-[#1A1C1A] mt-0.5">Convertisseur EUR/MGA, Alerte SOS, Coffre-fort & Journal</p>
              <p className="text-xs text-[#56423E] mt-1">Calculateur de devises, phrases malagasy avec voix audio, affichage de billets QR code et album photo.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
