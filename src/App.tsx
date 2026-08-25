import { useState, useEffect, useMemo } from 'react';
import { TabType, Place, DayItinerary, ChecklistCategory, Phrase, EmergencyContact, DocumentItem, JournalEntry, Activity } from './types';
import { 
  initialTripInfo, 
  initialPlaces, 
  initialItinerary, 
  initialChecklist, 
  initialPhrases, 
  initialEmergencyContacts, 
  initialDocuments, 
  initialJournalEntries 
} from './data/initialData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './components/HomeView';
import { MapView } from './components/MapView';
import { ItineraryView } from './components/ItineraryView';
import { ChecklistView } from './components/ChecklistView';
import { PhrasesView } from './components/PhrasesView';
import { ConverterView } from './components/ConverterView';
import { EmergencyView } from './components/EmergencyView';
import { DocumentsView } from './components/DocumentsView';
import { JournalView } from './components/JournalView';
import { CahierView } from './components/CahierView';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('accueil');
  const [isOffline, setIsOffline] = useState<boolean>(false);

  // Persistent States
  const [tripInfo, setTripInfo] = useState(() => {
    const saved = localStorage.getItem('pg_trip_info');
    return saved ? JSON.parse(saved) : initialTripInfo;
  });

  const [places, setPlaces] = useState<Place[]>(() => {
    const saved = localStorage.getItem('pg_places');
    return saved ? JSON.parse(saved) : initialPlaces;
  });

  const [itineraries, setItineraries] = useState<DayItinerary[]>(() => {
    const saved = localStorage.getItem('pg_itineraries');
    return saved ? JSON.parse(saved) : initialItinerary;
  });

  const [checklist, setChecklist] = useState<ChecklistCategory[]>(() => {
    const saved = localStorage.getItem('pg_checklist');
    return saved ? JSON.parse(saved) : initialChecklist;
  });

  const [phrases] = useState<Phrase[]>(initialPhrases);
  const [emergencyContacts] = useState<EmergencyContact[]>(initialEmergencyContacts);

  const [documents, setDocuments] = useState<DocumentItem[]>(() => {
    const saved = localStorage.getItem('pg_documents');
    return saved ? JSON.parse(saved) : initialDocuments;
  });

  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem('pg_journal');
    return saved ? JSON.parse(saved) : initialJournalEntries;
  });

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('pg_places', JSON.stringify(places));
  }, [places]);

  useEffect(() => {
    localStorage.setItem('pg_itineraries', JSON.stringify(itineraries));
  }, [itineraries]);

  useEffect(() => {
    localStorage.setItem('pg_checklist', JSON.stringify(checklist));
  }, [checklist]);

  useEffect(() => {
    localStorage.setItem('pg_documents', JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem('pg_journal', JSON.stringify(journalEntries));
  }, [journalEntries]);

  // Online / Offline listener
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Handlers
  const handleToggleSavePlace = (placeId: string) => {
    setPlaces(prev => prev.map(p => {
      if (p.id === placeId) {
        return { ...p, saved: !p.saved };
      }
      return p;
    }));
  };

  const handleToggleChecklistItem = (categoryId: string, itemId: string) => {
    setChecklist(prev => prev.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          items: cat.items.map(item => {
            if (item.id === itemId) {
              return { ...item, checked: !item.checked };
            }
            return item;
          })
        };
      }
      return cat;
    }));
  };

  const handleAddChecklistItem = (categoryId: string, text: string) => {
    setChecklist(prev => prev.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          items: [
            ...cat.items,
            {
              id: `item_${Date.now()}`,
              text,
              checked: false
            }
          ]
        };
      }
      return cat;
    }));
  };

  const handleDeleteChecklistItem = (categoryId: string, itemId: string) => {
    setChecklist(prev => prev.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          items: cat.items.filter(item => item.id !== itemId)
        };
      }
      return cat;
    }));
  };

  const handleResetChecklist = () => {
    setChecklist(initialChecklist);
  };

  const handleAddActivity = (dayNumber: number, activity: Omit<Activity, 'id'>) => {
    setItineraries(prev => prev.map(day => {
      if (day.dayNumber === dayNumber) {
        return {
          ...day,
          activities: [
            ...day.activities,
            {
              ...activity,
              id: `act_${Date.now()}`
            }
          ]
        };
      }
      return day;
    }));
  };

  const handleAddDocument = (doc: Omit<DocumentItem, 'id'>) => {
    setDocuments(prev => [
      {
        ...doc,
        id: `doc_${Date.now()}`
      },
      ...prev
    ]);
  };

  const handleAddJournalEntry = (entry: Omit<JournalEntry, 'id' | 'timestamp'>) => {
    setJournalEntries(prev => [
      {
        ...entry,
        id: `journal_${Date.now()}`,
        timestamp: Date.now()
      },
      ...prev
    ]);
  };

  // Stats calculation
  const completedTasksRatio = useMemo(() => {
    let total = 0;
    let completed = 0;
    checklist.forEach(cat => {
      cat.items.forEach(i => {
        total++;
        if (i.checked) completed++;
      });
    });
    return { completed, total };
  }, [checklist]);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1C1A] flex flex-col font-['Source_Sans_3',sans-serif] selection:bg-[#FFDAD3] selection:text-[#9F402D]">
      {/* Top Application Header */}
      <Header
        currentTab={currentTab}
        onNavigate={setCurrentTab}
        isOffline={isOffline}
        onToggleOffline={() => setIsOffline(!isOffline)}
      />

      {/* Main Screen Content View */}
      <main className="flex-1 w-full flex flex-col">
        {currentTab === 'accueil' && (
          <HomeView
            tripInfo={tripInfo}
            journalCount={journalEntries.length}
            completedTasksRatio={completedTasksRatio}
            onNavigate={setCurrentTab}
            isOffline={isOffline}
          />
        )}

        {currentTab === 'carte' && (
          <MapView
            places={places}
            onToggleSavePlace={handleToggleSavePlace}
            isOffline={isOffline}
          />
        )}

        {currentTab === 'trajet' && (
          <ItineraryView
            itineraries={itineraries}
            onAddActivity={handleAddActivity}
            onLocateOnMap={(placeId) => {
              setCurrentTab('carte');
            }}
          />
        )}

        {currentTab === 'liste' && (
          <ChecklistView
            categories={checklist}
            onToggleItem={handleToggleChecklistItem}
            onAddItem={handleAddChecklistItem}
            onDeleteItem={handleDeleteChecklistItem}
            onResetChecklist={handleResetChecklist}
          />
        )}

        {currentTab === 'phrases' && (
          <PhrasesView phrases={phrases} />
        )}

        {currentTab === 'convertisseur' && (
          <ConverterView />
        )}

        {currentTab === 'urgences' && (
          <EmergencyView contacts={emergencyContacts} />
        )}

        {currentTab === 'documents' && (
          <DocumentsView
            documents={documents}
            onAddDocument={handleAddDocument}
          />
        )}

        {currentTab === 'journal' && (
          <JournalView
            entries={journalEntries}
            onAddEntry={handleAddJournalEntry}
          />
        )}

        {currentTab === 'cahier' && (
          <CahierView />
        )}
      </main>

      {/* Bottom Sticky Mobile Navigation */}
      <BottomNav currentTab={currentTab} onNavigate={setCurrentTab} />
    </div>
  );
}
