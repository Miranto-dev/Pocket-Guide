import { useState } from 'react';
import { EmergencyContact } from '../types';
import { 
  AlertTriangle, 
  Phone, 
  ShieldAlert, 
  Building2, 
  Headset, 
  Flame, 
  MapPin, 
  Copy, 
  Check, 
  Share2,
  HeartHandshake,
  Droplet,
  Sun,
  Pill
} from 'lucide-react';

interface EmergencyViewProps {
  contacts: EmergencyContact[];
}

export function EmergencyView({ contacts }: EmergencyViewProps) {
  const [showSosModal, setShowSosModal] = useState(false);
  const [copiedGps, setCopiedGps] = useState(false);

  // Simulated live GPS position for Nosy Be
  const gpsCoords = "-13.3167, 48.2333 (Nosy Be, Madagascar)";

  const handleCopyGps = () => {
    navigator.clipboard?.writeText(gpsCoords);
    setCopiedGps(true);
    setTimeout(() => setCopiedGps(false), 2000);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'police': return <ShieldAlert className="w-5 h-5" />;
      case 'hospital': return <AlertTriangle className="w-5 h-5" />;
      case 'embassy': return <Building2 className="w-5 h-5" />;
      case 'agency': return <Headset className="w-5 h-5" />;
      case 'fire': return <Flame className="w-5 h-5" />;
      default: return <Phone className="w-5 h-5" />;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 pt-4 pb-24 flex flex-col gap-6">
      {/* Header Section */}
      <div className="text-center">
        <h1 className="font-['Montserrat',sans-serif] font-bold text-3xl sm:text-4xl text-[#1A1C1A] mb-2">
          Urgence
        </h1>
        <p className="text-sm text-[#56423E] max-w-md mx-auto leading-relaxed">
          En cas d'urgence médicale ou de sécurité immédiate, appuyez sur le bouton SOS ou contactez les services locaux ci-dessous.
        </p>
      </div>

      {/* Pulsing Red SOS Button */}
      <div className="flex flex-col items-center justify-center my-2">
        <button
          onClick={() => setShowSosModal(true)}
          className="relative w-38 h-38 sm:w-44 sm:h-44 rounded-full bg-[#BA1A1A] text-white flex flex-col items-center justify-center shadow-[0_10px_30px_rgba(186,26,26,0.35)] transition-transform active:scale-95 pulse-sos group cursor-pointer"
          title="Déclencher une alerte d'urgence SOS"
        >
          <div className="absolute inset-0 rounded-full bg-[#BA1A1A] opacity-20 group-hover:animate-ping" />
          <AlertTriangle className="w-12 h-12 sm:w-14 sm:h-14 mb-1 stroke-[2.5]" />
          <span className="font-['Montserrat',sans-serif] font-extrabold text-2xl tracking-widest">
            SOS
          </span>
        </button>
        <span className="text-xs font-mono uppercase tracking-wider text-[#89726D] mt-3">
          Appel d'urgence immédiat
        </span>
      </div>

      {/* Emergency Local Contacts List */}
      <section className="bg-white rounded-3xl shadow-[0_4px_16px_rgba(0,109,91,0.06)] border border-[#ddc0ba]/40 overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-[#ddc0ba]/30 bg-[#FAF9F6] flex items-center justify-between">
          <h2 className="font-['Montserrat',sans-serif] font-bold text-lg text-[#1A1C1A]">
            Contacts Locaux
          </h2>
          <span className="text-xs font-mono text-[#006B5B] bg-[#9DF3DC]/40 px-2.5 py-0.5 rounded-full font-semibold">
            Actifs 24/7
          </span>
        </div>

        <ul className="divide-y divide-[#ddc0ba]/20">
          {contacts.map((contact) => (
            <li
              key={contact.id}
              className="p-4 sm:p-5 flex items-center justify-between gap-3 hover:bg-[#FAF9F6] transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <div className={`w-12 h-12 rounded-2xl ${contact.iconBg} ${contact.iconColor} flex items-center justify-center shrink-0 shadow-2xs`}>
                  {getIcon(contact.type)}
                </div>
                <div>
                  <h3 className="font-['Montserrat',sans-serif] font-bold text-sm sm:text-base text-[#1A1C1A]">
                    {contact.title}
                  </h3>
                  <p className="text-xs text-[#56423E] font-medium">
                    {contact.number} • {contact.subtitle}
                  </p>
                </div>
              </div>

              <a
                href={`tel:${contact.number.replace(/\s+/g, '')}`}
                className="w-10 h-10 rounded-full bg-[#EFEEEB] hover:bg-[#9F402D] hover:text-white text-[#9F402D] flex items-center justify-center transition-colors shadow-2xs"
                title={`Appeler ${contact.title}`}
              >
                <Phone className="w-5 h-5 fill-current" />
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Offline First Aid Tips for Madagascar */}
      <section className="bg-[#FAF9F6] rounded-3xl p-5 border border-[#ddc0ba]/40 shadow-xs">
        <h3 className="font-['Montserrat',sans-serif] font-bold text-base text-[#1A1C1A] mb-3 flex items-center gap-2">
          <HeartHandshake className="w-4 h-4 text-[#9F402D]" />
          Conseils de santé & sécurité hors-ligne à Madagascar
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#56423E]">
          <div className="bg-white p-3 rounded-xl border border-[#ddc0ba]/30">
            <div className="flex items-center gap-1.5 font-bold text-[#1A1C1A] mb-1">
              <Droplet className="w-3.5 h-3.5 text-[#006B5B]" />
              <span>Eau & Hydratation</span>
            </div>
            <p>Ne buvez que de l'eau capsulée ou purifiée avec des pastilles. Évitez les glaçons non industriels.</p>
          </div>

          <div className="bg-white p-3 rounded-xl border border-[#ddc0ba]/30">
            <div className="flex items-center gap-1.5 font-bold text-[#1A1C1A] mb-1">
              <Pill className="w-3.5 h-3.5 text-[#9F402D]" />
              <span>Paludisme (Malaria)</span>
            </div>
            <p>Appliquez le répulsif dès le coucher du soleil et dormez sous moustiquaire imprégnée.</p>
          </div>

          <div className="bg-white p-3 rounded-xl border border-[#ddc0ba]/30">
            <div className="flex items-center gap-1.5 font-bold text-[#1A1C1A] mb-1">
              <Sun className="w-3.5 h-3.5 text-[#E2725B]" />
              <span>Soleil & Mer</span>
            </div>
            <p>Indice UV élevé à Nosy Be : portez chapeau et lycra. Attention aux oursins près des rochers.</p>
          </div>
        </div>
      </section>

      {/* SOS Alert Modal with GPS coords */}
      {showSosModal && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border-2 border-[#BA1A1A]">
            <div className="w-14 h-14 rounded-full bg-[#FFDAD6] text-[#BA1A1A] flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-8 h-8 stroke-[2.5]" />
            </div>

            <h3 className="font-['Montserrat',sans-serif] font-bold text-2xl text-center text-[#1A1C1A] mb-1">
              Alerte SOS Déclenchée
            </h3>
            <p className="text-xs text-center text-[#56423E] mb-4">
              Votre position actuelle a été enregistrée pour les secours.
            </p>

            {/* GPS coordinates box */}
            <div className="bg-[#FAF9F6] border border-[#ddc0ba] rounded-2xl p-3.5 mb-4">
              <div className="flex justify-between items-center text-xs font-mono text-[#89726D] mb-1">
                <span>Coordonnées GPS Actuelles</span>
                <button
                  onClick={handleCopyGps}
                  className="text-[#9F402D] hover:underline flex items-center gap-1 font-semibold"
                >
                  {copiedGps ? <Check className="w-3 h-3 text-[#006B5B]" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedGps ? "Copié !" : "Copier"}</span>
                </button>
              </div>
              <p className="font-mono text-sm font-bold text-[#1A1C1A] flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#BA1A1A] shrink-0" />
                {gpsCoords}
              </p>
            </div>

            {/* Direct Emergency Call Actions */}
            <div className="flex flex-col gap-2.5">
              <a
                href="tel:117"
                className="w-full py-3 bg-[#BA1A1A] hover:bg-[#93000A] text-white rounded-xl text-center font-bold text-sm flex items-center justify-center gap-2 shadow-sm"
              >
                <Phone className="w-4 h-4" />
                Appeler Secours / Police (117)
              </a>

              <a
                href="tel:+261345012345"
                className="w-full py-3 bg-[#006B5B] hover:bg-[#005144] text-white rounded-xl text-center font-bold text-sm flex items-center justify-center gap-2 shadow-sm"
              >
                <Headset className="w-4 h-4" />
                Appeler Assistance Pocket Guide 24/7
              </a>

              <button
                onClick={() => setShowSosModal(false)}
                className="w-full py-2.5 bg-[#EFEEEB] text-[#56423E] hover:bg-[#E3E2E0] rounded-xl text-xs font-semibold mt-1"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
