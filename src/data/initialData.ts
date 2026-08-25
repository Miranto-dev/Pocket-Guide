import { TripInfo, Place, DayItinerary, ChecklistCategory, Phrase, JournalEntry, DocumentItem, EmergencyContact } from '../types';

export const initialTripInfo: TripInfo = {
  destination: "Nosy Be",
  region: "Diana",
  country: "Madagascar",
  startDate: "12 Août 2026",
  endDate: "20 Août 2026",
  daysUntilDeparture: 5,
  todayProgram: {
    title: "Programme du jour",
    activity: "Excursion Lokobe • 09:00",
    time: "09:00 - 16:30",
    heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
  }
};

export const initialPlaces: Place[] = [
  {
    id: 'andilana',
    name: "Plage d'Andilana",
    category: 'plages',
    categoryLabel: 'Plage',
    rating: 4.9,
    reviewsCount: 142,
    distance: '12 km',
    duration: '20 min',
    openingHours: '24h/24',
    price: 'Gratuit',
    description: "Sable blanc éclatant et eaux turquoises calmes. L'une des plages les plus réputées de Nosy Be, idéale pour la baignade, le snorkeling et la détente. Profitez d'un cadre paradisiaque préservé et de superbes couchers de soleil.",
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80"
    ],
    coordinates: { lat: -13.2541, lng: 48.2125, x: 48, y: 22 },
    isOfflineAvailable: true,
    address: "Nord-Ouest de Nosy Be, Madagascar",
    highlights: ["Eaux calmes sans vagues", "Restaurants de fruits de mer", "Location de paddles", "Coucher de soleil féérique"],
    tips: "Arrivez vers 10h pour avoir les meilleures places ombragées sous les cocotiers.",
    saved: true
  },
  {
    id: 'lokobe',
    name: "Réserve Naturelle Intégrale de Lokobe",
    category: 'nature',
    categoryLabel: 'Réserve naturelle',
    rating: 4.8,
    reviewsCount: 198,
    distance: '18 km',
    duration: '35 min',
    openingHours: '08:00 - 17:00',
    price: '45 000 Ar',
    description: "Dernière forêt primaire préservée de Nosy Be. Sanctuaire des lémuriens noirs (Eulemur macaco), des caméléons nains, des boas de Madagascar et d'une flore endémique luxuriante avec accès en pirogue traditionnelle.",
    images: [
      "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=800&q=80"
    ],
    coordinates: { lat: -13.4012, lng: 48.3189, x: 78, y: 68 },
    isOfflineAvailable: true,
    address: "Sud-Est de Nosy Be, village d'Ambatozavavy",
    highlights: ["Traversée en pirogue traditionnelle", "Observation des lémuriens", "Guide local naturaliste obligatoire", "Biodiversité unique"],
    tips: "Prévoyez des chaussures de marche étanches et du répulsif anti-moustique naturel.",
    saved: true
  },
  {
    id: 'nosy-komba',
    name: "Île de Nosy Komba (Île aux Lémuriens)",
    category: 'activites',
    categoryLabel: 'Excursion île',
    rating: 4.9,
    reviewsCount: 230,
    distance: '8 km en mer',
    duration: '25 min bateau',
    openingHours: 'Départs 08:30 - 16:00',
    price: '80 000 Ar (excursion)',
    description: "Île volcanique recouverte d'une dense forêt tropicale. Réputée pour ses colonies de lémuriens apprivoisés, ses villages de sculpteurs sur bois et ses broderies 'Richelieu' faites à la main.",
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80"
    ],
    coordinates: { lat: -13.4533, lng: 48.3511, x: 86, y: 84 },
    isOfflineAvailable: true,
    address: "Canal du Mozambique, Sud Nosy Be",
    highlights: ["Contact direct avec les lémuriens", "Artisanat d'art local", "Plages sauvages", "Marché villageois"],
    saved: false
  },
  {
    id: 'nosy-tanikely',
    name: "Parc Marin de Nosy Tanikely",
    category: 'activites',
    categoryLabel: 'Parc marin & Snorkeling',
    rating: 5.0,
    reviewsCount: 310,
    distance: '10 km en mer',
    duration: '30 min bateau',
    openingHours: '08:30 - 15:30',
    price: '20 000 Ar (droit d’entrée)',
    description: "Réserve marine protégée avec un aquarium naturel exceptionnel : coraux multicolores, tortues marines géantes, raies et poissons tropicaux visibles à quelques mètres du rivage.",
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
    ],
    coordinates: { lat: -13.4833, lng: 48.2333, x: 42, y: 88 },
    isOfflineAvailable: true,
    address: "Sud de Nosy Be",
    highlights: ["Nage avec les tortues marines", "Phares historiques avec vue panoramique 360°", "Snorkeling haut de gamme", "Plage immaculée"],
    saved: true
  },
  {
    id: 'mont-passot',
    name: "Mont Passot & Lacs Sacrés",
    category: 'activites',
    categoryLabel: 'Belvédère & Randonnée',
    rating: 4.7,
    reviewsCount: 165,
    distance: '15 km',
    duration: '30 min',
    openingHours: '06:00 - 19:00',
    price: '10 000 Ar',
    description: "Point culminant de Nosy Be (329m). Panorama spectaculaire sur les 8 lacs volcaniques sacrés peuplés de crocodiles et sur tout l'archipel. Le spot incontournable pour le coucher du soleil.",
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
    ],
    coordinates: { lat: -13.3167, lng: 48.2333, x: 50, y: 45 },
    isOfflineAvailable: true,
    address: "Centre de l'île de Nosy Be",
    highlights: ["Coucher de soleil légendaire", "Vue 360° sur les cratères", "Lacs sacrés aux crocodiles"],
    saved: false
  },
  {
    id: 'hell-ville',
    name: "Marché Couvert d'Hell-Ville (Andoany)",
    category: 'culture',
    categoryLabel: 'Marché & Ville',
    rating: 4.6,
    reviewsCount: 88,
    distance: '14 km',
    duration: '25 min',
    openingHours: '06:00 - 17:00',
    price: 'Accès libre',
    description: "Capitale animée de Nosy Be avec ses bâtiments coloniaux d'époque, son grand marché aux épices (vanille Bourbon, poivre sauvage, cannelle, ylang-ylang) et son port maritime.",
    images: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
    ],
    coordinates: { lat: -13.4000, lng: 48.2667, x: 62, y: 72 },
    isOfflineAvailable: true,
    address: "Hell-Ville / Andoany centre",
    highlights: ["Achat de vanille et épices", "Ambiance locale chaleureuse", "Architecture coloniale"],
    saved: false
  },
  {
    id: 'baobab-sacré',
    name: "Arbre Sacré Banian de Mahatsinjo",
    category: 'culture',
    categoryLabel: 'Lieu sacré & Culture',
    rating: 4.8,
    reviewsCount: 110,
    distance: '9 km',
    duration: '15 min',
    openingHours: '08:00 - 17:30',
    price: '10 000 Ar',
    description: "Figuier banian bicentenaire sacré couvrant plus de 5000 m² avec ses racines aériennes. Lieu de prière et de rituels animistes de la royauté Sakalava.",
    images: [
      "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&w=800&q=80"
    ],
    coordinates: { lat: -13.3500, lng: 48.2833, x: 68, y: 55 },
    isOfflineAvailable: true,
    address: "Mahatsinjo, Nosy Be",
    highlights: ["Port du lambahoany traditionnel obligatoire", "Immersion spirituelle Sakalava", "Lémuriens en liberté"],
    saved: false
  }
];

export const initialItinerary: DayItinerary[] = [
  {
    dayNumber: 1,
    title: "Jour 1 — Arrivée & Découverte de Nosy Komba",
    date: "12 Août 2026",
    summary: "Installation, première traversée en mer et contact avec la faune insulaire.",
    activities: [
      {
        id: 'act-1-1',
        time: '09:00',
        duration: '45 min',
        title: 'Petit-déjeuner',
        description: "Profitez d'un petit-déjeuner local avec vue sur l'océan Indien. Dégustation de fruits tropicaux (mangues, ananas Victoria) et café malgache.",
        type: 'food',
        icon: 'coffee',
        location: "Hôtel Relais de la Mer"
      },
      {
        id: 'act-1-2',
        time: '10:30',
        duration: '2.5 h',
        title: 'Sortie bateau vers Nosy Komba',
        description: "Embarquez pour une traversée pittoresque vers l'île aux lémuriens. Préparez vos appareils photo pour les dauphins et la traversée turquoise !",
        type: 'boat',
        icon: 'sailing',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
        location: 'Port de départ - Cratère',
        placeId: 'nosy-komba'
      },
      {
        id: 'act-1-3',
        time: '13:00',
        duration: '1.5 h',
        title: 'Déjeuner sur la plage',
        description: "Repas traditionnel malgache les pieds dans le sable. Poissons grillés du jour au feu de bois, crevettes géantes et riz coco au menu.",
        type: 'food',
        icon: 'restaurant',
        location: 'Plage d’Ampagorina, Nosy Komba'
      },
      {
        id: 'act-1-4',
        time: '15:30',
        duration: '2 h',
        title: 'Visite du village artisanal et rencontre des lémuriens',
        description: "Promenade guidée dans les sous-bois pour observer les lémuriens Macaco, suivie de la découverte des broderies traditionnelles.",
        type: 'visit',
        icon: 'nature_people',
        location: 'Village d’Ampagorina'
      },
      {
        id: 'act-1-5',
        time: '18:00',
        duration: '1 h',
        title: 'Coucher de soleil & Apéritif punch vanille',
        description: "Détente au bord de l'eau devant le coucher de soleil rougeoyant sur le canal du Mozambique.",
        type: 'relax',
        icon: 'wb_twilight',
        location: 'Plage de Madirokely'
      }
    ]
  },
  {
    dayNumber: 2,
    title: "Jour 2 — Réserve Tropicale de Lokobe & Pirogue",
    date: "13 Août 2026",
    summary: "Immersion dans la jungle primaire et faune endémique.",
    activities: [
      {
        id: 'act-2-1',
        time: '08:00',
        duration: '1 h',
        title: 'Départ en pirogue traditionnelle',
        description: "Embarquement depuis le village d'Ambatozavavy en pirogue à balancier taillée à la main à travers la mangrove.",
        type: 'boat',
        icon: 'rowing',
        location: 'Ambatozavavy'
      },
      {
        id: 'act-2-2',
        time: '09:15',
        duration: '3.5 h',
        title: 'Trek guidé dans la forêt primaire de Lokobe',
        description: "Randonnée botanique à la recherche des microcebus, lémuriens nocturnes cachés, caméléons panthères et boas madagascariensis.",
        type: 'hike',
        icon: 'hiking',
        image: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&w=800&q=80',
        location: 'Réserve de Lokobe',
        placeId: 'lokobe'
      },
      {
        id: 'act-2-3',
        time: '13:00',
        duration: '1.5 h',
        title: 'Déjeuner traditionnel chez l’habitant',
        description: "Savourez le fameux 'Romazava' au zébu et brèdes locales préparé au feu de bois dans un village en lisière de forêt.",
        type: 'food',
        icon: 'restaurant',
        location: 'Village d’Ampasipohy'
      }
    ]
  },
  {
    dayNumber: 3,
    title: "Jour 3 — Aquarium Marin de Nosy Tanikely & Snorkeling",
    date: "14 Août 2026",
    summary: "Journée sous-marine avec tortues marines et récifs coralliens protégés.",
    activities: [
      {
        id: 'act-3-1',
        time: '08:30',
        duration: '45 min',
        title: 'Speedboat vers Nosy Tanikely',
        description: "Cap au sud vers la réserve marine nationale de Tanikely sur des eaux cristallines.",
        type: 'boat',
        icon: 'sailing',
        placeId: 'nosy-tanikely'
      },
      {
        id: 'act-3-2',
        time: '09:30',
        duration: '3 h',
        title: 'Plongée palmes-masque-tuba avec les tortues',
        description: "Observation des tortues vertes et imbriquées, raies léopards et jardins de coraux multicolores dans une eau à 28°C.",
        type: 'beach',
        icon: 'pool',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
        location: 'Plage de Tanikely'
      },
      {
        id: 'act-3-3',
        time: '14:30',
        duration: '1 h',
        title: 'Ascension au Phare historique de 1908',
        description: "Courte marche ombragée vers le sommet de l'île pour une vue spectaculaire sur tout l'archipel et les chauves-souris frugivores.",
        type: 'hike',
        icon: 'landscape'
      }
    ]
  },
  {
    dayNumber: 4,
    title: "Jour 4 — Plage d'Andilana & Coucher de Soleil Mont Passot",
    date: "15 Août 2026",
    summary: "Détente sur la plus belle plage du nord et vue panoramique 360° sur les cratères.",
    activities: [
      {
        id: 'act-4-1',
        time: '10:00',
        duration: '4 h',
        title: 'Baignade & farniente à Andilana',
        description: "Journée libre sur la double baie d'Andilana : sable blanc fin, eaux turquoises calmes et dégustation de noix de coco fraîches.",
        type: 'beach',
        icon: 'beach_access',
        placeId: 'andilana'
      },
      {
        id: 'act-4-2',
        time: '16:30',
        duration: '2.5 h',
        title: 'Coucher de soleil au sommet du Mont Passot',
        description: "Montée au sommet de l'île pour admirer le soleil s'enfoncer dans l'océan Indien au-dessus des lacs sacrés aux crocodiles.",
        type: 'relax',
        icon: 'wb_sunny',
        placeId: 'mont-passot'
      }
    ]
  },
  {
    dayNumber: 5,
    title: "Jour 5 — Marché aux Épices d'Hell-Ville & Arbre Sacré",
    date: "16 Août 2026",
    summary: "Découverte des senteurs de vanille, ylang-ylang et traditions Sakalava.",
    activities: [
      {
        id: 'act-5-1',
        time: '09:00',
        duration: '2 h',
        title: 'Grand Marché d’Hell-Ville',
        description: "Achat de gousses de vanille Bourbon, poivre sauvage de Madagascar, cannelle et huiles essentielles d’ylang-ylang.",
        type: 'visit',
        icon: 'store',
        placeId: 'hell-ville'
      },
      {
        id: 'act-5-2',
        time: '11:30',
        duration: '1.5 h',
        title: 'Visite de l’Arbre Sacré Banian de Mahatsinjo',
        description: "Revêtement du lambahoany traditionnel et recueillement sous les immenses racines de cet arbre millénaire vénéré.",
        type: 'visit',
        icon: 'park',
        placeId: 'baobab-sacré'
      }
    ]
  }
];

export const initialChecklist: ChecklistCategory[] = [
  {
    id: 'docs',
    name: 'Documents',
    icon: 'description',
    colorClass: 'text-[#006B59]',
    bgClass: 'bg-[#9DF3DC]/40',
    items: [
      { id: 'doc-1', text: 'Passeport (validité > 6 mois)', checked: true, notes: 'Valide jusqu’en 2028' },
      { id: 'doc-2', text: 'Visa d’entrée Madagascar (e-Visa ou sur place)', checked: true },
      { id: 'doc-3', text: 'Billets d’avion aller-retour', checked: false },
      { id: 'doc-4', text: 'Assurance voyage & rapatriement', checked: false }
    ]
  },
  {
    id: 'vetements',
    name: 'Vêtements',
    icon: 'apparel',
    colorClass: 'text-[#006B59]',
    bgClass: 'bg-[#E8EBFF]',
    items: [
      { id: 'vet-1', text: 'Maillot de bain & serviette microfibre', checked: false },
      { id: 'vet-2', text: 'Chapeau / Casquette anti-UV', checked: false },
      { id: 'vet-3', text: 'Chaussures de marche / Randonnée légères', checked: false },
      { id: 'vet-4', text: 'Veste imperméable / Coupe-vent léger', checked: false },
      { id: 'vet-5', text: 'Vêtements en coton léger à manches longues (moustiques)', checked: false }
    ]
  },
  {
    id: 'sante',
    name: 'Santé',
    icon: 'medical_services',
    colorClass: 'text-[#9F402D]',
    bgClass: 'bg-[#E2725B]/20',
    items: [
      { id: 'san-1', text: 'Répulsif anti-moustiques tropical (DEET / Icaridine)', checked: false },
      { id: 'san-2', text: 'Crème solaire indice 50 respectueuse des coraux', checked: true },
      { id: 'san-3', text: 'Trousse de premiers secours & désinfectant', checked: false },
      { id: 'san-4', text: 'Médicaments personnels & antipaludique prescrit', checked: false },
      { id: 'san-5', text: 'Pastilles de purification d’eau ou gourde filtrante', checked: false }
    ]
  },
  {
    id: 'electronique',
    name: 'Électronique',
    icon: 'devices',
    colorClass: 'text-[#333333]',
    bgClass: 'bg-[#E3E2E0]',
    items: [
      { id: 'elec-1', text: 'Chargeur de téléphone & câbles renforcés', checked: false },
      { id: 'elec-2', text: 'Batterie externe haute capacité (Powerbank)', checked: false },
      { id: 'elec-3', text: 'Adaptateur de prise (prises européennes type C/E)', checked: false },
      { id: 'elec-4', text: 'Appareil photo / Caméra étanche & cartes SD', checked: false },
      { id: 'elec-5', text: 'Pochette étanche étanche pour smartphone en bateau', checked: false }
    ]
  }
];

export const initialPhrases: Phrase[] = [
  // Salutations
  { id: 'phr-1', french: 'Bonjour', malagasy: 'Salama', phonetic: 'Sah-lah-mah', category: 'salutations', context: 'Formule universelle de politesse' },
  { id: 'phr-2', french: 'Merci', malagasy: 'Misaotra', phonetic: 'Mee-sow-trah', category: 'salutations', context: 'Pour remercier chaleureusement' },
  { id: 'phr-3', french: 'Oui', malagasy: 'Eny', phonetic: 'Eh-nee', category: 'salutations' },
  { id: 'phr-4', french: 'Non', malagasy: 'Tsia', phonetic: 'Tsee', category: 'salutations' },
  { id: 'phr-5', french: 'S’il vous plaît / Pardon', malagasy: 'Azafady', phonetic: 'Ah-zah-fah-dee', category: 'salutations', context: 'Essentiel pour demander un service' },
  { id: 'phr-6', french: 'Comment allez-vous ?', malagasy: 'Manao ahoana ianao ?', phonetic: 'Mah-now how-nah ee-nah-oo', category: 'salutations' },
  { id: 'phr-7', french: 'Au revoir', malagasy: 'Veloma', phonetic: 'Veh-loo-mah', category: 'salutations' },

  // Nourriture
  { id: 'phr-8', french: 'L’addition s’il vous plaît', malagasy: 'Ny kaonty azafady', phonetic: 'Nee kown-tee ah-zah-fah-dee', category: 'nourriture' },
  { id: 'phr-9', french: 'C’est délicieux !', malagasy: 'Matsiro be !', phonetic: 'Mah-tsee-roo bay', category: 'nourriture' },
  { id: 'phr-10', french: 'De l’eau s’il vous plaît', malagasy: 'Rano azafady', phonetic: 'Rah-noo ah-zah-fah-dee', category: 'nourriture' },
  { id: 'phr-11', french: 'Riz traditionnel', malagasy: 'Vary', phonetic: 'Vah-ree', category: 'nourriture' },
  { id: 'phr-12', french: 'Poisson frais', malagasy: 'Trondro', phonetic: 'Troon-droo', category: 'nourriture' },

  // Urgence
  { id: 'phr-13', french: 'Aidez-moi s’il vous plaît !', malagasy: 'Ampio aho azafady !', phonetic: 'Ahm-pyoo ah-hoo ah-zah-fah-dee', category: 'urgence' },
  { id: 'phr-14', french: 'Où est l’hôpital ?', malagasy: 'Aiza ny hopitaly ?', phonetic: 'Eye-zah nee oo-pee-tah-lee', category: 'urgence' },
  { id: 'phr-15', french: 'J’ai besoin d’un médecin', malagasy: 'Mila dokotera aho', phonetic: 'Mee-lah doo-koo-tay-rah ah-hoo', category: 'urgence' },

  // Transport & Marché
  { id: 'phr-16', french: 'Combien ça coûte ?', malagasy: 'Ohatrinona ity ?', phonetic: 'Oo-aht-ree-noo-nah ee-tee', category: 'marche', context: 'Indispensable pour le marché' },
  { id: 'phr-17', french: 'C’est trop cher', malagasy: 'Lafo loatra', phonetic: 'Lah-foo loo-aht-rah', category: 'marche' },
  { id: 'phr-18', french: 'Où va ce taxi ?', malagasy: 'Mankaiza ity taxi ity ?', phonetic: 'Mahn-kye-zah ee-tee tahk-see ee-tee', category: 'transport' },
  { id: 'phr-19', french: 'Arrêtez-vous ici', malagasy: 'Mijanòna eto azafady', phonetic: 'Mee-dzah-noo-nah ay-too ah-zah-fah-dee', category: 'transport' }
];

export const initialEmergencyContacts: EmergencyContact[] = [
  {
    id: 'police',
    title: 'Police / Gendarmerie',
    number: '117',
    subtitle: 'Secours et sécurité publique',
    type: 'police',
    icon: 'local_police',
    iconBg: 'bg-[#FFDAD6]',
    iconColor: 'text-[#BA1A1A]',
    available: '24h/24 • 7j/7'
  },
  {
    id: 'hopital',
    title: 'Hôpital d’Hell-Ville (Andoany)',
    number: '+261 32 02 611 25',
    subtitle: 'Urgences médicales Nosy Be',
    type: 'hospital',
    icon: 'local_hospital',
    iconBg: 'bg-[#00A58E]/20',
    iconColor: 'text-[#006B5B]',
    available: 'Urgences 24h/24'
  },
  {
    id: 'ambassade',
    title: 'Consulat & Ambassade de France',
    number: '+261 20 22 398 98',
    subtitle: 'Assistance consulaire aux ressortissants',
    type: 'embassy',
    icon: 'account_balance',
    iconBg: 'bg-[#E3E2E0]',
    iconColor: 'text-[#333333]',
    available: 'Permanence consulaire'
  },
  {
    id: 'agence',
    title: 'Assistance Pocket Guide 24/7',
    number: '+261 34 50 123 45',
    subtitle: 'Votre guide référent & assistance séjour',
    type: 'agency',
    icon: 'support_agent',
    iconBg: 'bg-[#E2725B]',
    iconColor: 'text-white',
    available: 'Ligne directe WhatsApp & Appel'
  },
  {
    id: 'pompiers',
    title: 'Sapeurs Pompiers & Secours',
    number: '118',
    subtitle: 'Incendie & interventions',
    type: 'fire',
    icon: 'fire_truck',
    iconBg: 'bg-[#FFB4A5]',
    iconColor: 'text-[#9F402D]',
    available: '24h/24'
  }
];

export const initialDocuments: DocumentItem[] = [
  {
    id: 'doc-pass',
    type: 'passport',
    title: 'Passeport',
    subtitle: "Valide jusqu'au 15 Oct 2028",
    badge: 'VÉRIFIÉ',
    badgeType: 'verified',
    expiryOrDate: '15 Octobre 2028',
    documentNumber: '24FR984712',
    isEncrypted: true,
    icon: 'badge',
    colorClass: 'text-[#006B5B]',
    notes: 'Passeport biométrique français'
  },
  {
    id: 'doc-flight',
    type: 'flight',
    title: "Billets d'avion",
    subtitle: 'Vol AF934 • Paris CDG - Antananarivo - Nosy Be',
    badge: "AUJOURD'HUI",
    badgeType: 'today',
    expiryOrDate: 'Départ 12 Août 2026 • 21:40',
    documentNumber: 'AF-934-TN1029',
    qrCodeValue: 'M1RANDRIANAVALONA/MIRANTO EAF934 12AUG CDGTNR 04A',
    isEncrypted: true,
    icon: 'flight',
    colorClass: 'text-[#9F402D]',
    notes: 'Terminal 2E • Siège 14A • Bagage soute 23kg inclus'
  },
  {
    id: 'doc-insur',
    type: 'insurance',
    title: 'Assurance voyage',
    subtitle: 'Contrat Mondial Assistance N° 8472910',
    badge: 'ACTIF',
    badgeType: 'verified',
    expiryOrDate: 'Couverture 10 - 25 Août 2026',
    documentNumber: 'CTR-8472910-MDG',
    isEncrypted: true,
    icon: 'health_and_safety',
    colorClass: 'text-[#006B59]',
    notes: 'Rapatriement sanitaire, frais médicaux jusqu’à 150 000€ et bagages couverts'
  },
  {
    id: 'doc-vax',
    type: 'vaccine',
    title: 'Carnet de vaccination',
    subtitle: 'Non ajouté (Optionnel pour Madagascar)',
    badge: 'À AJOUTER',
    badgeType: 'neutral',
    isEncrypted: true,
    icon: 'vaccines',
    colorClass: 'text-[#89726D]',
    notes: 'Fièvre jaune si provenance d’un pays endémique, DTP & Hépatite A conseillés'
  }
];

export const initialJournalEntries: JournalEntry[] = [
  {
    id: 'jour-1',
    title: 'Coucher de soleil féérique à Nosy Iranja',
    date: '12 Octobre 2023',
    content: "Magnifique coucher de soleil à Nosy Iranja. L'eau était d'un bleu incroyable aujourd'hui, et le sable si fin. Un vrai paradis terrestre relié par un banc de sable blanc de 1,5 km à marée basse.",
    location: 'Nosy Iranja, Madagascar',
    category: 'paysage',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    timestamp: 1697112000000
  },
  {
    id: 'jour-2',
    title: 'Rencontre avec les lémuriens curieux',
    date: '10 Octobre 2023',
    content: 'Rencontre incroyable avec les lémuriens ce matin dans la réserve. Ils sont curieux et fascinants, sautant de branche en branche à quelques centimètres de nous. La marche dans la forêt était revigorante et parfumée à l’ylang-ylang.',
    location: "Parc National d'Isalo / Lokobe",
    category: 'faune',
    imageUrl: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&w=800&q=80',
    timestamp: 1696939200000
  },
  {
    id: 'jour-3',
    title: 'Dîner gastronomique malgache au zébu mijoté',
    date: '08 Octobre 2023',
    content: 'Découverte culinaire incroyable ce soir. Le zébu mijoté fondait dans la bouche avec ses épices locales et son rougail tomate bien relevé. Les épices locales ajoutent une touche parfumée incomparable.',
    location: 'Antananarivo / Hell-Ville',
    category: 'culinaire',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    timestamp: 1696766400000
  }
];
