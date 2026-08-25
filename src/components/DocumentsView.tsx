import { useState, type ChangeEvent, type FormEvent } from 'react';
import { DocumentItem } from '../types';
import { 
  Lock, 
  ShieldCheck, 
  Plane, 
  Shield, 
  Syringe, 
  ArrowRight, 
  QrCode, 
  Plus, 
  FileText, 
  X, 
  Upload, 
  Eye, 
  Check, 
  Calendar,
  Sparkles
} from 'lucide-react';

interface DocumentsViewProps {
  documents: DocumentItem[];
  onAddDocument: (doc: Omit<DocumentItem, 'id'>) => void;
}

export function DocumentsView({ documents, onAddDocument }: DocumentsViewProps) {
  const [selectedQrDoc, setSelectedQrDoc] = useState<DocumentItem | null>(null);
  const [selectedDocDetails, setSelectedDocDetails] = useState<DocumentItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newType, setNewType] = useState<DocumentItem['type']>('passport');
  const [newDocNum, setNewDocNum] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateDocument = (e: FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddDocument({
      title: newTitle.trim(),
      subtitle: newSubtitle.trim() || 'Document chiffré',
      type: newType,
      documentNumber: newDocNum.trim() || undefined,
      notes: newNotes.trim() || undefined,
      badge: 'AJOUTÉ',
      badgeType: 'verified',
      isEncrypted: true,
      fileDataUrl: uploadedImagePreview || undefined,
      icon: newType === 'passport' ? 'badge' : newType === 'flight' ? 'flight' : 'health_and_safety',
      colorClass: 'text-[#006B5B]'
    });

    setNewTitle('');
    setNewSubtitle('');
    setNewDocNum('');
    setNewNotes('');
    setUploadedImagePreview(null);
    setShowAddModal(false);
  };

  const getDocIcon = (type: string) => {
    switch (type) {
      case 'passport':
        return <ShieldCheck className="w-6 h-6 text-[#006B5B]" />;
      case 'flight':
        return <Plane className="w-6 h-6 text-[#9F402D]" />;
      case 'insurance':
        return <Shield className="w-6 h-6 text-[#006B59]" />;
      case 'vaccine':
        return <Syringe className="w-6 h-6 text-[#89726D]" />;
      default:
        return <FileText className="w-6 h-6 text-[#1A1C1A]" />;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 pt-4 pb-28 flex flex-col gap-6">
      {/* Header Section */}
      <div>
        <h1 className="font-['Montserrat',sans-serif] font-bold text-2xl sm:text-3xl text-[#1A1C1A] mb-1">
          Mes Documents
        </h1>
        <p className="text-sm text-[#56423E]">
          Gérez vos documents de voyage en toute sécurité.
        </p>
      </div>

      {/* Documents Bento Grid matching design */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documents.map((doc) => {
          const isVaccineOrEmpty = doc.type === 'vaccine' && (!doc.badge || doc.badge === 'À AJOUTER');

          return (
            <article
              key={doc.id}
              onClick={() => {
                if (doc.qrCodeValue) {
                  setSelectedQrDoc(doc);
                } else if (isVaccineOrEmpty) {
                  setShowAddModal(true);
                  setNewType('vaccine');
                  setNewTitle('Carnet de vaccination international');
                } else {
                  setSelectedDocDetails(doc);
                }
              }}
              className={`rounded-2xl p-5 shadow-[0_4px_16px_rgba(0,109,91,0.06)] flex flex-col justify-between group cursor-pointer transition-all duration-300 ${
                isVaccineOrEmpty
                  ? 'bg-white/60 border-2 border-dashed border-[#ddc0ba] hover:border-[#9F402D]'
                  : 'bg-white border border-[#ddc0ba]/40 hover:shadow-[0_8px_24px_rgba(0,109,91,0.12)] hover:border-[#E2725B]/40'
              }`}
            >
              <div>
                {/* Card Top Row */}
                <div className="flex justify-between items-start mb-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    doc.type === 'passport' 
                      ? 'bg-[#00A58E]/15' 
                      : doc.type === 'flight' 
                      ? 'bg-[#E2725B]/15' 
                      : doc.type === 'insurance'
                      ? 'bg-[#9DF3DC]/40'
                      : 'bg-[#E3E2E0]/60'
                  }`}>
                    {getDocIcon(doc.type)}
                  </div>

                  {doc.badge && (
                    <span className={`text-[10px] font-['Montserrat',sans-serif] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      doc.badgeType === 'verified'
                        ? 'bg-[#9DF3DC] text-[#005144]'
                        : doc.badgeType === 'today'
                        ? 'bg-[#E3E2E0] text-[#56423E]'
                        : 'bg-[#EFEEEB] text-[#89726D]'
                    }`}>
                      {doc.badge}
                    </span>
                  )}
                </div>

                {/* Card Title & Subtitle */}
                <h3 className="font-['Montserrat',sans-serif] font-bold text-lg text-[#1A1C1A]">
                  {doc.title}
                </h3>
                <p className="text-xs text-[#56423E] mt-1 font-medium">
                  {doc.subtitle}
                </p>
              </div>

              {/* Card Footer Link */}
              <div className="mt-4 pt-3 border-t border-[#ddc0ba]/30 flex justify-between items-center text-[#9F402D] text-xs font-semibold">
                {doc.qrCodeValue ? (
                  <>
                    <span>Voir le QR Code & Carte d'embarquement</span>
                    <QrCode className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </>
                ) : isVaccineOrEmpty ? (
                  <span className="text-[#89726D] flex items-center gap-1">
                    <Plus className="w-3.5 h-3.5" /> Ajouter un document
                  </span>
                ) : (
                  <>
                    <span>Ouvrir</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Secure Encryption Banner */}
      <div className="p-4 rounded-2xl bg-[#F5F5DC] border border-[#ddc0ba]/50 flex items-start gap-3 shadow-2xs">
        <Lock className="w-5 h-5 text-[#006B59] shrink-0 mt-0.5" />
        <p className="text-xs text-[#56423E] leading-relaxed">
          Vos documents sont chiffrés localement sur votre appareil. Pocket Guide n'y a pas accès et aucune donnée n'est transmise sur des serveurs externes.
        </p>
      </div>

      {/* Floating Action Button for adding documents */}
      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-20 md:bottom-8 right-6 w-14 h-14 bg-[#E2725B] hover:bg-[#9F402D] text-white rounded-2xl shadow-[0_8px_20px_rgba(226,114,91,0.35)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-40"
        title="Ajouter un document sécurisé"
      >
        <Plus className="w-7 h-7 stroke-[2.5]" />
      </button>

      {/* QR Code / Boarding Pass Modal */}
      {selectedQrDoc && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl border border-[#ddc0ba]/40 text-center relative overflow-hidden">
            <button
              onClick={() => setSelectedQrDoc(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-[#EFEEEB] text-[#56423E]"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-mono uppercase text-[#9F402D] font-bold tracking-wider block mb-1">
              Air France • Vol AF934
            </span>
            <h3 className="font-['Montserrat',sans-serif] font-bold text-xl text-[#1A1C1A]">
              Carte d'embarquement
            </h3>
            <p className="text-xs text-[#56423E] mb-4">Paris CDG ➔ Antananarivo TNR</p>

            {/* Realistic QR Code Box */}
            <div className="bg-[#FAF9F6] p-5 rounded-2xl border border-[#ddc0ba] inline-block mx-auto mb-4 shadow-inner">
              <svg viewBox="0 0 100 100" className="w-44 h-44 mx-auto">
                {/* QR Pattern Representation */}
                <rect width="100" height="100" fill="#FAF9F6" />
                <rect x="10" y="10" width="25" height="25" fill="#1A1C1A" />
                <rect x="15" y="15" width="15" height="15" fill="#FAF9F6" />
                <rect x="18" y="18" width="9" height="9" fill="#1A1C1A" />

                <rect x="65" y="10" width="25" height="25" fill="#1A1C1A" />
                <rect x="70" y="15" width="15" height="15" fill="#FAF9F6" />
                <rect x="73" y="18" width="9" height="9" fill="#1A1C1A" />

                <rect x="10" y="65" width="25" height="25" fill="#1A1C1A" />
                <rect x="15" y="70" width="15" height="15" fill="#FAF9F6" />
                <rect x="18" y="73" width="9" height="9" fill="#1A1C1A" />

                {/* Random Data points */}
                <rect x="42" y="12" width="6" height="6" fill="#1A1C1A" />
                <rect x="52" y="18" width="6" height="6" fill="#1A1C1A" />
                <rect x="42" y="28" width="6" height="6" fill="#1A1C1A" />
                <rect x="12" y="42" width="6" height="6" fill="#1A1C1A" />
                <rect x="24" y="48" width="6" height="6" fill="#1A1C1A" />
                <rect x="36" y="42" width="6" height="6" fill="#1A1C1A" />
                <rect x="48" y="48" width="6" height="6" fill="#1A1C1A" />
                <rect x="60" y="42" width="6" height="6" fill="#1A1C1A" />
                <rect x="72" y="48" width="6" height="6" fill="#1A1C1A" />
                <rect x="84" y="42" width="6" height="6" fill="#1A1C1A" />

                <rect x="42" y="66" width="6" height="6" fill="#1A1C1A" />
                <rect x="54" y="72" width="6" height="6" fill="#1A1C1A" />
                <rect x="66" y="66" width="6" height="6" fill="#1A1C1A" />
                <rect x="78" y="78" width="6" height="6" fill="#1A1C1A" />
                <rect x="84" y="66" width="6" height="6" fill="#1A1C1A" />
              </svg>
            </div>

            <div className="grid grid-cols-3 gap-2 bg-[#EFEEEB] p-3 rounded-xl text-xs text-[#56423E] mb-4">
              <div>
                <span className="text-[10px] text-[#89726D] block">SIÈGE</span>
                <span className="font-bold text-sm text-[#1A1C1A]">14A</span>
              </div>
              <div>
                <span className="text-[10px] text-[#89726D] block">PORTE</span>
                <span className="font-bold text-sm text-[#1A1C1A]">K42</span>
              </div>
              <div>
                <span className="text-[10px] text-[#89726D] block">EMBARQ.</span>
                <span className="font-bold text-sm text-[#1A1C1A]">20:55</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedQrDoc(null)}
              className="w-full py-2.5 bg-[#E2725B] text-white rounded-xl font-bold text-sm"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Document Details Modal */}
      {selectedDocDetails && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border border-[#ddc0ba]/40 relative">
            <button
              onClick={() => setSelectedDocDetails(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-[#EFEEEB] text-[#56423E]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-[#00A58E]/20 flex items-center justify-center">
                {getDocIcon(selectedDocDetails.type)}
              </div>
              <div>
                <h3 className="font-['Montserrat',sans-serif] font-bold text-xl text-[#1A1C1A]">
                  {selectedDocDetails.title}
                </h3>
                <span className="text-xs text-[#006B5B] font-mono font-semibold">
                  Chiffré AES local
                </span>
              </div>
            </div>

            <div className="space-y-2.5 text-sm bg-[#FAF9F6] p-4 rounded-2xl border border-[#ddc0ba]/30 mb-4">
              <div>
                <span className="text-xs text-[#89726D] block">Désignation</span>
                <p className="font-semibold text-[#1A1C1A]">{selectedDocDetails.subtitle}</p>
              </div>
              {selectedDocDetails.documentNumber && (
                <div>
                  <span className="text-xs text-[#89726D] block">Numéro d'enregistrement</span>
                  <p className="font-mono font-bold text-[#9F402D]">{selectedDocDetails.documentNumber}</p>
                </div>
              )}
              {selectedDocDetails.expiryOrDate && (
                <div>
                  <span className="text-xs text-[#89726D] block">Période / Validité</span>
                  <p className="font-semibold text-[#1A1C1A]">{selectedDocDetails.expiryOrDate}</p>
                </div>
              )}
              {selectedDocDetails.notes && (
                <div>
                  <span className="text-xs text-[#89726D] block">Notes & Garanties</span>
                  <p className="text-xs text-[#56423E]">{selectedDocDetails.notes}</p>
                </div>
              )}
              {selectedDocDetails.fileDataUrl && (
                <div className="mt-2">
                  <span className="text-xs text-[#89726D] block mb-1">Aperçu du fichier</span>
                  <img src={selectedDocDetails.fileDataUrl} alt="Document" className="w-full h-40 object-cover rounded-xl border border-[#ddc0ba]" />
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedDocDetails(null)}
              className="w-full py-2.5 bg-[#EFEEEB] hover:bg-[#E3E2E0] text-[#56423E] font-semibold rounded-xl text-sm transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Add Document Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF9F6] rounded-3xl p-6 w-full max-w-md shadow-2xl border border-[#ddc0ba]/40 max-h-[90vh] overflow-y-auto">
            <h3 className="font-['Montserrat',sans-serif] font-bold text-xl text-[#1A1C1A] mb-1">
              Ajouter un document sécurisé
            </h3>
            <p className="text-xs text-[#56423E] mb-4">
              Ce document sera stocké et chiffré uniquement sur votre appareil.
            </p>

            <form onSubmit={handleCreateDocument} className="flex flex-col gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#1A1C1A] mb-1">Type de document</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as DocumentItem['type'])}
                  className="w-full bg-white border border-[#ddc0ba] rounded-xl px-3 py-2 text-sm text-[#1A1C1A] outline-hidden"
                >
                  <option value="passport">Passeport</option>
                  <option value="flight">Billet d'avion</option>
                  <option value="insurance">Attestation d'assurance</option>
                  <option value="vaccine">Carnet de vaccination</option>
                  <option value="hotel">Réservation d'hôtel</option>
                  <option value="other">Autre document</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A1C1A] mb-1">Titre du document</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Passeport, Visa Madagascar, E-ticket..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-white border border-[#ddc0ba] rounded-xl px-3 py-2 text-sm text-[#1A1C1A] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A1C1A] mb-1">Sous-titre / Détail</label>
                <input
                  type="text"
                  placeholder="Ex: Valide jusqu'au 2028, Vol Tsaradia..."
                  value={newSubtitle}
                  onChange={(e) => setNewSubtitle(e.target.value)}
                  className="w-full bg-white border border-[#ddc0ba] rounded-xl px-3 py-2 text-sm text-[#1A1C1A] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A1C1A] mb-1">Numéro de document / Référence</label>
                <input
                  type="text"
                  placeholder="Ex: N° 24FR849102"
                  value={newDocNum}
                  onChange={(e) => setNewDocNum(e.target.value)}
                  className="w-full bg-white border border-[#ddc0ba] rounded-xl px-3 py-2 text-sm text-[#1A1C1A] outline-hidden"
                />
              </div>

              {/* Photo Upload Attachment */}
              <div>
                <label className="block text-xs font-semibold text-[#1A1C1A] mb-1">Scanner / Joindre une photo</label>
                <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-[#ddc0ba] hover:border-[#006B5B] rounded-2xl bg-white cursor-pointer transition-colors">
                  <Upload className="w-6 h-6 text-[#89726D] mb-1" />
                  <span className="text-xs text-[#56423E] font-medium">Prendre en photo ou importer un fichier</span>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                {uploadedImagePreview && (
                  <div className="mt-2 text-xs text-[#006B59] flex items-center gap-1">
                    <Check className="w-4 h-4" /> Photo attachée et prête pour le chiffrement
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
                  Chiffrer & Sauvegarder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
