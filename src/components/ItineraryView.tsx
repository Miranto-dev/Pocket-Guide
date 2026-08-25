import { useState, type FormEvent } from 'react';
import { DayItinerary, Activity } from '../types';
import { 
  Coffee, 
  Sailboat, 
  Utensils, 
  Footprints, 
  Sun, 
  Waves, 
  Landmark, 
  Trees, 
  MapPin, 
  Clock, 
  Plus, 
  CheckCircle2, 
  Check, 
  Compass,
  CalendarDays
} from 'lucide-react';

interface ItineraryViewProps {
  itineraries: DayItinerary[];
  onAddActivity: (dayNumber: number, activity: Omit<Activity, 'id'>) => void;
  onLocateOnMap?: (placeId?: string) => void;
}

export function ItineraryView({ itineraries, onAddActivity, onLocateOnMap }: ItineraryViewProps) {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [completedActivities, setCompletedActivities] = useState<Record<string, boolean>>({});

  // New activity form state
  const [newTitle, setNewTitle] = useState('');
  const [newTime, setNewTime] = useState('14:00');
  const [newDuration, setNewDuration] = useState('1.5 h');
  const [newDesc, setNewDesc] = useState('');
  const [newLocation, setNewLocation] = useState('');

  const currentItinerary = itineraries.find(d => d.dayNumber === selectedDay) || itineraries[0];

  const toggleComplete = (actId: string) => {
    setCompletedActivities(prev => ({
      ...prev,
      [actId]: !prev[actId]
    }));
  };

  const handleCreateActivity = (e: FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddActivity(selectedDay, {
      title: newTitle.trim(),
      time: newTime,
      duration: newDuration,
      description: newDesc.trim() || 'Activité libre personnalisée',
      type: 'visit',
      icon: 'star',
      location: newLocation.trim() || 'Nosy Be'
    });

    setNewTitle('');
    setNewDesc('');
    setNewLocation('');
    setShowAddModal(false);
  };

  const renderIcon = (type: string) => {
    switch (type) {
      case 'food':
        return <Coffee className="w-5 h-5 text-[#FF6D4D]" />;
      case 'boat':
        return <Sailboat className="w-5 h-5 text-[#006B5B]" />;
      case 'beach':
        return <Waves className="w-5 h-5 text-[#00A58E]" />;
      case 'hike':
        return <Footprints className="w-5 h-5 text-[#9F402D]" />;
      case 'relax':
        return <Sun className="w-5 h-5 text-[#E2725B]" />;
      case 'visit':
        return <Landmark className="w-5 h-5 text-[#006B59]" />;
      default:
        return <Utensils className="w-5 h-5 text-[#89726D]" />;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 pt-4 pb-20 flex flex-col">
      {/* Header Section */}
      <div className="mb-4">
        <p className="text-xs font-mono uppercase tracking-widest text-[#006B59] font-bold mb-1">
          Nosy Be, Madagascar
        </p>
        <div className="flex items-center justify-between">
          <h1 className="font-['Montserrat',sans-serif] font-bold text-2xl sm:text-3xl text-[#1A1C1A]">
            Votre Itinéraire
          </h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#E2725B] hover:bg-[#9F402D] text-white rounded-full text-xs font-semibold shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ajouter une étape</span>
          </button>
        </div>
      </div>

      {/* Day Tabs (Horizontal Scrollable) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6">
        {itineraries.map((itinerary) => {
          const isActive = itinerary.dayNumber === selectedDay;
          return (
            <button
              key={itinerary.dayNumber}
              onClick={() => setSelectedDay(itinerary.dayNumber)}
              className={`shrink-0 px-5 py-2 rounded-full text-xs font-['Montserrat',sans-serif] font-bold tracking-wide transition-all shadow-xs ${
                isActive
                  ? 'bg-[#E2725B] text-white scale-102 shadow-sm'
                  : 'bg-[#EFEEEB] text-[#56423E] hover:bg-[#E3E2E0]/80'
              }`}
            >
              Jour {itinerary.dayNumber}
            </button>
          );
        })}
      </div>

      {/* Selected Day Summary Card */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-[0_4px_16px_rgba(0,109,91,0.06)] border border-[#ddc0ba]/30 mb-6">
        <div className="flex items-center justify-between text-xs text-[#89726D] font-mono mb-1">
          <span className="flex items-center gap-1.5 text-[#006B5B] font-semibold">
            <CalendarDays className="w-3.5 h-3.5" />
            {currentItinerary.date}
          </span>
          <span>{currentItinerary.activities.length} activités prévues</span>
        </div>
        <h2 className="font-['Montserrat',sans-serif] font-bold text-lg text-[#1A1C1A]">
          {currentItinerary.title}
        </h2>
        <p className="text-sm text-[#56423E] mt-1">
          {currentItinerary.summary}
        </p>
      </div>

      {/* Timeline Section */}
      <div className="relative flex flex-col gap-5 pl-2 sm:pl-4">
        {/* Continuous Timeline Connector Line */}
        <div className="absolute left-[27px] sm:left-[35px] top-6 bottom-6 w-0.5 bg-[#E3E2E0] z-0" />

        {currentItinerary.activities.map((activity, index) => {
          const isDone = completedActivities[activity.id];

          return (
            <div key={activity.id} className="relative flex items-start gap-4 z-10 group">
              {/* Icon Bubble */}
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-2 transition-all shadow-xs ${
                  isDone 
                    ? 'bg-[#006B5B] border-[#006B5B] text-white' 
                    : activity.type === 'boat'
                    ? 'bg-[#006B5B]/10 border-[#006B5B]/30'
                    : activity.type === 'food'
                    ? 'bg-[#E2725B]/15 border-[#E2725B]/30'
                    : 'bg-[#EFEEEB] border-[#ddc0ba]/40'
                }`}
              >
                {isDone ? (
                  <Check className="w-5 h-5 text-white stroke-[3]" />
                ) : (
                  renderIcon(activity.type)
                )}
              </div>

              {/* Activity Card */}
              <div className={`flex-1 bg-white p-4 sm:p-5 rounded-2xl shadow-[0_4px_14px_rgba(0,109,91,0.06)] border transition-all ${
                isDone ? 'border-[#006B5B]/30 bg-[#FAF9F6]/80 opacity-75' : 'border-[#ddc0ba]/30 hover:border-[#E2725B]/40'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#9F402D] bg-[#FFDAD3]/50 px-2 py-0.5 rounded-md">
                      {activity.time}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#EFEEEB] text-[11px] font-medium text-[#56423E] flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#89726D]" />
                      {activity.duration}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleComplete(activity.id)}
                    className={`text-xs px-2.5 py-1 rounded-full flex items-center gap-1 font-medium transition-colors ${
                      isDone 
                        ? 'bg-[#006B5B]/15 text-[#006B5B]' 
                        : 'bg-[#EFEEEB] text-[#56423E] hover:bg-[#E3E2E0]'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isDone ? 'Terminé' : 'Fait'}</span>
                  </button>
                </div>

                <h3 className={`font-['Montserrat',sans-serif] font-bold text-base sm:text-lg text-[#1A1C1A] mb-1 ${
                  isDone ? 'line-through opacity-70' : ''
                }`}>
                  {activity.title}
                </h3>

                <p className="text-sm text-[#56423E] leading-relaxed mb-3">
                  {activity.description}
                </p>

                {/* Optional Activity Image */}
                {activity.image && (
                  <div className="h-36 sm:h-44 w-full rounded-xl overflow-hidden relative mb-3 shadow-xs">
                    <img
                      src={activity.image}
                      alt={activity.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-3 text-white text-xs font-medium flex items-center gap-1">
                      <Sailboat className="w-3.5 h-3.5 text-[#9DF3DC]" />
                      <span>{activity.location || "Madagascar"}</span>
                    </div>
                  </div>
                )}

                {/* Location & Map Shortcut */}
                {activity.location && (
                  <div className="flex items-center justify-between text-xs text-[#89726D] pt-2 border-t border-[#ddc0ba]/20">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#9F402D]" />
                      {activity.location}
                    </span>
                    {activity.placeId && onLocateOnMap && (
                      <button
                        onClick={() => onLocateOnMap(activity.placeId)}
                        className="text-[#006B5B] hover:underline font-semibold flex items-center gap-1"
                      >
                        <Compass className="w-3 h-3" />
                        Voir sur carte
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Activity Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF9F6] rounded-3xl p-6 w-full max-w-md shadow-2xl border border-[#ddc0ba]/40">
            <h3 className="font-['Montserrat',sans-serif] font-bold text-xl text-[#1A1C1A] mb-1">
              Ajouter une activité au Jour {selectedDay}
            </h3>
            <p className="text-xs text-[#56423E] mb-4">
              Personnalisez votre carnet de voyage avec vos propres étapes
            </p>

            <form onSubmit={handleCreateActivity} className="flex flex-col gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#1A1C1A] mb-1">Titre de l'activité</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Balade au marché, Visite d'un village..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-white border border-[#ddc0ba] rounded-xl px-3 py-2 text-sm text-[#1A1C1A] focus:ring-2 focus:ring-[#006B5B] outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1A1C1A] mb-1">Heure</label>
                  <input
                    type="text"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    placeholder="14:00"
                    className="w-full bg-white border border-[#ddc0ba] rounded-xl px-3 py-2 text-sm text-[#1A1C1A] focus:ring-2 focus:ring-[#006B5B] outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1A1C1A] mb-1">Durée estimée</label>
                  <input
                    type="text"
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    placeholder="1.5 h"
                    className="w-full bg-white border border-[#ddc0ba] rounded-xl px-3 py-2 text-sm text-[#1A1C1A] focus:ring-2 focus:ring-[#006B5B] outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A1C1A] mb-1">Lieu / Destination</label>
                <input
                  type="text"
                  placeholder="Ex: Plage d'Ambatoloaka, Nosy Be"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full bg-white border border-[#ddc0ba] rounded-xl px-3 py-2 text-sm text-[#1A1C1A] focus:ring-2 focus:ring-[#006B5B] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A1C1A] mb-1">Notes ou description</label>
                <textarea
                  rows={3}
                  placeholder="Détails pratiques, guide à contacter, affaires à prendre..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full bg-white border border-[#ddc0ba] rounded-xl px-3 py-2 text-sm text-[#1A1C1A] focus:ring-2 focus:ring-[#006B5B] outline-hidden"
                />
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
