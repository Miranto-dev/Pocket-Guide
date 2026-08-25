import { useState, useMemo } from 'react';
import { Place } from '../types';
import { 
  Search, 
  Layers, 
  Navigation, 
  Star, 
  Bookmark, 
  BookmarkCheck, 
  CheckCircle2, 
  Clock, 
  Banknote, 
  Compass, 
  Download, 
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  MapPin,
  Palmtree,
  Utensils,
  Hotel,
  Ship,
  Sparkles
} from 'lucide-react';

interface MapViewProps {
  places: Place[];
  onToggleSavePlace: (placeId: string) => void;
  isOffline: boolean;
}

export function MapView({ places, onToggleSavePlace, isOffline }: MapViewProps) {
  const [selectedPlaceId, setSelectedPlaceId] = useState<string>('andilana');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isSheetExpanded, setIsSheetExpanded] = useState<boolean>(true);
  const [mapLayer, setMapLayer] = useState<'satellite' | 'terrain' | 'vector'>('terrain');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const selectedPlace = useMemo(() => {
    return places.find(p => p.id === selectedPlaceId) || places[0];
  }, [places, selectedPlaceId]);

  const filteredPlaces = useMemo(() => {
    return places.filter(place => {
      const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            place.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            place.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = activeCategory === 'all' || 
                              (activeCategory === 'plages' && place.category === 'plages') ||
                              (activeCategory === 'nature' && (place.category === 'nature' || place.category === 'activites')) ||
                              (activeCategory === 'culture' && place.category === 'culture');
      
      return matchesSearch && matchesCategory;
    });
  }, [places, searchQuery, activeCategory]);

  const handleDownloadOffline = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3500);
  };

  return (
    <div className="relative w-full h-[calc(100vh-64px)] md:h-[calc(100vh-64px)] overflow-hidden bg-[#E9E8E5]">
      {/* Map Canvas Background */}
      <div className="absolute inset-0 z-0">
        {/* Stylized Topographic & Satellite Map Background */}
        <div 
          className={`w-full h-full bg-cover bg-center transition-all duration-500 ${
            mapLayer === 'satellite' 
              ? 'filter saturate-125' 
              : mapLayer === 'terrain'
              ? 'filter contrast-105'
              : 'filter sepia-25'
          }`}
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />

        {/* Map Topography Overlay */}
        <div className="absolute inset-0 bg-[#006B5B]/25 mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#1A1C1A]/20 to-[#1A1C1A]/40 pointer-events-none" />

        {/* Vector SVG Roads, Trails, Reefs and Coral details */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-60">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          {/* Main island loop road */}
          <path d="M 120,180 Q 250,90 420,140 T 680,320 T 540,560 T 260,520 Z" fill="none" stroke="#FAF9F6" strokeWidth="3" strokeDasharray="6,4" />
          <path d="M 280,240 Q 380,280 480,240 T 600,420" fill="none" stroke="#E2725B" strokeWidth="2.5" />
          {/* Coral Reef dotted outline */}
          <path d="M 80,120 Q 300,40 500,80 T 780,280 T 620,640 T 180,600 Z" fill="none" stroke="#9DF3DC" strokeWidth="1.5" strokeDasharray="3,6" />
        </svg>

        {/* Dynamic Map Pins */}
        {filteredPlaces.map((place) => {
          const isSelected = place.id === selectedPlaceId;
          return (
            <button
              key={place.id}
              onClick={() => {
                setSelectedPlaceId(place.id);
                setIsSheetExpanded(true);
              }}
              style={{
                left: `${place.coordinates.x}%`,
                top: `${place.coordinates.y}%`
              }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer transition-all duration-300 ${
                isSelected ? 'scale-115 z-30' : 'hover:scale-110'
              }`}
            >
              <div className="flex flex-col items-center">
                {/* Pin Badge */}
                <div
                  className={`p-2.5 rounded-full shadow-[0_6px_16px_rgba(0,0,0,0.3)] transition-all flex items-center justify-center ${
                    isSelected
                      ? 'bg-[#9F402D] text-white ring-4 ring-white/80 ring-offset-1 animate-bounce'
                      : place.category === 'plages'
                      ? 'bg-[#006B5B] text-white'
                      : place.category === 'nature'
                      ? 'bg-[#1B6B57] text-white'
                      : 'bg-[#E2725B] text-white'
                  }`}
                >
                  {place.category === 'plages' ? (
                    <Palmtree className="w-4 h-4" />
                  ) : place.category === 'nature' ? (
                    <Compass className="w-4 h-4" />
                  ) : place.category === 'culture' ? (
                    <Sparkles className="w-4 h-4" />
                  ) : (
                    <Ship className="w-4 h-4" />
                  )}
                </div>
                {/* Pin Tooltip */}
                <span className={`mt-1 px-2 py-0.5 rounded-md text-[11px] font-bold font-['Montserrat',sans-serif] whitespace-nowrap shadow-md transition-all ${
                  isSelected
                    ? 'bg-[#1A1C1A] text-white opacity-100 scale-105'
                    : 'bg-white/90 text-[#1A1C1A] opacity-90 group-hover:opacity-100'
                }`}>
                  {place.name}
                </span>
                {/* Dot Base */}
                <div className={`w-2 h-2 rounded-full mt-0.5 ${isSelected ? 'bg-[#9F402D]' : 'bg-black/60'}`} />
              </div>
            </button>
          );
        })}

        {/* User Current Geolocation Pulse Marker */}
        <div className="absolute top-[48%] left-[45%] -translate-x-1/2 -translate-y-1/2 z-15 pointer-events-none">
          <div className="relative flex h-6 w-6 items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A58E] opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#006B5B] border-2 border-white shadow-xs" />
          </div>
        </div>
      </div>

      {/* Top Search & Filter Bar */}
      <div className="absolute top-4 left-4 right-4 max-w-xl mx-auto z-30 flex flex-col gap-2">
        <div className="bg-white/95 backdrop-blur-md rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.12)] flex items-center px-4 py-2.5 border border-[#ddc0ba]/40">
          <Search className="w-4 h-4 text-[#89726D] mr-3 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un lieu, plage, île..."
            className="bg-transparent border-none outline-hidden text-sm text-[#1A1C1A] w-full placeholder:text-[#89726D]"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="text-xs text-[#89726D] hover:text-[#1A1C1A] font-semibold mr-2"
            >
              Effacer
            </button>
          )}
          <SlidersHorizontal className="w-4 h-4 text-[#89726D] shrink-0" />
        </div>

        {/* Filter Chips (Horizontal Scrollable) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => setActiveCategory('all')}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all ${
              activeCategory === 'all'
                ? 'bg-[#9F402D] text-white scale-102'
                : 'bg-white/90 text-[#56423E] hover:bg-white border border-[#ddc0ba]/30'
            }`}
          >
            <span>Tout ({places.length})</span>
          </button>
          <button
            onClick={() => setActiveCategory('plages')}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all ${
              activeCategory === 'plages'
                ? 'bg-[#9F402D] text-white scale-102'
                : 'bg-white/90 text-[#56423E] hover:bg-white border border-[#ddc0ba]/30'
            }`}
          >
            <Palmtree className="w-3.5 h-3.5 text-[#006B59]" />
            <span>Plages & Îles</span>
          </button>
          <button
            onClick={() => setActiveCategory('nature')}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all ${
              activeCategory === 'nature'
                ? 'bg-[#9F402D] text-white scale-102'
                : 'bg-white/90 text-[#56423E] hover:bg-white border border-[#ddc0ba]/30'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-[#006B59]" />
            <span>Réserves & Activités</span>
          </button>
          <button
            onClick={() => setActiveCategory('culture')}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all ${
              activeCategory === 'culture'
                ? 'bg-[#9F402D] text-white scale-102'
                : 'bg-white/90 text-[#56423E] hover:bg-white border border-[#ddc0ba]/30'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E2725B]" />
            <span>Culture & Marchés</span>
          </button>
        </div>
      </div>

      {/* Floating Map Controls */}
      <div className="absolute right-4 top-28 z-30 flex flex-col gap-2">
        {/* Offline Badge */}
        <div className="bg-[#006B59] text-white px-3 py-1 rounded-full flex items-center gap-1.5 text-xs font-semibold shadow-sm">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#9DF3DC]" />
          <span className="hidden sm:inline">Carte disponible</span> hors-ligne
        </div>

        {/* Locate Me */}
        <button
          onClick={() => {
            setSelectedPlaceId('andilana');
            setIsSheetExpanded(true);
          }}
          className="w-10 h-10 bg-white hover:bg-[#FAF9F6] text-[#1A1C1A] rounded-full shadow-md flex items-center justify-center transition-all hover:scale-105 active:scale-95 border border-[#ddc0ba]/30"
          title="Centrer sur ma position"
        >
          <Navigation className="w-4 h-4 text-[#006B5B]" />
        </button>

        {/* Switch Layer */}
        <button
          onClick={() => {
            setMapLayer(prev => prev === 'terrain' ? 'satellite' : prev === 'satellite' ? 'vector' : 'terrain');
          }}
          className="w-10 h-10 bg-white hover:bg-[#FAF9F6] text-[#1A1C1A] rounded-full shadow-md flex items-center justify-center transition-all hover:scale-105 active:scale-95 border border-[#ddc0ba]/30"
          title="Changer de vue (Satellite / Terrain / Plan)"
        >
          <Layers className="w-4 h-4 text-[#9F402D]" />
        </button>

        {/* Download Map Pack */}
        <button
          onClick={handleDownloadOffline}
          className="w-10 h-10 bg-[#E2725B] hover:bg-[#9F402D] text-white rounded-full shadow-md flex items-center justify-center transition-all hover:scale-105 active:scale-95"
          title="Pré-télécharger la carte de Nosy Be"
        >
          <Download className="w-4 h-4" />
        </button>
      </div>

      {/* Download Alert Banner */}
      {downloadSuccess && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-40 bg-[#006B5B] text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-lg flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-[#9DF3DC]" />
          <span>Pack cartographique Nosy Be (32 Mo) sauvegardé hors-ligne !</span>
        </div>
      )}

      {/* Bottom Sheet Place Details (Expandable & Draggable style) */}
      <div 
        className={`absolute bottom-0 left-0 right-0 z-30 bg-[#FAF9F6] rounded-t-3xl shadow-[0_-8px_30px_rgba(0,109,91,0.15)] border-t border-[#ddc0ba]/40 transition-all duration-300 max-w-3xl mx-auto ${
          isSheetExpanded ? 'max-h-[72vh] md:max-h-[60vh] translate-y-0' : 'max-h-24 translate-y-0'
        } overflow-hidden flex flex-col`}
      >
        {/* Drag / Toggle Header */}
        <div 
          onClick={() => setIsSheetExpanded(!isSheetExpanded)}
          className="w-full pt-3 pb-2 flex flex-col items-center justify-center cursor-pointer hover:bg-[#EFEEEB]/50 transition-colors"
        >
          <div className="w-12 h-1.5 bg-[#E3E2E0] rounded-full mb-1" />
          <div className="flex items-center gap-1 text-[11px] font-mono uppercase text-[#89726D]">
            <span>{isSheetExpanded ? "Réduire la fiche" : "Afficher les détails de " + selectedPlace.name}</span>
            {isSheetExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </div>
        </div>

        {/* Sheet Body Content */}
        <div className="px-5 pb-20 md:pb-6 overflow-y-auto">
          {/* Images Horizontal Gallery */}
          <div className="flex gap-3 overflow-x-auto pb-3 mb-3 snap-x no-scrollbar">
            {selectedPlace.images.map((imgUrl, i) => (
              <div key={i} className="w-64 h-36 shrink-0 rounded-2xl overflow-hidden snap-center shadow-xs relative">
                <img src={imgUrl} alt={selectedPlace.name} className="w-full h-full object-cover" />
                <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] font-mono px-2 py-0.5 rounded-full">
                  {i + 1}/{selectedPlace.images.length}
                </span>
              </div>
            ))}
          </div>

          {/* Place Header Info */}
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="font-['Montserrat',sans-serif] font-bold text-xl sm:text-2xl text-[#1A1C1A]">
                {selectedPlace.name}
              </h2>
              <div className="flex items-center gap-2 text-xs text-[#56423E] mt-1 flex-wrap">
                <div className="flex items-center text-[#9F402D] font-bold">
                  <Star className="w-3.5 h-3.5 fill-current mr-1" />
                  <span>{selectedPlace.rating}</span>
                </div>
                <span>•</span>
                <span className="font-medium">{selectedPlace.categoryLabel}</span>
                <span>•</span>
                <span>{selectedPlace.distance}</span>
                <span>•</span>
                <span className="text-[#006B59] font-medium">{selectedPlace.duration}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleSavePlace(selectedPlace.id)}
                className={`p-2.5 rounded-xl border transition-colors ${
                  selectedPlace.saved
                    ? 'bg-[#E2725B]/20 border-[#E2725B] text-[#9F402D]'
                    : 'bg-white border-[#ddc0ba]/60 text-[#89726D] hover:bg-[#FAF9F6]'
                }`}
                title={selectedPlace.saved ? "Enregistré dans vos favoris" : "Enregistrer dans vos favoris"}
              >
                {selectedPlace.saved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-[#1A1C1A]/80 leading-relaxed mt-2 mb-4">
            {selectedPlace.description}
          </p>

          {/* Highlights Pills */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {selectedPlace.highlights.map((item, idx) => (
              <span key={idx} className="px-2.5 py-1 rounded-lg text-xs bg-[#FAF9F6] border border-[#ddc0ba]/40 text-[#56423E]">
                ✓ {item}
              </span>
            ))}
          </div>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#ddc0ba]/30 mb-4 bg-white/50 rounded-xl px-3">
            <div className="flex flex-col items-center text-center">
              <Clock className="w-4 h-4 text-[#006B5B] mb-1" />
              <span className="text-[11px] font-medium text-[#56423E]">{selectedPlace.openingHours}</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Banknote className="w-4 h-4 text-[#9F402D] mb-1" />
              <span className="text-[11px] font-medium text-[#56423E]">{selectedPlace.price}</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <MapPin className="w-4 h-4 text-[#006B59] mb-1" />
              <span className="text-[11px] font-medium text-[#56423E]">{selectedPlace.distance}</span>
            </div>
          </div>

          {/* Tips box if any */}
          {selectedPlace.tips && (
            <div className="p-3 rounded-xl bg-[#F5F5DC] border border-[#ddc0ba]/40 text-xs text-[#56423E] mb-4">
              <strong className="text-[#9F402D] font-semibold">Conseil du guide local : </strong>
              {selectedPlace.tips}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => {
                alert(`Itinéraire vers ${selectedPlace.name} calculé sans connexion ! Durée estimée : ${selectedPlace.duration}`);
              }}
              className="flex-1 bg-[#E2725B] hover:bg-[#9F402D] text-white py-3 px-4 rounded-xl font-['Montserrat',sans-serif] font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-colors active:scale-98"
            >
              <Navigation className="w-4 h-4" />
              Lancer l'itinéraire
            </button>
            <button
              onClick={() => onToggleSavePlace(selectedPlace.id)}
              className="px-4 py-3 bg-white border border-[#ddc0ba]/60 text-[#9F402D] rounded-xl text-xs font-semibold hover:bg-[#FAF9F6] transition-colors"
            >
              {selectedPlace.saved ? 'Enregistré' : 'Favoris'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
